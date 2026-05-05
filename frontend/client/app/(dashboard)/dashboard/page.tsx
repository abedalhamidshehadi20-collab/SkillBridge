'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  can_teach: string[];
};

type Notification = {
  id: string;
  user_id: string;
  sender_id: string;
  type: string;
  content: string;
  link?: string;
  is_read: boolean;
  created_at: string;
  sender: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data as Profile);
      }

      // Fetch Notifications
      const { data: notifs } = await supabase
        .from('notifications')
        .select(`
          *,
          sender:sender_id (first_name, last_name, avatar_url)
        `)
        .eq('user_id', user.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false });

      if (notifs) {
        setNotifications(notifs as any[]);
      }

      setLoading(false);

      // Subscribe to Realtime Notifications
      const channel = supabase
        .channel(`notifications_${user.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
          },
          async (payload) => {
            // Fetch the sender details for the new notification
            const { data: senderProfile } = await supabase
              .from('profiles')
              .select('first_name, last_name, avatar_url')
              .eq('id', payload.new.sender_id)
              .single();

            const newNotif = {
              ...payload.new,
              sender: senderProfile || { first_name: 'Someone', last_name: '', avatar_url: '' }
            };

            setNotifications((prev) => [newNotif as Notification, ...prev]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
    const cleanup = fetchProfile();
    return () => {
      cleanup.then(fn => fn && fn());
    };
  }, [supabase]);

  const handleMarkAllAsRead = async () => {
    if (!profile) return;
    
    // Optimistic UI update
    setNotifications([]);

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', profile.id)
      .eq('is_read', false);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-surface-container-lowest">
        <span className="material-symbols-outlined text-[48px] animate-spin text-primary">progress_activity</span>
      </div>
    );
  }

  const firstName = profile?.first_name || 'User';
  const skills = profile?.can_teach || [];

  return (
    <div className="flex-1 flex flex-col lg:flex-row p-md lg:p-lg gap-lg">
      {/* Left/Center Column - Dashboard Canvas */}
      <div className="flex-1 flex flex-col gap-lg">
        {/* Welcome Section */}
        <header className="flex flex-col gap-sm">
          <h2 className="font-h2 text-h2 text-on-surface">Welcome back, {firstName}.</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">You've made steady progress this week. Keep up the momentum.</p>
        </header>

        {/* Progress Summary Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-[12px] p-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">school</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Current Path</span>
            </div>
            <div>
              <p className="font-h3 text-h3 text-on-surface mb-1">UI/UX Masterclass</p>
              <div className="w-full bg-surface-container-high rounded-full h-2 mt-3">
                <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="font-caption text-caption text-on-surface-variant mt-2 text-right">65% Complete</p>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest border border-outline-variant rounded-[12px] p-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary">handshake</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Active Swaps</span>
            </div>
            <div className="flex items-end justify-between">
              <p className="font-h1 text-h1 text-on-surface leading-none">3</p>
              <p className="font-caption text-caption text-secondary font-medium">Pending reviews</p>
            </div>
          </div>
          
          <div className="bg-primary-container border border-primary/20 rounded-[12px] p-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <span className="material-symbols-outlined text-on-primary-container">local_fire_department</span>
              <span className="font-label-sm text-label-sm text-on-primary-container">Learning Streak</span>
            </div>
            <div className="relative z-10">
              <p className="font-h1 text-h1 text-on-primary-container leading-none mb-1">12 <span className="text-lg">days</span></p>
              <p className="font-caption text-caption text-on-primary-container/80">Personal best!</p>
            </div>
          </div>
        </div>

        {/* AI Recommendations Grid */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-h3 text-h3 text-on-surface">AI Recommendations</h3>
            <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">View all</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-[12px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all flex">
              <div className="w-1/3 bg-surface-container-highest bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJOVhm4LlPhhTeDyuKPdlzMH2gjLELwe4m2VJCXoGyW9VSSPWq8aix3nL2aXNTjR-9NYGYoRVpEx_MIUcPLY9dvHxOpxlnwcq8PmynuaVqW4oq4kIbetEXUcg1IGWRxt13qAEvq_mdJhpYdRf4QfwJ-tj_KwA7pVrjhJRUkkv97k4T_4mdpq-ECUdLbWy6fVXNXMhqwPUHy2465Q_Pvv0AmLk30_L5Hw4IuMmbPkgt0XwiViTe3e2tNix4Qqf7ZnVIwRnBGHe0q0bF')" }}></div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">React</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-secondary/10 text-secondary">Match: 95%</span>
                  </div>
                  <h4 className="font-body-md text-body-md font-semibold text-on-surface leading-tight mb-1">Advanced React Patterns</h4>
                  <p className="font-caption text-caption text-on-surface-variant line-clamp-2">Deep dive into custom hooks, context, and performance optimization techniques.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant rounded-[12px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all flex">
              <div className="w-1/3 bg-surface-container-highest bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8X3OcZK2un6zfUNeBXcrZ7WLKfmHVajZ3IN8cjTSPXL1VDLRybKKv3TKriCVgAAYDVx80xJGY49aN4WsoBi3qoOcXVbU3cQzpAox85nGxTqVz5QxoVXUEz3OUFaTOihC7b4vmjjatgUZ8aPsLynS8F97DrHZ6n2_VT38__AfkuB-0C5_OD4ZHVegjJqzZtT8ZngSrU8ZQWNL99p4dYYLG46ckGvtmmDmR3E3qUts-UTMvf9X8EnUWkcS0tLoZsWmPw2qaHg6qGv4o')" }}></div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-tertiary-container/10 text-tertiary">Figma</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-secondary/10 text-secondary">Match: 88%</span>
                  </div>
                  <h4 className="font-body-md text-body-md font-semibold text-on-surface leading-tight mb-1">Design Systems in Figma</h4>
                  <p className="font-caption text-caption text-on-surface-variant line-clamp-2">Learn to build scalable and maintainable design systems from scratch.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Row: Recent Activity & My Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-md h-full">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-[12px] p-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-h3 text-h3 text-on-surface">Recent Activity</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px]">play_arrow</span>
                </div>
                <div className="flex-1 pb-4 border-b border-outline-variant/50">
                  <p className="font-body-md text-body-md text-on-surface mb-1">Completed module <span className="font-semibold">&quot;Wireframing Basics&quot;</span></p>
                  <p className="font-caption text-caption text-on-surface-variant">2 hours ago • UI/UX Masterclass</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[20px]">autorenew</span>
                </div>
                <div className="flex-1 pb-4 border-b border-outline-variant/50">
                  <p className="font-body-md text-body-md text-on-surface mb-1">Skill swap requested with <span className="font-semibold">Sarah J.</span></p>
                  <p className="font-caption text-caption text-on-surface-variant">Yesterday • Offering: React / Requesting: Figma</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-tertiary-container/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">military_tech</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md text-body-md text-on-surface mb-1">Earned badge <span className="font-semibold">&quot;CSS Grid Master&quot;</span></p>
                  <p className="font-caption text-caption text-on-surface-variant">2 days ago • Frontend Track</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* My Skills Widget */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-[12px] p-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col">
            <h3 className="font-h3 text-h3 text-on-surface mb-6">My Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => {
                  // Cycle through some colors for variety
                  const colors = [
                    'bg-primary/10 text-primary border-primary/20',
                    'bg-secondary/10 text-secondary border-secondary/20',
                    'bg-tertiary-container/10 text-tertiary border-tertiary-container/20',
                    'bg-surface-container-highest text-on-surface-variant border-outline-variant'
                  ];
                  const colorClass = colors[index % colors.length];
                  
                  return (
                    <span key={skill} className={`inline-flex items-center px-3 py-1 rounded-full font-label-sm text-label-sm border ${colorClass}`}>
                      {skill}
                    </span>
                  );
                })
              ) : (
                <span className="text-on-surface-variant font-body-md">You haven't listed any skills yet.</span>
              )}
            </div>
            <a href="/profile" className="mt-auto pt-6 text-primary font-label-sm text-label-sm flex items-center justify-center gap-1 hover:underline w-full">
              <span className="material-symbols-outlined text-[18px]">add</span> Edit Skills
            </a>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Notifications */}
      <aside className="w-full lg:w-80 flex flex-col gap-md shrink-0">
        <div className="bg-surface-container-low border border-outline-variant/50 rounded-[12px] p-md flex flex-col h-full min-h-[400px]">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="font-h3 text-h3 text-on-surface text-[20px]">Notifications</h3>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
          </div>
          
          <div className="flex flex-col gap-3">
            {notifications.length === 0 ? (
              <div className="text-center text-on-surface-variant p-4 font-body-md">
                You're all caught up!
              </div>
            ) : (
              notifications.map((notif) => {
                let icon = 'notifications';
                let iconColor = 'text-primary';
                let bgColor = 'bg-primary/10';

                if (notif.type === 'message') {
                  icon = 'forum';
                  iconColor = 'text-secondary';
                  bgColor = 'bg-secondary/10';
                } else if (notif.type === 'project_invite') {
                  icon = 'group_add';
                  iconColor = 'text-primary';
                  bgColor = 'bg-primary/10';
                } else if (notif.type === 'swap_request') {
                  icon = 'swap_horiz';
                  iconColor = 'text-tertiary';
                  bgColor = 'bg-tertiary-container/10';
                }

                // Format time roughly (for MVP just showing date or time)
                const timeStr = new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <a key={notif.id} href={notif.link || '#'} className="bg-surface-container-lowest rounded-lg p-3 shadow-sm border border-outline-variant/30 hover:border-outline-variant transition-colors cursor-pointer block">
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center shrink-0 ${iconColor}`}>
                        <span className="material-symbols-outlined text-[16px]">{icon}</span>
                      </div>
                      <div>
                        <p className="font-body-md text-[14px] text-on-surface leading-snug">
                          <span className="font-semibold">{notif.sender?.first_name}</span> {notif.content}
                        </p>
                        <p className="font-caption text-caption text-on-surface-variant mt-1">{timeStr}</p>
                      </div>
                    </div>
                  </a>
                );
              })
            )}
          </div>
          
          {notifications.length > 0 && (
            <button 
              onClick={handleMarkAllAsRead}
              className="mt-auto pt-4 text-on-surface-variant font-label-sm text-label-sm text-center hover:text-on-surface transition-colors w-full"
            >
              Mark all as read
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
