'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useSearchParams } from 'next/navigation';

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
};

type Conversation = {
  id: string;
  updated_at: string;
  participants: Profile[];
  lastMessage?: string; // Derived field
};

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

function MessagesContent() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const initialConversationId = searchParams.get('conversationId');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial Data Fetching
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (profile) setCurrentUser(profile);

      // Fetch conversations user is part of
      const { data: participantData } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id);

      if (participantData && participantData.length > 0) {
        const convoIds = participantData.map(p => p.conversation_id);
        
        // Fetch full conversation details including all participants
        const { data: convos } = await supabase
          .from('conversations')
          .select(`
            id,
            updated_at,
            conversation_participants (
              profiles ( id, first_name, last_name, avatar_url )
            )
          `)
          .in('id', convoIds)
          .order('updated_at', { ascending: false });

        if (convos) {
          const formattedConvos = convos.map((c: any) => ({
            id: c.id,
            updated_at: c.updated_at,
            participants: c.conversation_participants
              .map((cp: any) => cp.profiles)
              .filter((p: any) => p.id !== user.id) // Filter out self
          }));
          setConversations(formattedConvos);
          
          if (initialConversationId) {
            const initialConvo = formattedConvos.find((c: Conversation) => c.id === initialConversationId);
            if (initialConvo) {
              setActiveConversation(initialConvo);
            }
          }
        }
      }
      setLoading(false);
    }
    init();
  }, [supabase, initialConversationId]);

  // Fetch Messages when Active Conversation changes
  useEffect(() => {
    if (!activeConversation) return;

    async function fetchMessages() {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', activeConversation!.id)
        .order('created_at', { ascending: true });

      if (data) setMessages(data as Message[]);
    }

    fetchMessages();

    // Subscribe to realtime messages
    const channel = supabase
      .channel(`chat_${activeConversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${activeConversation.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeConversation, supabase]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim() || !activeConversation || !currentUser) return;

    const content = newMessage.trim();
    setNewMessage(''); // optimistic clear

    const { error } = await supabase
      .from('messages')
      .insert({
        conversation_id: activeConversation.id,
        sender_id: currentUser.id,
        content: content,
      });

    if (error) {
      console.error('Error sending message:', error);
      // rollback or show error
    } else {
      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', activeConversation.id);
        
      // Trigger a notification for the recipient
      const recipient = getOtherParticipant(activeConversation);
      if (recipient) {
        await supabase.from('notifications').insert({
          user_id: recipient.id,
          sender_id: currentUser.id,
          type: 'message',
          content: 'sent you a new message.',
          link: `/messages?conversationId=${activeConversation.id}`
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // UI Helpers
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getOtherParticipant = (convo: Conversation) => {
    return convo.participants[0]; // Assuming 1-on-1 for now
  };

  const getAvatarUrl = (profile?: Profile) => {
    if (!profile) return '';
    const name = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Anonymous';
    return profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3525cd&color=fff`;
  };

  return (
    <div className="flex flex-1 overflow-hidden p-0 sm:p-margin max-w-[1600px] mx-auto w-full h-[calc(100vh-80px)] sm:h-[calc(100vh-120px)]">
      <div className="flex h-full w-full bg-surface-container-lowest shadow-[0_4px_12px_rgba(0,0,0,0.05)] sm:rounded-xl border border-outline-variant overflow-hidden">
        
        {/* Left Column: Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-outline-variant flex flex-col bg-surface-container-lowest h-full ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
          {/* Search Header */}
          <div className="p-4 border-b border-outline-variant">
            <h2 className="font-h3 text-h3 text-on-surface mb-4">Messages</h2>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input 
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.2)] transition-all placeholder:text-outline/70" 
                placeholder="Search conversations..." 
                type="text"
              />
            </div>
          </div>
          
          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center text-on-surface-variant">Loading messages...</div>
            ) : conversations.length === 0 ? (
              <div className="p-6 text-center text-on-surface-variant flex flex-col items-center justify-center h-full">
                <span className="material-symbols-outlined text-[48px] text-outline mb-2">forum</span>
                <p>No conversations yet.</p>
                <p className="text-sm mt-1">Start a skill swap or join a project to chat!</p>
              </div>
            ) : (
              conversations.map(convo => {
                const otherUser = getOtherParticipant(convo);
                const isActive = activeConversation?.id === convo.id;
                
                return (
                  <button 
                    key={convo.id}
                    onClick={() => setActiveConversation(convo)}
                    className={`w-full flex items-center gap-3 p-4 transition-colors border-l-4 text-left ${isActive ? 'bg-surface-container border-primary' : 'hover:bg-surface-container border-transparent'}`}
                  >
                    <div className="relative shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        alt="Avatar" 
                        className="w-12 h-12 rounded-full object-cover" 
                        src={getAvatarUrl(otherUser)}
                      />
                      {/* Online Indicator (Mock) */}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface-container-lowest rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-label-sm text-label-sm text-on-surface truncate">
                          {otherUser ? `${otherUser.first_name} ${otherUser.last_name}` : 'Unknown User'}
                        </h3>
                        <span className="font-caption text-caption text-on-surface-variant shrink-0 ml-2">
                          {formatTime(convo.updated_at)}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant truncate text-sm">
                        Click to view messages
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div className={`flex-1 flex-col h-full bg-surface-container-lowest relative ${activeConversation ? 'flex' : 'hidden md:flex'}`}>
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container-lowest z-10 shadow-[0_4px_12px_rgba(0,0,0,0.02)] shrink-0">
                <div className="flex items-center gap-3">
                  <button 
                    className="md:hidden p-2 -ml-2 mr-1 text-on-surface-variant hover:bg-surface-container rounded-full"
                    onClick={() => setActiveConversation(null)}
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full object-cover" 
                    src={getAvatarUrl(getOtherParticipant(activeConversation))}
                  />
                  <div>
                    <h2 className="font-label-sm text-label-sm text-on-surface">
                      {getOtherParticipant(activeConversation)?.first_name} {getOtherParticipant(activeConversation)?.last_name}
                    </h2>
                    <p className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Active now
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><span className="material-symbols-outlined">call</span></button>
                  <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><span className="material-symbols-outlined">videocam</span></button>
                  <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-6 bg-[#fcf8ff]">
                {messages.length === 0 ? (
                  <div className="text-center text-on-surface-variant my-auto">
                    <p>No messages yet. Say hello!</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => {
                    const isMe = msg.sender_id === currentUser?.id;
                    const showAvatar = !isMe && (idx === 0 || messages[idx - 1].sender_id === currentUser?.id);
                    
                    return isMe ? (
                      <div key={msg.id} className="flex items-end justify-end gap-2">
                        <div className="max-w-[85%] sm:max-w-[70%] flex flex-col items-end">
                          <div className="bg-primary text-on-primary font-body-md text-body-md p-3 rounded-2xl rounded-br-sm shadow-[0_4px_12px_rgba(79,70,229,0.15)] bg-gradient-to-br from-primary-container to-secondary-container break-words">
                            {msg.content}
                          </div>
                          <span className="font-caption text-caption text-on-surface-variant mt-1 mr-1 block flex items-center gap-1">
                            {formatTime(msg.created_at)} <span className="material-symbols-outlined text-[14px]">done_all</span>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div key={msg.id} className={`flex items-end gap-2 ${!showAvatar ? 'mt-[-16px]' : ''}`}>
                        {showAvatar ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img 
                            alt="Avatar" 
                            className="w-8 h-8 rounded-full object-cover mb-1 shrink-0" 
                            src={getAvatarUrl(getOtherParticipant(activeConversation))}
                          />
                        ) : (
                          <div className="w-8 mr-2 shrink-0"></div>
                        )}
                        <div className="max-w-[85%] sm:max-w-[70%]">
                          <div className={`bg-surface-container text-on-surface font-body-md text-body-md p-3 rounded-2xl shadow-sm border border-outline-variant/30 break-words ${showAvatar ? 'rounded-bl-sm' : 'rounded-l-sm'}`}>
                            {msg.content}
                          </div>
                          {/* Only show time on last message in a block, simplified for MVP */}
                          <span className="font-caption text-caption text-on-surface-variant mt-1 ml-1 block">{formatTime(msg.created_at)}</span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-outline-variant bg-surface-container-lowest shrink-0">
                <form 
                  onSubmit={handleSendMessage}
                  className="flex items-end gap-2 bg-surface-container-low border border-outline-variant rounded-xl p-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-within:shadow-[0_0_0_3px_rgba(79,70,229,0.2)] transition-all"
                >
                  <button type="button" className="hidden sm:block p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container shrink-0">
                    <span className="material-symbols-outlined">add_circle</span>
                  </button>
                  <button type="button" className="hidden sm:block p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container shrink-0">
                    <span className="material-symbols-outlined">image</span>
                  </button>
                  <textarea 
                    className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 py-2 font-body-md text-body-md text-on-surface placeholder:text-outline" 
                    placeholder="Type a message..." 
                    rows={1}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  ></textarea>
                  <button type="button" className="hidden sm:block p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container shrink-0">
                    <span className="material-symbols-outlined">mood</span>
                  </button>
                  <button 
                    type="submit" 
                    disabled={!newMessage.trim()}
                    className="p-2 bg-primary text-on-primary rounded-lg shadow-sm hover:shadow-md transition-all ml-1 flex items-center justify-center shrink-0 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Empty State (Right Column) */
            <div className="flex flex-1 flex-col h-full bg-surface-container-lowest items-center justify-center p-6 text-center border-l border-outline-variant">
              <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[48px] text-outline">forum</span>
              </div>
              <h2 className="font-h2 text-h2 text-on-surface mb-2">Select a conversation</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">Choose a message from the list to start chatting with your team or peers.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading messages...</div>}>
      <MessagesContent />
    </Suspense>
  );
}
