const stats = [
  {
    title: 'Total Revenue',
    value: '$24,500',
    note: '12% from last month',
    icon: 'payments',
    iconWrap: 'bg-primary-container/20 text-primary',
    noteIcon: 'arrow_upward',
    noteTone: 'text-secondary',
  },
  {
    title: 'Total Students',
    value: '1,842',
    note: '5% from last month',
    icon: 'groups',
    iconWrap: 'bg-secondary-container/20 text-secondary',
    noteIcon: 'arrow_upward',
    noteTone: 'text-secondary',
  },
  {
    title: 'Course Rating',
    value: '4.8',
    note: 'Across 5 courses',
    icon: 'star',
    iconWrap: 'bg-tertiary-container/20 text-tertiary-container',
    noteIcon: '',
    noteTone: 'text-on-surface-variant',
  },
  {
    title: 'Enrollment Trend',
    value: '+240',
    note: 'New enrollments this week',
    icon: 'trending_up',
    iconWrap: 'bg-surface-container-highest text-on-surface',
    noteIcon: '',
    noteTone: 'text-on-surface-variant',
  },
];

const recentCourses = [
  {
    title: 'Advanced React Patterns',
    status: 'Published',
    statusTone: 'bg-primary-container text-on-primary-container',
    students: '842 Students',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5lyPab1bJGQixla6zcSN0dk-mbTmto0bhQ-5yj9kbRSTQkoZ_EY4tHME-aQNOcEUXr_zM-IgjaCw__lBrx9ZlYeDmsV79C_534VDFA6VWyqoiV9w4aJ86MmJNVO4ZOu9hzaVW9K4YhIPCprfqvu49NzyFzYif_ApW478_S5lGs2poN-zUt9jOqVt_wIGQfnMp47dQ_pSMTxI1cbdzOb_UscU7ncglTzsHtSvITCs9z8tt-D9SHOL8mb_9zTARP_qE1JEF-I9MFA9d',
  },
  {
    title: 'Fullstack TypeScript',
    status: 'Draft',
    statusTone: 'bg-surface-container-highest text-on-surface',
    students: '0 Students',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCx8ghOPvmYRVMD1p5ZDtiM8H0xQ99keMPQmLJWGgMKKzHcYhQkMKzGpHwxujl8J8YNxRQVpQXS_DU38SoTInPamJZOamfP8qaRm75JMPt7ndGdn9nWfG_TxmdKfSY-FfJo5RrmMVvVFtrm7lTwND4gKbdiLUQL4Is8l02j9E-QAVYUGFALUi-yB43nL68O2iYjJEggtQQ6TqdMnokNpTP6hmuRaaNy6XN1sfQrXnyoy9hH0pFKm1Rb3_aJyGI-RQ9iqWjl7shkiRPi',
  },
  {
    title: 'Data Science Foundations',
    status: 'Published',
    statusTone: 'bg-primary-container text-on-primary-container',
    students: '512 Students',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbg4L3KEfV5M4uQQi-_DOteZpDzjIGbcD46IGSvPu_kT8gvk6ewuXvzr-ckpTJeR6NLjGqnihyGg0zxMa0HZWX92QVw2FAJZUJc8GcFtHahW8tWkMqf0RvGxKSAKGx6LZy1fBZv-mKD4YvBw3r00hwt1GridfmfJU1Pyji0Ht8s4-Ll5rUdMh6KMhVbkgq6VV6l3D6yzEEXjWAnLdBN_M0vlO29yNvp1FFCvSqrJMULJ7bBv1lmUDWv6VU4WOkeAEeukqqN0XLvphc',
  },
];

