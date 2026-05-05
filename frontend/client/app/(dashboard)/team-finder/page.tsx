'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

type MatchProject = {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  commitment: string;
  matchScore: number;
  matchReason?: string;
};

export default function TeamFinderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<MatchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProjects() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        try {
          const res = await fetch('http://localhost:3001/api/v1/matches/projects', {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          });
          const json = await res.json();
          if (json.matches) {
            // Sort by match score descending
            const sorted = json.matches.sort((a: MatchProject, b: MatchProject) => b.matchScore - a.matchScore);
            setProjects(sorted);
          }
        } catch (err) {
          console.error('Error fetching project matches:', err);
        }
      }
      setLoading(false);
    }
    fetchProjects();
  }, [supabase]);

  const filteredProjects = projects.filter(
    (proj) =>
      (proj.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (proj.required_skills || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Premium Header Area */}
      <div className="w-full bg-surface-container relative overflow-hidden border-b border-outline-variant/30">
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-overlay" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}
        ></div>
        <div className="relative z-10 px-lg py-xl max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <h1 className="font-h1 text-h1 text-on-surface mb-xs">Team Finder</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Discover open projects and collaborate with peers.</p>
            </div>
            
            {/* Search Input */}
            <div className="w-full md:w-96 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm placeholder:text-outline/70" 
                placeholder="Search projects by name or skill..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex-1 px-lg py-margin max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Filters Sidebar (Bento Style) */}
        <aside className="lg:col-span-3 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
            <h3 className="font-h3 text-h3 text-on-surface mb-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-[20px]">filter_list</span> Filters
            </h3>
            
            <div className="border-t border-outline-variant/50 pt-md mt-sm">
              <h4 className="font-label-sm text-label-sm text-on-surface mb-xs">Project Type</h4>
              <div className="flex flex-wrap gap-2">
                <button className="bg-primary-container text-on-primary-container border border-primary-container font-label-sm text-label-sm px-3 py-1.5 rounded-full transition-colors">All</button>
                <button className="bg-surface border border-outline-variant text-on-surface-variant hover:border-outline font-label-sm text-label-sm px-3 py-1.5 rounded-full transition-colors">Open Source</button>
                <button className="bg-surface border border-outline-variant text-on-surface-variant hover:border-outline font-label-sm text-label-sm px-3 py-1.5 rounded-full transition-colors">Commercial</button>
                <button className="bg-surface border border-outline-variant text-on-surface-variant hover:border-outline font-label-sm text-label-sm px-3 py-1.5 rounded-full transition-colors">Hackathon</button>
              </div>
            </div>
            
            <div className="border-t border-outline-variant/50 pt-md mt-md">
              <h4 className="font-label-sm text-label-sm text-on-surface mb-xs">Skill Requirement</h4>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-outline group-hover:border-primary flex items-center justify-center bg-primary border-primary">
                    <span className="material-symbols-outlined text-[12px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Frontend Dev</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-outline group-hover:border-primary flex items-center justify-center bg-surface-container-lowest"></div>
                  <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Backend Dev</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-outline group-hover:border-primary flex items-center justify-center bg-surface-container-lowest"></div>
                  <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">UX/UI Design</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-outline group-hover:border-primary flex items-center justify-center bg-surface-container-lowest"></div>
                  <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Data Science</span>
                </label>
              </div>
            </div>
            
            <div className="border-t border-outline-variant/50 pt-md mt-md">
              <h4 className="font-label-sm text-label-sm text-on-surface mb-xs">Commitment</h4>
              <select className="w-full bg-surface border border-outline-variant text-on-surface font-body-md rounded-lg px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                <option>Any Commitment</option>
                <option>1-5 hrs/week</option>
                <option>5-15 hrs/week</option>
                <option>15+ hrs/week</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Projects Grid */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-md items-start align-top content-start">
          {loading ? (
            <div className="p-xl text-center text-on-surface-variant col-span-full">
              <span className="material-symbols-outlined text-[48px] text-primary mb-md block animate-pulse">psychiatry</span>
              <p className="font-body-md text-on-surface-variant">AI is evaluating project compatibility...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-xl text-center text-on-surface-variant col-span-full">No open projects found.</div>
          ) : filteredProjects.map((project) => {
            const isHighMatch = project.matchScore >= 80;
            return (
              <article key={project.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
                <div className="flex justify-between items-start mb-sm">
                  <h2 className="font-h3 text-h3 text-on-surface pr-4">{project.title}</h2>
                  <div 
                    className={`${isHighMatch ? 'bg-secondary-container/20 text-secondary border-secondary-container/30' : 'bg-surface-container text-on-surface-variant border-outline-variant/50'} border px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0`}
                    title={project.matchReason || 'Compatibility Score'}
                  >
                    <span className="material-symbols-outlined text-[14px]" style={isHighMatch ? { fontVariationSettings: "'FILL' 1" } : {}}>bolt</span>
                    <span className="font-label-sm text-label-sm font-bold">{project.matchScore}%</span>
                  </div>
                </div>
                
                {project.matchReason && (
                  <div className="bg-secondary/5 border border-secondary/10 rounded-lg p-2 mb-sm text-sm font-body-sm text-on-surface-variant italic">
                    <span className="material-symbols-outlined text-[14px] text-secondary align-middle mr-1">psychiatry</span>
                    {project.matchReason}
                  </div>
                )}

                <p className="font-body-md text-body-md text-on-surface-variant mb-md flex-1">
                  {project.description}
                </p>
                
                <div className="mb-lg">
                  <p className="font-caption text-caption text-outline mb-2 uppercase tracking-wider font-semibold">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.required_skills || []).map(skill => (
                      <span key={skill} className="bg-surface-container text-on-surface-variant font-caption text-caption px-2.5 py-1 rounded-full border border-outline-variant/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t border-outline-variant/40 pt-md mt-auto">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span className="font-caption text-caption">{project.commitment}</span>
                  </div>
                  
                  {isHighMatch ? (
                    <button className="btn-primary-gradient text-white font-label-sm text-label-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                      View Project
                    </button>
                  ) : (
                    <button className="bg-surface border border-outline-variant text-on-surface hover:bg-surface-container font-label-sm text-label-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                      Join Team
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
