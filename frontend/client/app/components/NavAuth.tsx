'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function NavAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    async function init() {
      const { data } = await supabase.auth.getUser();
      const u = data.user ?? null;
      setUser(u);

      if (u) {
        // Check admin role in profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', u.id)
          .single();

        setIsAdmin(
          profile?.role === 'admin' || u.user_metadata?.is_admin === true
        );
      }

      setLoading(false);
    }

    init();

    // Keep in sync with auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setIsAdmin(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.refresh();
  };

  // Skeleton placeholder while checking session
  if (loading) {
    return <div className="h-9 w-32 animate-pulse rounded-full bg-[#e2e6f0]" />;
  }

  // ── Logged OUT: show button pair ──────────────────────────────
  if (!user) {
    return (
      <>
        <Link className="btn-ghost" href="/login">Log In</Link>
        <Link className="btn-primary" href="/register">Get Started</Link>
      </>
    );
  }

  // ── Logged IN: show user card with dropdown ───────────────────
  const fullName =
    (user.user_metadata?.first_name && user.user_metadata?.last_name)
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'User';

  const email = user.email ?? '';
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;

  // Admin goes to /admin, regular users go to /dashboard
  const dashboardHref = isAdmin ? '/admin' : '/dashboard';

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger card */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-full border border-[#dde3f0] bg-white px-3 py-1.5 shadow-sm hover:shadow-md transition-shadow duration-150 cursor-pointer"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {/* Avatar / icon */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-8 h-8 rounded-full object-cover border border-[#e2e6f0]"
          />
        ) : (
          <span className="w-8 h-8 rounded-full bg-[#eef0f8] border border-[#dde3f0] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] text-[#7b82a0]">person</span>
          </span>
        )}

        {/* Name + email */}
        <div className="text-left hidden sm:block">
          <div className="flex items-center gap-1.5">
            <p className="text-[13px] font-semibold text-[#1a1f2e] leading-tight whitespace-nowrap max-w-[130px] truncate">
              {fullName}
            </p>
            {isAdmin && (
              <span className="text-[9px] font-bold bg-primary text-white px-1.5 py-0.5 rounded-full leading-none">
                ADMIN
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#7b82a0] leading-tight whitespace-nowrap max-w-[140px] truncate">
            {email}
          </p>
        </div>

        {/* Chevron */}
        <span
          className={`material-symbols-outlined text-[18px] text-[#7b82a0] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[#dde3f0] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-1.5 z-50 animate-[fade-slide-down_0.15s_ease]">
          <Link
            href={dashboardHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#1a1f2e] hover:bg-[#f4f6fb] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#6b7280]">
              {isAdmin ? 'admin_panel_settings' : 'dashboard'}
            </span>
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </Link>
          {isAdmin && (
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#1a1f2e] hover:bg-[#f4f6fb] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-[#6b7280]">dashboard</span>
              User Dashboard
            </Link>
          )}
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#1a1f2e] hover:bg-[#f4f6fb] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#6b7280]">account_circle</span>
            Profile
          </Link>
          <div className="my-1 border-t border-[#eef0f8]" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
