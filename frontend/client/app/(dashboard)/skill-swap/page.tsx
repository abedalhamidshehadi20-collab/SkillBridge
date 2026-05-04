'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar_url: string;
  can_teach: string[];
  wants_to_learn: string[];
};

function SkillSwapCard({
  profile,
  matchPercent,
}: {
  profile: Profile;
  matchPercent: number;
}) {
  const isHighMatch = matchPercent >= 80;
  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Anonymous';

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
            {matchPercent}% Match
          </span>
        </div>
      </div>

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
      <button className="w-full bg-gradient-to-br from-primary to-secondary text-on-primary rounded-lg py-sm px-md font-label-sm text-label-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:opacity-90 hover:shadow-md transition-all flex items-center justify-center gap-sm mt-auto">
        <span className="material-symbols-outlined text-[18px]">handshake</span>
        Request Swap
      </button>
    </article>
  );
}

export default function SkillSwapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfiles() {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user?.id || ''); // Don't show current user
        
      if (data) {
        setProfiles(data as Profile[]);
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
          <p className="font-body-md text-on-surface-variant">Loading potential matches...</p>
        </div>
      ) : filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredProfiles.map((profile, index) => (
            <SkillSwapCard key={profile.id} profile={profile} matchPercent={98 - index * 5} />
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
