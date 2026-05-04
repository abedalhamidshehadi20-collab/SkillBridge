'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@supabase/supabase-js';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  title: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500, 'Bio is too long').optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const supabase = createClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        reset({
          firstName: user.user_metadata?.first_name || '',
          lastName: user.user_metadata?.last_name || '',
          title: user.user_metadata?.title || 'Member',
          location: user.user_metadata?.location || '',
          bio: user.user_metadata?.bio || '',
        });
      }
      setLoading(false);
    }
    loadProfile();
  }, [supabase.auth, reset]);

  const onSubmit = async (data: ProfileForm) => {
    setSaveMessage(null);
    const { error, data: updatedUser } = await supabase.auth.updateUser({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        title: data.title,
        location: data.location,
        bio: data.bio,
      },
    });

    if (error) {
      setSaveMessage({ type: 'error', text: error.message });
    } else {
      setUser(updatedUser.user);
      setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => {
        setIsEditing(false);
        setSaveMessage(null);
      }, 2000);
    }
  };

  if (loading) {
    return <div className="p-xl text-center">Loading profile...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-md md:p-lg xl:p-xl space-y-8">
      {/* Hero / Profile Header Card */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 ambient-shadow-card p-lg md:p-xl flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
          <img
            alt="Profile avatar"
            className="w-full h-full object-cover rounded-full border-4 border-surface-container-lowest shadow-sm"
            src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.first_name}+${user?.user_metadata?.last_name}&background=3525cd&color=fff`}
          />
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-surface-container-lowest" title="Online"></div>
        </div>

        <div className="flex-1 z-10 w-full">
          {!isEditing ? (
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h2 className="font-h1 text-h1 text-on-surface mb-2">
                  {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-body-md mb-4">
                  {user?.user_metadata?.title && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">work</span> {user.user_metadata.title}
                    </span>
                  )}
                  {user?.user_metadata?.location && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">location_on</span> {user.user_metadata.location}
                    </span>
                  )}
                </div>
                <p className="font-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                  {user?.user_metadata?.bio || 'No bio provided yet. Click "Edit Profile" to add one!'}
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className="gradient-btn text-on-primary font-label-sm text-label-sm px-6 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span> Edit Profile
                </button>
                <button className="bg-surface-container border border-outline-variant/50 text-on-surface font-label-sm text-label-sm px-4 py-2.5 rounded-lg hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/50">
              <h3 className="font-h3 text-h3 mb-4">Edit Profile</h3>
              
              {saveMessage && (
                <div className={`p-3 rounded-lg mb-4 text-sm ${saveMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-error-container text-on-error-container'}`}>
                  {saveMessage.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-label-sm text-on-surface-variant block mb-1">First Name</label>
                  <input
                    {...register('firstName')}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2"
                  />
                  {errors.firstName && <span className="text-error text-xs">{errors.firstName.message}</span>}
                </div>
                <div>
                  <label className="font-label-sm text-on-surface-variant block mb-1">Last Name</label>
                  <input
                    {...register('lastName')}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2"
                  />
                  {errors.lastName && <span className="text-error text-xs">{errors.lastName.message}</span>}
                </div>
                <div>
                  <label className="font-label-sm text-on-surface-variant block mb-1">Title / Role</label>
                  <input
                    {...register('title')}
                    placeholder="e.g. Senior UX Designer"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-on-surface-variant block mb-1">Location</label>
                  <input
                    {...register('location')}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-label-sm text-on-surface-variant block mb-1">Bio</label>
                  <textarea
                    {...register('bio')}
                    rows={4}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gradient-btn text-on-primary px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-70"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Grid Layout for Teaching & Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teaching Section (Bento Grid Style) */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 ambient-shadow-card p-lg h-full">
          <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
            <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface">Teaching</h3>
          </div>
          <p className="font-body-md text-on-surface-variant mb-6">Skills {user?.user_metadata?.first_name || 'you'} can mentor others in:</p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-primary-container/10 text-primary font-label-sm text-label-sm px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span> UI/UX Design
            </span>
            <span className="bg-secondary-container/10 text-secondary font-label-sm text-label-sm px-4 py-2 rounded-full border border-secondary/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span> Figma Prototyping
            </span>
            <span className="bg-tertiary-container/10 text-tertiary font-label-sm text-label-sm px-4 py-2 rounded-full border border-tertiary/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span> Design Systems
            </span>
            <span className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-4 py-2 rounded-full border border-outline-variant/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-outline"></span> User Research
            </span>
          </div>
        </section>

        {/* Learning Section (Progress Bars) */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 ambient-shadow-card p-lg h-full">
          <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
            <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">auto_stories</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface">Learning</h3>
          </div>
          <p className="font-body-md text-on-surface-variant mb-6">Skills {user?.user_metadata?.first_name || 'you'} are currently acquiring:</p>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-sm text-label-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">code</span>
                  React.js Fundamentals
                </span>
                <span className="font-caption text-caption text-on-surface-variant">65%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-sm text-label-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">css</span>
                  Tailwind CSS Styling
                </span>
                <span className="font-caption text-caption text-on-surface-variant">40%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Portfolio / Projects Grid */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 ambient-shadow-card p-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">folder_special</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface">Portfolio &amp; Collaborations</h3>
          </div>
          <button className="text-primary font-label-sm text-label-sm hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Card 1 */}
          <div className="group rounded-xl border border-outline-variant/30 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-surface-container-lowest">
            <div className="h-40 overflow-hidden relative bg-primary/10">
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-primary">Case Study</div>
            </div>
            <div className="p-4">
              <h4 className="font-label-sm text-label-sm text-on-surface mb-2 font-bold">Fintech App Redesign</h4>
              <p className="font-caption text-caption text-on-surface-variant mb-4 line-clamp-2">Collaborated with a front-end developer to revamp the user dashboard for a major finance application.</p>
              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-3">
                <span className="text-xs text-on-surface-variant">2 weeks ago</span>
              </div>
            </div>
          </div>
          
          {/* Project Card 2 */}
          <div className="group rounded-xl border border-outline-variant/30 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-surface-container-lowest">
            <div className="h-40 overflow-hidden relative bg-secondary/10">
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-secondary">Component Library</div>
            </div>
            <div className="p-4">
              <h4 className="font-label-sm text-label-sm text-on-surface mb-2 font-bold">DataViz System</h4>
              <p className="font-caption text-caption text-on-surface-variant mb-4 line-clamp-2">Created a comprehensive set of data visualization components in Figma for cross-team use.</p>
              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-3">
                <span className="text-xs text-on-surface-variant">1 month ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
