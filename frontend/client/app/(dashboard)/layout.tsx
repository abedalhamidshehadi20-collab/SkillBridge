'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useTheme } from '@/lib/theme';

function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`
        relative flex items-center gap-3 rounded-lg px-3 py-2 w-full
        text-slate-500 dark:text-slate-400
        hover:bg-slate-100 dark:hover:bg-slate-900
        font-sans text-sm font-semibold
        hover:translate-x-1 transition-all duration-200
        ${compact ? 'justify-center px-2' : ''}
      `}
    >
      {/* Animated icon swap */}
      <span className="relative w-5 h-5 flex items-center justify-center shrink-0">
        {/* Sun icon */}
        <span
          className="material-symbols-outlined text-[20px] absolute transition-all duration-300"
          style={{
            fontVariationSettings: "'FILL' 1",
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'rotate(-90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
          }}
        >
          light_mode
        </span>
        {/* Moon icon */}
        <span
          className="material-symbols-outlined text-[20px] absolute transition-all duration-300"
          style={{
            fontVariationSettings: "'FILL' 1",
            opacity: isDark ? 1 : 0,
            transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.5)',
          }}
        >
          dark_mode
        </span>
      </span>

      {!compact && (
        <span className="flex-1 text-left">
          {isDark ? 'Dark mode' : 'Light mode'}
        </span>
      )}

      {/* Pill toggle track */}
      {!compact && (
        <div
          className={`
            relative w-9 h-5 rounded-full shrink-0 transition-colors duration-300
            ${isDark ? 'bg-primary' : 'bg-slate-300'}
          `}
        >
          <div
            className={`
              absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm
              transition-transform duration-300
              ${isDark ? 'translate-x-4' : 'translate-x-0.5'}
            `}
          />
        </div>
      )}
    </button>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
    { name: 'Skill Swap', icon: 'swap_horiz', href: '/skill-swap' },
    { name: 'Team Finder', icon: 'group_add', href: '/team-finder' },
    { name: 'Projects', icon: 'assignment', href: '/projects' },
    { name: 'Messages', icon: 'chat_bubble', href: '#' },
    { name: 'Profile', icon: 'account_circle', href: '/profile' },
  ];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex">
      {/* SideNavBar (WEB ONLY) */}
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 gap-y-2 z-40">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold">
            SB
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">SkillBridge</h1>
            <p className="text-xs text-slate-500">Professional Growth</p>
          </div>
        </div>

        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== '#';
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 font-sans text-sm font-semibold hover:translate-x-1 transition-transform duration-200 ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 scale-98 transition-all'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
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
          );
        })}

        <div className="mt-auto flex flex-col gap-y-1">
          <button className="w-full py-2 px-4 rounded-lg bg-primary-container text-on-primary-container font-label-sm hover:opacity-90 transition-opacity mb-3">
            Upgrade to Pro
          </button>

          {/* ── Theme Toggle ── */}
          <ThemeToggle />

          <Link
            href="#"
            className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-3 py-2 font-sans text-sm font-semibold hover:translate-x-1 transition-transform duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            Help Center
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-3 py-2 font-sans text-sm font-semibold hover:translate-x-1 transition-transform duration-200 w-full text-left"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </nav>

      {/* TopNavBar (MOBILE ONLY) */}
      <nav className="md:hidden flex justify-between items-center w-full px-6 py-3 fixed top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none font-sans text-sm font-medium tracking-tight">
        <div className="text-xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400">
          SkillBridge
        </div>
        <div className="flex items-center gap-3">
          {/* Compact icon-only toggle for mobile */}
          <ThemeToggle compact />
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 cursor-pointer">menu</span>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <footer className="mt-auto bg-white dark:bg-slate-900 w-full border-t border-slate-200 dark:border-slate-800 py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-slate-900 dark:text-white text-sm">SkillBridge</div>
          <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
            © 2024 SkillBridge SaaS. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a className="text-xs font-normal text-slate-500 hover:text-indigo-500 hover:underline transition-opacity duration-150" href="#">Privacy Policy</a>
            <a className="text-xs font-normal text-slate-500 hover:text-indigo-500 hover:underline transition-opacity duration-150" href="#">Terms of Service</a>
            <a className="text-xs font-normal text-slate-500 hover:text-indigo-500 hover:underline transition-opacity duration-150" href="#">Contact</a>
            <a className="text-xs font-normal text-slate-500 hover:text-indigo-500 hover:underline transition-opacity duration-150" href="#">API Docs</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
