'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

type Project = {
  id: string;
  title: string;
  client: string;
  status: string;
  progress: number;
  tasks: string[];
  members?: string[];
  extraMembers?: number;
};

function getStatusStyle(status: string) {
  switch (status) {
    case 'In Progress':
      return 'bg-secondary-fixed text-on-secondary-fixed';
    case 'Review':
      return 'bg-tertiary-fixed text-on-tertiary-fixed';
    case 'Planning':
      return 'bg-surface-container-highest text-on-surface border border-outline-variant';
    default:
      return 'bg-surface-container-highest text-on-surface';
  }
}

function getProgressStyle(status: string) {
  switch (status) {
    case 'In Progress':
      return 'bg-primary';
    case 'Review':
      return 'bg-tertiary';
    case 'Planning':
      return 'bg-outline';
    default:
      return 'bg-primary';
  }
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProjects() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_id', user.id);
        
      if (data) {
        // Map data to match UI expectations
        const mapped = data.map(p => ({
          ...p,
          members: [] // Placeholder until team members are implemented
        }));
        setProjects(mapped as Project[]);
      }
      setLoading(false);
    }
    fetchProjects();
  }, [supabase]);

  return (
    <div className="flex-1 p-margin md:p-xl max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-xl">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">My Projects</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage your active collaborations and track milestones.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-md py-sm rounded-lg btn-primary-gradient text-on-primary font-label-sm text-label-sm inner-glow shadow-sm hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Create New Project
        </button>
      </header>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {loading ? (
          <div className="p-xl text-center text-on-surface-variant col-span-full">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-xl text-center text-on-surface-variant col-span-full">You have no active projects.</div>
        ) : projects.map((project) => (
          <article key={project.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-[2px] flex flex-col h-full">
            <div className="flex justify-between items-start mb-md">
              <div>
                <h3 className="font-h3 text-h3 text-on-surface mb-xs">{project.title}</h3>
                <p className="font-caption text-caption text-on-surface-variant">Client: {project.client}</p>
              </div>
              <span className={`${getStatusStyle(project.status)} font-caption text-caption px-sm py-xs rounded-full whitespace-nowrap`}>
                {project.status}
              </span>
            </div>

            <div className="mb-lg">
              <div className="flex justify-between font-label-sm text-label-sm mb-sm text-on-surface">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-[8px] bg-surface-variant rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getProgressStyle(project.status)}`} 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-xl flex-1">
              <h4 className="font-label-sm text-label-sm text-on-surface-variant mb-sm">Upcoming Tasks</h4>
              <ul className="space-y-sm">
                {(project.tasks || []).map((task, i) => (
                  <li key={i} className="flex items-start gap-sm font-body-md text-body-md text-on-surface">
                    <span className="material-symbols-outlined text-[20px] text-outline mt-[2px]">radio_button_unchecked</span>
                    <span className="leading-tight">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-md border-t border-surface-variant mt-auto">
              <div className="flex -space-x-sm">
                {(project.members || []).map((avatar, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    key={i}
                    className="w-[32px] h-[32px] rounded-full border-2 border-surface-container-lowest object-cover" 
                    alt="Team member avatar" 
                    src={avatar}
                  />
                ))}
                {project.extraMembers && (
                  <div className="w-[32px] h-[32px] rounded-full border-2 border-surface-container-lowest bg-surface-container flex items-center justify-center font-caption text-caption text-on-surface-variant font-medium">
                    +{project.extraMembers}
                  </div>
                )}
              </div>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                more_horiz
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
