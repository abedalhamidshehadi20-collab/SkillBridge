'use client';

import { useState } from 'react';

// Mock data – in a later phase this will come from Supabase + AI matching
const MOCK_SWAPS = [
  {
    id: '1',
    name: 'Elena Rivera',
    role: 'Senior UX Designer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXFEI80xEbcDUuSnxwYtZAOG9svm_vEXDeNRPXMRIR-adxe-xIGUlOnbjmKeitDooqIbG5RvkTndYDO3cQa3rDwwJ5hxfPcGvMpQc240T5dXHi6pKTO0Z6HDFbtsr6fj_yOfeKKHvzpb7YQ6UVfrqBKehcSHo4wcrGx0w3OuG8vr3MWQ1XcZS16QiZDn70mUl-AnbkGDVPZrqdUCCIi26a1gUok-6trTTfyfewmSOy6itQpeBRm-TZ8L3jtf_pFd5bai1bLDfze_Dt',
    matchPercent: 98,
    canTeach: ['Figma', 'Prototyping', 'User Research'],
    wantsToLearn: ['React Native', 'CSS Animations'],
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'Frontend Developer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2LPsaQUWOjhM6i5gQyZG4RiNiACdmyjXjrUSI8hxIh3oI9q1VaqzlNR5FvPS0rr1BKrl-6yHbwI28Sk6PL4kDo9997l9XMgzOgOa5uQ-e3Whwh4cJ784sEqLt_f526G4eKaN9-pL98bu28VggbkYDnS-FxMI_2AXWg96kS0RuW--7NI9WxjsI-QbBCTrYYt3VVpic1otQcD4A0SESMpcfksf9RAQDGwJQWnP8X_5pyNfMp_8Oot-V8txUIUd-K3RvDcg9Qc_YJUV8',
    matchPercent: 92,
    canTeach: ['Vue.js', 'Tailwind CSS', 'JavaScript'],
    wantsToLearn: ['UI Design Fundamentals', 'Color Theory'],
  },
  {
    id: '3',
    name: 'Sarah Lin',
    role: 'Product Manager',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWfdMhwMJyY6zJSX5K04PAk33CXpyISAvzsZx9W8eB34E_c09URWfrks-6YiE4uZSRjKcBN74tZCLHJItrsZuskLntDF5aiC_z_GaZ33puNViGqc-s4DDazabnB0iu8I9mAlq7I8f5aQK-BwE8wuYsX2VKzq5dK--mJkZza5S5_lgG5x8LHGMgVGQiRZw9f2h_ITbHhzf4GPFsQFLELDCCkVpq0tnbRpp7ovc6pL0Me09GelLOQGjDY3TPiGXp9k6zHiSoefLwuRh9',
    matchPercent: 85,
    canTeach: ['Agile Management', 'Product Strategy'],
    wantsToLearn: ['Data Analysis', 'SQL Basics'],
  },
];

function SkillSwapCard({
  swap,
}: {
  swap: (typeof MOCK_SWAPS)[number];
}) {
  const isHighMatch = swap.matchPercent >= 95;

  return (
    <article className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0px_10px_25px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Header */}
      <div className="flex items-start justify-between mb-md">
        <div className="flex items-center gap-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={`${swap.name} avatar`}
            className="w-12 h-12 rounded-full object-cover border-2 border-surface-container-lowest shadow-sm"
            src={swap.avatar}
          />
          <div>
            <h3 className="font-h3 text-[18px] text-on-surface leading-tight">{swap.name}</h3>
            <p className="font-body-md text-sm text-on-surface-variant">{swap.role}</p>
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
            {swap.matchPercent}% Match
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
            {swap.canTeach.map((skill) => (
              <span
                key={skill}
                className="bg-surface-container-highest text-on-surface px-3 py-1 rounded-full font-caption text-caption"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Wants to Learn */}
        <div className="bg-surface-container-low rounded-lg p-sm border border-surface-variant">
          <div className="flex items-center gap-xs mb-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span className="font-label-sm text-xs uppercase tracking-wider text-outline">Wants to Learn</span>
          </div>
          <div className="flex flex-wrap gap-xs mt-1">
            {swap.wantsToLearn.map((skill) => (
              <span
                key={skill}
                className="bg-primary-container/10 text-primary px-3 py-1 rounded-full font-caption text-caption font-medium border border-primary/20"
              >
                {skill}
              </span>
            ))}
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

  const filteredSwaps = MOCK_SWAPS.filter(
    (swap) =>
      swap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      swap.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      swap.canTeach.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      swap.wantsToLearn.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        <div className="flex gap-sm w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button className="whitespace-nowrap flex items-center gap-xs px-md py-sm rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-sm text-label-sm transition-colors">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Filters
          </button>
          <div className="h-8 w-px bg-outline-variant self-center mx-xs hidden md:block"></div>
          <button className="whitespace-nowrap flex items-center gap-xs px-md py-sm rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">
            Role: Design
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
          <button className="whitespace-nowrap flex items-center gap-xs px-md py-sm rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">
            Level: Intermediate
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Available for Swap */}
      {filteredSwaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredSwaps.map((swap) => (
            <SkillSwapCard key={swap.id} swap={swap} />
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
