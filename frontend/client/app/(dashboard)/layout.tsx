'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

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
    { name: 'Skill Swap', icon: 'swap_horiz', href: '#' },
    { name: 'Team Finder', icon: 'group_add', href: '#' },
    { name: 'Projects', icon: 'assignment', href: '#' },
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

        <div className="mt-auto flex flex-col gap-y-2">
          <button className="w-full py-2 px-4 rounded-lg bg-primary-container text-on-primary-container font-label-sm hover:opacity-90 transition-opacity mb-4">
            Upgrade to Pro
          </button>
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

      {/* TopNavBar (MOBILE ONLY - Replaces SideNav) */}
      <nav className="md:hidden flex justify-between items-center w-full px-6 py-3 fixed top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none font-sans text-sm font-medium tracking-tight">
        <div className="text-xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400">
          SkillBridge
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-slate-600 cursor-pointer">menu</span>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
