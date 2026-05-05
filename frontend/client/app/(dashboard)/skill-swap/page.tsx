'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { getOrCreateConversation } from '@/lib/api/chat';

type MatchProfile = {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar_url: string;
  can_teach: string[];
  wants_to_learn: string[];
  matchScore: number;
  matchReason?: string;
};

function SkillSwapCard({ profile }: { profile: MatchProfile }) {
  const isHighMatch = profile.matchScore >= 80;
  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Anonymous';
  const router = useRouter();
  const supabase = createClient();
  const [isStartingChat, setIsStartingChat] = useState(false);

  const handleRequestSwap = async () => {
    setIsStartingChat(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const convoId = await getOrCreateConversation(supabase, user.id, profile.id);
      if (convoId) {
        router.push(`/messages?conversationId=${convoId}`);
      }
    } catch (err) {
      console.error('Failed to start chat:', err);
    } finally {
      setIsStartingChat(false);
    }
  };

  return (
    <article className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0px_10px_25px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Header */}
      <div className="flex items-start justify-between mb-md">
        <div className="flex items-center gap-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={`${fullName} avatar`}
            className="w-12 h-12 rounded-full object-cover border-2 border-surface-container-lowest shadow-sm"
            src={profile.avatar_url || `https://ui-avatars.com/api/?name=${fullName}&background=3525cd&color=fff`}
          />
          <div>
            <h3 className="font-h3 text-[18px] text-on-surface leading-tight">{fullName}</h3>
            <p className="font-body-md text-sm text-on-surface-variant">{profile.role || 'Member'}</p>
          </div>
        </div>
        <div
          className={`rounded-full px-2 py-1 flex items-center gap-1 border ${
            isHighMatch
              ? 'bg-primary-container/20 border-primary-container/30'
              : 'bg-surface-container border-outline-variant/50'
          }`}
          title={profile.matchReason || 'Match Score'}
        >
          <span
            className={`material-symbols-outlined text-[14px] ${isHighMatch ? 'text-primary' : 'text-on-surface-variant'}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          <span
            className={`font-label-sm text-[12px] font-bold ${isHighMatch ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            {profile.matchScore}% Match
          </span>
        </div>
      </div>

      {/* AI Reason (if present) */}
      {profile.matchReason && (
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-md text-sm font-body-md text-on-surface-variant italic">
          <span className="material-symbols-outlined text-[16px] text-primary align-middle mr-1">psychiatry</span>
          {profile.matchReason}
        </div>
      )}

      {/* Skills Section */}
      <div className="flex-1 flex flex-col gap-md mb-lg">
        {/* Can Teach */}
        <div className="bg-surface-container-low rounded-lg p-sm border border-surface-variant">
          <div className="flex items-center gap-xs mb-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span className="font-label-sm text-xs uppercase tracking-wider text-outline">Can Teach</span>
          </div>
          <div className="flex flex-wrap gap-xs mt-1">
            {profile.can_teach?.length > 0 ? profile.can_teach.map((skill) => (
              <span
                key={skill}
                className="bg-surface-container-highest text-on-surface px-3 py-1 rounded-full font-caption text-caption"
              >
                {skill}
              </span>
            )) : <span className="text-xs text-outline italic">No skills listed yet</span>}
          </div>
        </div>

        {/* Wants to Learn */}
        <div className="bg-surface-container-low rounded-lg p-sm border border-surface-variant">
          <div className="flex items-center gap-xs mb-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span className="font-label-sm text-xs uppercase tracking-wider text-outline">Wants to Learn</span>
          </div>
          <div className="flex flex-wrap gap-xs mt-1">
            {profile.wants_to_learn?.length > 0 ? profile.wants_to_learn.map((skill) => (
              <span
                key={skill}
                className="bg-primary-container/10 text-primary px-3 py-1 rounded-full font-caption text-caption font-medium border border-primary/20"
              >
                {skill}
              </span>
            )) : <span className="text-xs text-outline italic">No skills listed yet</span>}
          </div>
        </div>
      </div>

      {/* CTA */}
      <button 
        onClick={handleRequestSwap}
        disabled={isStartingChat}
        className="w-full bg-gradient-to-br from-primary to-secondary text-on-primary rounded-lg py-sm px-md font-label-sm text-label-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:opacity-90 hover:shadow-md transition-all flex items-center justify-center gap-sm mt-auto disabled:opacity-50"
      >
        {isStartingChat ? (
          <>
            <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
            Connecting...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[18px]">handshake</span>
            Request Swap
          </>
        )}
      </button>
    </article>
  );
}

export default function SkillSwapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfiles() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        try {
          const res = await fetch('http://localhost:3001/api/v1/matches/skills', {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          });
          const json = await res.json();
          if (json.matches) {
            // Sort by match score descending
            const sorted = json.matches.sort((a: MatchProfile, b: MatchProfile) => b.matchScore - a.matchScore);
            setProfiles(sorted);
          }
        } catch (err) {
          console.error('Error fetching matches:', err);
        }
      }
      setLoading(false);
    }
    fetchProfiles();
  }, [supabase]);

  const filteredProfiles = profiles.filter((profile) => {
    const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.toLowerCase();
    const role = (profile.role || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    
    return fullName.includes(q) || role.includes(q) || 
      (profile.can_teach || []).some(s => s.toLowerCase().includes(q)) ||
      (profile.wants_to_learn || []).some(s => s.toLowerCase().includes(q));
  });

  return (
    <div className="flex-1 p-lg md:p-xl max-w-[1400px] w-full mx-auto">
      {/* Page Header */}
      <div className="mb-lg">
        <h1 className="font-h1 text-h1 text-on-surface mb-xs">Discover Skill Swaps</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Connect with professionals who have the skills you want to learn, and are eager to learn
          what you know. Our AI matches you based on complementary goals.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-[0px_4px_12px_rgba(0,0,0,0.02)] mb-xl flex flex-col md:flex-row gap-md items-center">
        <div className="flex-1 w-full relative">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            className="w-full bg-surface-container-low border-none rounded-lg pl-xl pr-md py-sm font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-colors outline-none placeholder:text-outline-variant"
            placeholder="Search by skill, role, or tool..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Grid: Available for Swap */}
      {loading ? (
        <div className="text-center py-xl">
          <span className="material-symbols-outlined text-[48px] text-primary mb-md block animate-pulse">psychiatry</span>
          <p className="font-body-md text-on-surface-variant">AI is calculating optimal matches for you...</p>
        </div>
      ) : filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredProfiles.map((profile) => (
            <SkillSwapCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-xl">
          <span className="material-symbols-outlined text-[48px] text-outline mb-md block">search_off</span>
          <h3 className="font-h3 text-h3 text-on-surface mb-xs">No matches found</h3>
          <p className="font-body-md text-on-surface-variant">
            Try adjusting your search or filters to find skill swaps.
          </p>
        </div>
      )}
    </div>
  );
}