const bars = [30, 45, 60, 50, 75, 65, 90];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export default function InstructorDashboardPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex">
      <nav className="bg-surface-container-low h-screen w-64 fixed left-0 top-0 flex-col py-lg border-r border-outline-variant z-40 hidden md:flex">
        <div className="px-md mb-lg">
          <div className="font-h4 text-h4 font-bold text-primary px-md mb-xl">EduFlow</div>
          <div className="flex items-center gap-md px-md mb-xl">
            <img
              alt="Instructor portrait"
              className="w-12 h-12 rounded-full border-2 border-surface-container-highest object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnzcHTKygqT5dcYgVMl_-cUfPs2nXDRU4v1mHI3WPuF5EvqoGsaM_Z56xk851JhAT-B2RrR4ovTma4Ts4Kv6kaBcZpY6GnWZ-2M2J0qzgH_tHKT6_hKVtEn4jTglvsz4M-7TWrNIDqgnYb-OBGJuwWW2Wgztz3Q-fh4VwQsJanch5V7guXsOyhGGnlocLv6wlw3u2cayElFZAWm727j65zN7w6MEcDV_FF_VUDGNgOfjx1AYB83YBO4F5y3AshqVFMcVJ7c7oPJ_wQ"
            />
            <div>
              <h3 className="font-label-md text-label-md text-on-surface">Welcome back, Alex</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Instructor Account</p>
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-md text-label-md py-sm px-md rounded-lg flex items-center justify-center gap-sm hover:opacity-90 transition-opacity active:scale-[0.98] duration-200"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create New Course
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-xs">
          <ul className="space-y-xs font-label-md text-label-md">
            <li>
              <a
                className="flex items-center gap-md bg-primary-container text-on-primary-container rounded-lg p-md mx-sm active:scale-[0.98] duration-200"
                href="/instructor-dashboard"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  dashboard
                </span>
                Dashboard
              </a>
            </li>
            <li>
              <a className="flex items-center gap-md text-on-surface-variant p-md mx-sm hover:bg-surface-container-high transition-all rounded-lg active:scale-[0.98] duration-200" href="#">
                <span className="material-symbols-outlined">school</span>
                My Courses
              </a>
            </li>
            <li>
              <a className="flex items-center gap-md text-on-surface-variant p-md mx-sm hover:bg-surface-container-high transition-all rounded-lg active:scale-[0.98] duration-200" href="#">
                <span className="material-symbols-outlined">assignment</span>
                Assignments
              </a>
            </li>
            <li>
              <a className="flex items-center gap-md text-on-surface-variant p-md mx-sm hover:bg-surface-container-high transition-all rounded-lg active:scale-[0.98] duration-200" href="/messages">
                <span className="material-symbols-outlined">mail</span>
                Messages
              </a>
            </li>
            <li>
              <a className="flex items-center gap-md text-on-surface-variant p-md mx-sm hover:bg-surface-container-high transition-all rounded-lg active:scale-[0.98] duration-200" href="/profile">
                <span className="material-symbols-outlined">settings</span>
                Settings
              </a>
            </li>
          </ul>
        </div>

        <div className="px-xs mt-auto pt-lg">
          <ul className="space-y-xs font-label-md text-label-md">
            <li>
              <a className="flex items-center gap-md text-on-surface-variant p-md mx-sm hover:bg-surface-container-high transition-all rounded-lg active:scale-[0.98] duration-200" href="#">
                <span className="material-symbols-outlined">help</span>
                Help Center
              </a>
            </li>
            <li>
              <a className="flex items-center gap-md text-on-surface-variant p-md mx-sm hover:bg-surface-container-high transition-all rounded-lg active:scale-[0.98] duration-200" href="/login">
                <span className="material-symbols-outlined">logout</span>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-1 md:ml-64 p-lg md:p-xl min-h-screen">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md mb-xl">
          <div>
            <h1 className="font-h2 text-h2 text-on-background">Instructor Dashboard</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              Here&apos;s an overview of your teaching business.
            </p>
          </div>
          <button
            type="button"
            className="bg-gradient-to-r from-primary-container to-primary text-on-primary h-12 px-lg rounded-lg font-label-md text-label-md flex items-center gap-sm shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Create New Course
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),0_2px_4px_-2px_rgb(0_0_0_/_0.05)] flex flex-col justify-between h-32"
            >
              <div className="flex justify-between items-start">
                <span className="font-label-md text-label-md text-on-surface-variant">{stat.title}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.iconWrap}`}>
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={stat.icon === 'star' ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {stat.icon}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-h2 text-h2 text-on-background">{stat.value}</h4>
                <p className={`font-label-sm text-label-sm mt-xs flex items-center gap-xs ${stat.noteTone}`}>
                  {stat.noteIcon ? <span className="material-symbols-outlined text-[14px]">{stat.noteIcon}</span> : null}
                  {stat.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),0_2px_4px_-2px_rgb(0_0_0_/_0.05)]">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-h3 text-h3 text-on-background">Monthly Student Growth</h3>
              <button
                type="button"
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary flex items-center gap-xs border border-outline-variant rounded-full px-sm py-xs"
              >
                This Year <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
            </div>

            <div className="h-64 flex items-end justify-between gap-sm pt-md pb-xs border-b border-outline-variant relative">
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between font-label-sm text-label-sm text-outline-variant pb-6">
                <span>500</span>
                <span>250</span>
                <span>0</span>
              </div>
              <div className="w-full pl-8 flex justify-between items-end h-full">
                {bars.map((height, index) => (
                  <div
                    key={months[index]}
                    className={`w-[8%] rounded-t-sm transition-colors cursor-pointer relative ${
                      index === bars.length - 1
                        ? 'bg-gradient-to-r from-primary-container to-primary shadow-sm'
                        : 'bg-primary-fixed hover:bg-primary'
                    }`}
                    style={{ height: `${height}%` }}
                  >
                    {index === 0 ? (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                        150
                      </div>
                    ) : null}
                    {index === bars.length - 1 ? (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between pl-8 pt-sm font-label-sm text-label-sm text-outline-variant">
              {months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),0_2px_4px_-2px_rgb(0_0_0_/_0.05)] flex flex-col h-full">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-h4 text-h4 text-on-background">Recent Courses</h3>
              <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">
                View All
              </a>
            </div>
            <div className="flex-1 overflow-y-auto pr-xs">
              <ul className="space-y-md">
                {recentCourses.map((course) => (
                  <li
                    key={course.title}
                    className="flex items-center gap-md p-sm rounded-lg hover:bg-surface-container-low transition-colors group"
                  >
                    <img
                      alt={course.title}
                      className="w-16 h-12 object-cover rounded-md border border-outline-variant"
                      src={course.image}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-label-md text-label-md text-on-background truncate">{course.title}</h4>
                      <div className="flex items-center gap-sm mt-xs">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${course.statusTone}`}
                        >
                          {course.status}
                        </span>
                        <span className="font-body-sm text-[12px] text-on-surface-variant">{course.students}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-outline-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100 p-xs"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
