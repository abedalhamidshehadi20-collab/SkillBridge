'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useTheme } from '@/lib/theme';
import type { User } from '@supabase/supabase-js';

const navItems = [
  { name: 'Dashboard',    icon: 'dashboard',   href: '/admin' },
  { name: 'My Courses',   icon: 'school',       href: '/admin/courses' },
  { name: 'Assignments',  icon: 'assignment',   href: '/admin/assignments' },
  { name: 'Messages',     icon: 'mail',         href: '/admin/messages' },
  { name: 'Settings',     icon: 'settings',     href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const { theme, toggle } = useTheme();
  const isDark    = theme === 'dark';

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const firstName = user?.user_metadata?.first_name ?? 'Admin';
  const avatarUrl  = user?.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="flex min-h-screen bg-background text-on-background">
      {/* ── Admin Sidebar ──────────────────────────────────── */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-surface-container-low dark:bg-slate-950 border-r border-outline-variant dark:border-slate-800 z-40">

        {/* Logo */}
        <div className="px-6 pt-6 pb-2">
          <Link href="/" className="font-bold text-[22px] leading-none text-primary dark:text-primary block mb-6">
            SkillBridge
          </Link>

          {/* User card */}
          <div className="flex items-center gap-3 mb-5">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={firstName}
                className="w-12 h-12 rounded-full border-2 border-outline-variant object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-outline-variant bg-surface-container-high dark:bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px] text-on-surface-variant">person</span>
              </div>
            )}
            <div>
              <p className="font-semibold text-[14px] leading-tight text-on-surface">
                Welcome back, {firstName}
              </p>
              <p className="text-[12px] text-on-surface-variant mt-0.5">Instructor Account</p>
            </div>
          </div>

          {/* CTA */}
          <button className="w-full py-2.5 px-4 rounded-lg font-semibold text-[14px] text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all duration-200"
            style={{ background: 'linear-gradient(to right, #6063ee, #4648d4)' }}
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create New Course
          </button>
        </div>

        {/* Main nav */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-semibold transition-all duration-150 active:scale-[0.98]
                      ${isActive
                        ? 'bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary'
                        : 'text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-slate-800 dark:text-slate-400'
                      }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer nav */}
        <div className="px-3 pb-4 pt-2 border-t border-outline-variant dark:border-slate-800">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-[14px] font-semibold text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors mb-1"
          >
            <span className="relative w-5 h-5 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[20px] absolute transition-all duration-300"
                style={{ fontVariationSettings: "'FILL' 1", opacity: isDark ? 0 : 1, transform: isDark ? 'scale(0.5) rotate(-90deg)' : 'scale(1)' }}
              >light_mode</span>
              <span
                className="material-symbols-outlined text-[20px] absolute transition-all duration-300"
                style={{ fontVariationSettings: "'FILL' 1", opacity: isDark ? 1 : 0, transform: isDark ? 'scale(1)' : 'scale(0.5) rotate(90deg)' }}
              >dark_mode</span>
            </span>
            {isDark ? 'Dark mode' : 'Light mode'}
            <div className={`ml-auto relative w-9 h-5 rounded-full transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-slate-300'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${isDark ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
          </button>

          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-semibold text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            Help Center
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-[14px] font-semibold text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors text-left"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Log Out
          </button>
        </div>
      </nav>

      {/* ── Mobile top bar ─────────────────────────────────── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-surface-container-low/90 dark:bg-slate-950/90 backdrop-blur border-b border-outline-variant">
        <Link href="/" className="font-bold text-[18px] text-primary">SkillBridge</Link>
        <span className="material-symbols-outlined text-on-surface cursor-pointer">menu</span>
      </header>

      {/* ── Page content ───────────────────────────────────── */}
      <main className="flex-1 md:ml-64 pt-14 md:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
