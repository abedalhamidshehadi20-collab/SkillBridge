'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

// --- Form Validation Schema ---
const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  commitment: z.string().min(1, 'Please select a commitment level'),
  skillsText: z.string().optional(), // We'll parse this into an array
});

type ProjectForm = z.infer<typeof projectSchema>;

export default function CreateProjectPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      commitment: '5-10 hrs/wk',
      skillsText: '',
    },
  });

  const onSubmit = async (data: ProjectForm) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to create a project');

      // Parse comma-separated skills
      const required_skills = data.skillsText
        ? data.skillsText.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      // Insert into database
      const { error } = await supabase
        .from('projects')
        .insert({
          owner_id: user.id,
          title: data.title,
          description: data.description,
          commitment: data.commitment,
          required_skills,
          status: 'Planning', // Default status for new projects
          progress: 0,
        });

      if (error) throw error;

      // Navigate back to projects list on success
      router.push('/projects');
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 p-margin md:p-xl max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="mb-lg">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-sm mb-md"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Projects
        </Link>
        <h1 className="font-h1 text-h1 text-on-surface mb-xs">Create New Project</h1>
        <p className="font-body-md text-on-surface-variant">
          Start a new collaboration, set requirements, and find the perfect teammates.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm">
        {errorMsg && (
          <div className="bg-error/10 text-error border border-error/20 p-sm rounded-lg mb-md text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
          {/* Title */}
          <div>
            <label className="block font-label-sm text-on-surface mb-xs">Project Title *</label>
            <input
              type="text"
              {...register('title')}
              placeholder="e.g. Eco-Track Dashboard Redesign"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-on-surface transition-all placeholder:text-outline/60"
            />
            {errors.title && <p className="text-error text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block font-label-sm text-on-surface mb-xs">Description *</label>
            <textarea
              {...register('description')}
              rows={4}
              placeholder="Describe the goals, tech stack, and what you're looking for in teammates..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-on-surface transition-all placeholder:text-outline/60 resize-y"
            ></textarea>
            {errors.description && <p className="text-error text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {/* Required Skills */}
            <div>
              <label className="block font-label-sm text-on-surface mb-xs">Required Skills</label>
              <input
                type="text"
                {...register('skillsText')}
                placeholder="React, Figma, Node.js (comma separated)"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-on-surface transition-all placeholder:text-outline/60"
              />
              <p className="text-xs text-on-surface-variant mt-1">Separate skills with commas</p>
            </div>

            {/* Commitment */}
            <div>
              <label className="block font-label-sm text-on-surface mb-xs">Weekly Commitment</label>
              <select
                {...register('commitment')}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-on-surface transition-all"
              >
                <option value="1-5 hrs/wk">1-5 hrs/wk</option>
                <option value="5-10 hrs/wk">5-10 hrs/wk</option>
                <option value="10-20 hrs/wk">10-20 hrs/wk</option>
                <option value="20+ hrs/wk">20+ hrs/wk</option>
              </select>
              {errors.commitment && <p className="text-error text-xs mt-1">{errors.commitment.message}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-md pt-md border-t border-surface-variant">
            <Link 
              href="/projects"
              className="px-md py-sm rounded-lg font-label-sm text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-xl py-sm rounded-lg btn-primary-gradient text-on-primary font-label-sm inner-glow shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  Creating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                  Launch Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
