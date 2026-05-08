'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const stats = [
  {
    label: 'Total Revenue',
    value: '$24,500',
    trend: '12% from last month',
    trendUp: true,
    icon: 'payments',
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/20',
    iconColor: 'text-primary',
  },
  {
    label: 'Total Students',
    value: '1,842',
    trend: '5% from last month',
    trendUp: true,
    icon: 'groups',
    iconBg: 'bg-violet-50 dark:bg-violet-900/20',
    iconColor: 'text-secondary',
  },
  {
    label: 'Course Rating',
    value: '4.8',
    trend: 'Across 5 courses',
    trendUp: false,
    icon: 'star',
    iconFill: true,
    iconBg: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-500',
  },
  {
    label: 'Enrollment Trend',
    value: '+240',
    trend: 'New enrollments this week',
    trendUp: false,
    icon: 'trending_up',
    iconBg: 'bg-slate-100 dark:bg-slate-800',
    iconColor: 'text-on-surface',
  },
];

const chartData = [
  { month: 'Jan', height: 30 },
  { month: 'Feb', height: 45 },
  { month: 'Mar', height: 60 },
  { month: 'Apr', height: 50 },
  { month: 'May', height: 75 },
  { month: 'Jun', height: 65 },
  { month: 'Jul', height: 90 },
];

const recentCourses = [
  {
    title: 'Advanced React Patterns',
    status: 'Published',
    students: 842,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5lyPab1bJGQixla6zcSN0dk-mbTmto0bhQ-5yj9kbRSTQkoZ_EY4tHME-aQNOcEUXr_zM-IgjaCw__lBrx9ZlYeDmsV79C_534VDFA6VWyqoiV9w4aJ86MmJNVO4ZOu9hzaVW9K4YhIPCprfqvu49NzyFzYif_ApW478_S5lGs2poN-zUt9jOqVt_wIGQfnMp47dQ_pSMTxI1cbdzOb_UscU7ncglTzsHtSvITCs9z8tt-D9SHOL8mb_9zTARP_qE1JEF-I9MFA9d',
  },
  {
    title: 'Fullstack TypeScript',
    status: 'Draft',
    students: 0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx8ghOPvmYRVMD1p5ZDtiM8H0xQ99keMPQmLJWGgMKKzHcYhQkMKzGpHwxujl8J8YNxRQVpQXS_DU38SoTInPamJZOamfP8qaRm75JMPt7ndGdn9nWfG_TxmdKfSY-FfJo5RrmMVvVFtrm7lTwND4gKbdiLUQL4Is8l02j9E-QAVYUGFALUi-yB43nL68O2iYjJEggtQQ6TqdMnokNpTP6hmuRaaNy6XN1sfQrXnyoy9hH0pFKm1Rb3_aJyGI-RQ9iqWjl7shkiRPi',
  },
  {
    title: 'Data Science Foundations',
    status: 'Published',
    students: 512,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbg4L3KEfV5M4uQQi-_DOteZpDzjIGbcD46IGSvPu_kT8gvk6ewuXvzr-ckpTJeR6NLjGqnihyGg0zxMa0HZWX92QVw2FAJZUJc8GcFtHahW8tWkMqf0RvGxKSAKGx6LZy1fBZv-mKD4YvBw3r00hwt1GridfmfJU1Pyji0Ht8s4-Ll5rUdMh6KMhVbkgq6VV6l3D6yzEEXjWAnLdBN_M0vlO29yNvp1FFCvSqrJMULJ7bBv1lmUDWv6VU4WOkeAEeukqqN0XLvphc',
  },
];

