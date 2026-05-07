'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function NavAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Initial session check
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    // Keep in sync with auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
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

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger card — matches reference image */}
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
          <p className="text-[13px] font-semibold text-[#1a1f2e] leading-tight whitespace-nowrap max-w-[140px] truncate">
            {fullName}
          </p>
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
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#1a1f2e] hover:bg-[#f4f6fb] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#6b7280]">dashboard</span>
            Dashboard
          </Link>
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
