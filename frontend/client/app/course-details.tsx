import Link from 'next/link';

const learningPoints = [
  'Implement advanced custom hooks for complex state management',
  'Optimize re-renders using useMemo, useCallback, and React.memo',
  'Build scalable architectures for enterprise applications',
  'Master the Context API for global state without Redux',
];

const includes = [
  '18.5 hours on-demand video',
  '14 articles',
  '10 coding exercises',
  'Full lifetime access',
  'Access on mobile and TV',
  'Certificate of completion',
];

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen bg-[#edf1f8] text-[#192033]">
      <header className="sticky top-0 z-50 border-b border-[#cfd5e4] bg-[#f7f8fc]/95 backdrop-blur">
        <nav className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link className="text-[35px] font-bold leading-none text-primary" href="/">
              EduFlow
            </Link>
            <div className="hidden items-center gap-7 md:flex">
              <Link className="border-b-2 border-primary pb-0.5 text-[14px] font-semibold text-primary" href="/marketplace">
                Marketplace
              </Link>
              <a className="text-[14px] font-medium text-[#5a6072] hover:text-primary" href="#">
                Success Stories
              </a>
              <a className="text-[14px] font-medium text-[#5a6072] hover:text-primary" href="#">
                Enterprise
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              className="inline-flex h-9 items-center rounded-md border border-[#c7cddd] bg-white px-4 text-[13px] font-semibold text-primary transition-colors hover:bg-[#eef1f8]"
              href="/login"
            >
              Log In
            </Link>
            <Link
              className="inline-flex h-9 items-center rounded-md bg-gradient-to-r from-[#4f46e5] to-[#4338ca] px-4 text-[13px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              href="/register"
            >
              Get Started
            </Link>
            <img
              alt="User profile"
              className="h-10 w-10 rounded-full border border-[#c7cddd] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgQfQRUD1h3I3K6qFlDOb-3NbrWbc5tXmRwr3k8ufnss220cv7yzcKWJwECOW8kXuHLFmN7Dy7d3QgNHgr4tudb-_9bTIuL9W2I1iQ9yOljEM5A0AjTQYGWd9Kq12GbLTU_paDZZSx0Ch525P-K_q4_QY9ohtNOeyMfwJhZLUBKsforThJbXwQhqCdJfrJrBYvhJHT3VaXJewYs2bnStDspmpM4dAkEvsEazBQVcaBB_teBIB3KBQzoKZZBfW_QtbLZTlbAhrGAgMs"
            />
          </div>
        </nav>
      </header>

      <section className="bg-[#263246] text-white">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-2 text-[13px] text-white/70">
            <a className="hover:text-white" href="#">
              Development
            </a>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <a className="hover:text-white" href="#">
              Web Development
            </a>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-white">React</span>
          </div>

          <h1 className="max-w-[840px] text-[56px] font-bold leading-[1.08] tracking-[-0.02em]">
            Advanced React Patterns &amp; Performance Optimization
          </h1>

          <p className="mt-4 max-w-[960px] text-[18px] leading-[1.65] text-white/82">
            Master enterprise-level React applications. Learn advanced state management, render optimization, and
            architectural patterns used by top tech companies.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4 text-[14px]">
            <div className="flex items-center gap-0.5 text-[#ffbf3f]">
              <span className="material-symbols-outlined text-[18px]">star</span>
              <span className="material-symbols-outlined text-[18px]">star</span>
              <span className="material-symbols-outlined text-[18px]">star</span>
              <span className="material-symbols-outlined text-[18px]">star</span>
              <span className="material-symbols-outlined text-[18px]">star_half</span>
            </div>
            <span className="font-semibold text-[#d6ddf1]">4.8 (2,451 ratings)</span>
            <span className="text-[#c6cfe8]">15,302 students</span>
          </div>

          <p className="mt-5 text-[14px] text-[#c6cfe8]">
            Created by <a className="font-semibold text-[#d6ddf1] hover:underline" href="#instructor">Sarah Jenkins</a>
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="overflow-hidden rounded-xl border border-[#ccd2e0] bg-white shadow-[0_10px_24px_rgba(18,26,43,0.1)]">
            <div className="relative h-[440px]">
              <img
                alt="Course preview"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpTrHeeB3bL25W3tpUy_lkcSduIgHk18PPOk3ZTuZWoPHo7epb__Tp-OxLFYW1jpuEvt1MkZQDHongBtl9lPDiEYdmWmrftz4AU8PY32xWlUu3MP5TmEwTC2uIp5Ib-HPx4xdGcBa2q4yR5wbjSb8qy22zO1-2gPFYkNnhLS4wRYxKAm8a1nFx_nXsCR_REA4GmO6ovNgu4XXUNfSUVmis-kCW-7y2r_GbluuasKHwNMkh00150K7htVfOHShEt2fFmZfEdD_Mc3Ua"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-[0_10px_24px_rgba(20,31,58,0.3)]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[34px]">play_arrow</span>
                </button>
              </div>
              <div className="absolute bottom-3 left-3 rounded bg-black/55 px-2 py-1 text-[12px] font-semibold text-white">
                Preview Course
              </div>
            </div>
          </div>

          <aside className="h-fit overflow-hidden rounded-xl border border-[#ccd2e0] bg-white shadow-[0_10px_24px_rgba(18,26,43,0.1)]">
            <div className="border-b border-[#e1e5ef] p-4">
              <div className="mb-4 flex items-end gap-2">
                <span className="text-[50px] font-bold leading-none text-[#192033]">$89.99</span>
                <span className="pb-1 text-[27px] text-[#9ca4b8] line-through">$129.99</span>
              </div>
              <button className="mb-2 h-11 w-full rounded bg-gradient-to-r from-[#4f46e5] to-[#4338ca] text-[15px] font-semibold text-white" type="button">
                Enroll Now
              </button>
              <button className="h-11 w-full rounded border border-[#cfd5e4] bg-white text-[15px] font-semibold text-primary" type="button">
                Add to Cart
              </button>
              <p className="mt-3 text-center text-[13px] text-[#6a738c]">30-Day Money-Back Guarantee</p>
            </div>

            <div className="p-4">
              <h3 className="mb-3 text-[15px] font-semibold text-[#192033]">This course includes:</h3>
              <ul className="space-y-2 text-[13px] text-[#4f5870]">
                {includes.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#636f8c]">check_box_outline_blank</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="mt-4 rounded-xl border border-[#ccd2e0] bg-white p-6 shadow-[0_10px_24px_rgba(18,26,43,0.06)]">
          <h2 className="mb-4 text-[40px] font-semibold text-[#1a2132]">What you&apos;ll learn</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {learningPoints.map((point) => (
              <div key={point} className="flex items-start gap-2 text-[16px] leading-[1.55] text-[#47516a]">
                <span className="material-symbols-outlined mt-0.5 text-[20px] text-primary">check</span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-[40px] font-semibold text-[#1a2132]">Course Description</h2>
          <div className="mt-4 space-y-4 text-[16px] leading-[1.7] text-[#4b556e]">
            <p>
              Are you comfortable with basic React but feel overwhelmed when building large-scale applications? This
              course bridges the gap between knowing React and engineering scalable React architecture.
            </p>
            <p>
              We&apos;ll dive deep into performance bottlenecks, profiling tools, and structural patterns that
              professional teams use to maintain codebases with thousands of components.
            </p>
          </div>
          <a className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-primary hover:underline" href="#">
            Read more
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </a>
        </section>

        <section className="mt-8">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="text-[40px] font-semibold text-[#1a2132]">Course Curriculum</h2>
            <button className="text-[14px] font-semibold text-primary hover:underline" type="button">
              Expand all
            </button>
          </div>
          <p className="mb-3 text-[13px] text-[#667089]">12 sections • 145 lectures • 18h 20m total length</p>

          <div className="overflow-hidden rounded-lg border border-[#ccd2e0] bg-white">
            <div className="border-b border-[#dde2ee]">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#606a84]">expand_more</span>
                  <h3 className="text-[17px] font-semibold text-[#1d2435]">1. Introduction &amp; Setup</h3>
                </div>
                <span className="text-[13px] text-[#69728b]">5 lectures • 45m</span>
              </div>
              <div className="space-y-2 px-4 pb-3 text-[14px] text-[#4f5870]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">play_circle</span>
                    <span>Welcome to the Course</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-primary px-2 py-0.5 text-[11px] font-semibold text-primary">
                      Preview
                    </span>
                    <span>05:20</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#78819a]">article</span>
                    <span>Environment Setup Guide</span>
                  </div>
                  <span>10:00</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#606a84]">chevron_right</span>
                <h3 className="text-[17px] font-semibold text-[#1d2435]">2. Advanced State Management</h3>
              </div>
              <span className="text-[13px] text-[#69728b]">12 lectures • 2h 15m</span>
            </div>
          </div>
        </section>

        <section className="mt-8 border-t border-[#d9dfeb] pt-8" id="instructor">
          <h2 className="mb-5 text-[40px] font-semibold text-[#1a2132]">Your Instructor</h2>
          <div className="flex flex-col gap-4 md:flex-row">
            <img
              alt="Instructor Sarah Jenkins"
              className="h-24 w-24 rounded-full border border-[#cfd5e4] object-cover shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG-TWITuk1jYdrChHSMWtEL_fqo35M-BbJbWdGfTAXfsZaHtDUbQMelYgKJjqHR3biXP4EtIXPrOLyJYlbpGGM4HPCjJUgkJZK4XnbIvgwE-fCMsQ6kPLdkg2kIU_DCSiaJGSeEK5pm3pL1MbZtJ0eAWMJWjqjEKYvDvSRiTTIqhRV1cGjqf9nf3W-UenZojgVx-UIRCpvU8tS0wnI2ks0i38JzlDhlhTLsTA1hdy5AoCKq4ZH8xPqeDoToazIyAGPfP8uez5eW5Ht"
            />
            <div>
              <h3 className="text-[30px] font-semibold text-[#1a2132]">Sarah Jenkins</h3>
              <p className="text-[14px] text-[#69728b]">Senior Frontend Engineer &amp; Educator</p>
              <div className="mt-2 flex flex-wrap gap-4 text-[13px] text-[#5f6984]">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">star</span>4.8 Rating
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">group</span>50k+ Students
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">play_circle</span>8 Courses
                </span>
              </div>
              <p className="mt-3 max-w-[920px] text-[16px] leading-[1.7] text-[#4b556e]">
                Sarah is a Senior Frontend Engineer who has worked at leading tech companies. She specializes in
                building high-performance web applications and loves breaking down complex architectural concepts into
                digestible lessons.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#dfe6f6] py-14 text-center">
        <p className="text-[31px] font-semibold text-[#171d2d]">EduFlow</p>
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-[13px] text-[#5f6881]">
          <a className="hover:text-primary hover:underline" href="#">
            Terms of Service
          </a>
          <a className="hover:text-primary hover:underline" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary hover:underline" href="#">
            Cookie Settings
          </a>
          <a className="hover:text-primary hover:underline" href="#">
            Contact Support
          </a>
        </div>
        <p className="mt-4 text-[12px] text-[#6c7692]">© 2024 EduFlow Learning Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