export default function AdminDashboardPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsAdmin(false); return; }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      setIsAdmin(profile?.role === 'admin' || user.user_metadata?.is_admin === true);
    }
    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="material-symbols-outlined text-[48px] text-primary animate-spin">progress_activity</span>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-xl">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-md text-center max-w-md">
          <span className="material-symbols-outlined text-[56px] text-error block mb-md">shield_lock</span>
          <h1 className="font-h3 text-h3 text-on-background mb-sm">Access Denied</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
            You don&apos;t have admin privileges to view this page.
          </p>
          <Link href="/dashboard" className="btn-primary h-12 px-lg">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-lg md:p-xl min-h-screen">
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md mb-xl">
        <div>
          <h1 className="font-h2 text-h2 text-on-background">Instructor Dashboard</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Here&apos;s an overview of your teaching business.
          </p>
        </div>
        <button
          className="h-12 px-lg rounded-lg font-semibold text-[14px] text-white flex items-center gap-2 shadow-sm hover:shadow-md hover:opacity-90 transition-all whitespace-nowrap"
          style={{ background: 'linear-gradient(to right, #6063ee, #4648d4)' }}
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Create New Course
        </button>
      </header>

      {/* ── Stats Grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest dark:bg-surface-container border border-outline-variant rounded-xl p-md shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)] flex flex-col justify-between h-32 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant">{stat.label}</span>
              <div className={`w-8 h-8 rounded-full ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}>
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={stat.iconFill ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {stat.icon}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-h2 text-h2 text-on-background">{stat.value}</h4>
              <p className={`font-label-sm text-label-sm mt-xs flex items-center gap-xs ${stat.trendUp ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {stat.trendUp && <span className="material-symbols-outlined text-[14px]">arrow_upward</span>}
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bento Grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-surface-container border border-outline-variant rounded-xl p-lg shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-h3 text-h3 text-on-background">Monthly Student Growth</h3>
            <button className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary flex items-center gap-xs border border-outline-variant rounded-full px-sm py-xs transition-colors">
              This Year <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
          </div>

          <div className="h-64 flex items-end justify-between gap-sm pt-md pb-xs border-b border-outline-variant relative">
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between font-label-sm text-label-sm text-outline-variant pb-6">
              <span>500</span><span>250</span><span>0</span>
            </div>
            <div className="w-full pl-8 flex justify-between items-end h-full">
              {chartData.map((bar, i) => {
                const isLast = i === chartData.length - 1;
                return (
                  <div
                    key={bar.month}
                    className={`w-[8%] rounded-t-sm cursor-pointer group relative transition-colors ${
                      isLast ? 'shadow-sm' : 'bg-primary-fixed hover:bg-primary'
                    }`}
                    style={{
                      height: `${bar.height}%`,
                      ...(isLast ? { background: 'linear-gradient(to top, #4648d4, #6063ee)' } : {}),
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {Math.round(bar.height * 5)}
                    </div>
                    {isLast && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between pl-8 pt-sm font-label-sm text-label-sm text-outline-variant">
            {chartData.map((bar) => <span key={bar.month}>{bar.month}</span>)}
          </div>
        </div>

        {/* Recent Courses */}
        <div className="bg-surface-container-lowest dark:bg-surface-container border border-outline-variant rounded-xl p-lg shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)] flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-md">
            <h3 className="font-h4 text-h4 text-on-background">Recent Courses</h3>
            <Link className="font-label-sm text-label-sm text-primary hover:underline" href="#">View All</Link>
          </div>

          <ul className="space-y-md flex-1">
            {recentCourses.map((course) => (
              <li
                key={course.title}
                className="flex items-center gap-md p-sm rounded-lg hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors group"
              >
                <img
                  alt={course.title}
                  className="w-16 h-12 object-cover rounded-md border border-outline-variant flex-shrink-0"
                  src={course.image}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-label-md text-label-md text-on-background truncate">{course.title}</h4>
                  <div className="flex items-center gap-sm mt-xs">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      course.status === 'Published'
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container-highest text-on-surface'
                    }`}>
                      {course.status}
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">{course.students} Students</span>
                  </div>
                </div>
                <button className="text-outline-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100 p-xs flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
