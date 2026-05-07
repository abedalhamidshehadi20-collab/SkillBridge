import Link from 'next/link';
import NavAuth from '@/app/components/NavAuth';

const categories = [
  { name: 'Development', count: '120+ Courses', icon: 'terminal' },
  { name: 'Design', count: '85+ Courses', icon: 'brush' },
  { name: 'Business', count: '200+ Courses', icon: 'storefront' },
  { name: 'Marketing', count: '95+ Courses', icon: 'campaign' },
];

const courses = [
  {
    title: 'Full-Stack Engineering Boot-camp',
    description: 'Master React, Node.js, and Postgres in this comprehensive 12-week immersive program.',
    price: '$149',
    duration: '120 Hours',
    category: 'Development',
    rating: '4.8',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBY_p8T5fabqsBmJ2aP-4XAB60NIhrr6F1UDNZZJINPJAehfmULKsuKKqURMTDqHei-33lEw9nTPs1wDxjrVA28JOK2r6lybZ6hDB3xAaL82NT-F5p9jr-hTEZ25-H5uWUePRDykeYVjagReXHVhJejF5tbDFU81ha7NL_eRKnURSlqawuqBu_Pksm5eI2B9pUWrq_hmM4hMFz1poKxqAAlIoZvGkOZidBqoYld6u5Fj_XqEH528kiF5V9uHUVbD7SovEohGS7riY3A',
  },
  {
    title: 'UX/UI Principles & Practices',
    description: 'Learn to design intuitive interfaces that user love, focusing on psychology and accessibility.',
    price: '$89',
    duration: '45 Hours',
    category: 'Design',
    rating: '4.9',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdmi6OQdL-TYCx0BzXo-YRfLOip59uFZb2s-3vtebK2kAUgVrc2dPHxhYXa1b9CXnrPUpKc8zW6tGxi4siEjDwmgFGGcHJOYaQUHmSQV1-xnMAuMXfzpUiKff21TtoxiAPlLrb--70f0Gvr5xM1WrKfwUwL69MD1doJzWXahmAxu03u-xp-Saeg5AO5hAJfba4ose5plcIHDgAphAfxj64R0LKEarWFbCZq_N2jKl3apSXr5HCPZH5L3H0myjUaCk0Y9Lz_xVybp4A',
  },
  {
    title: 'Agile Product Management',
    description: 'Lead teams to success by mastering agile methodologies, sprint planning, and backlog grooming.',
    price: '$119',
    duration: '30 Hours',
    category: 'Business',
    rating: '4.7',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRnz3ziulX8fVeydKRtiQc-KRUcen7mjsR61ZiweyBkqiJyVhfyR1XDzIRcHuBPrn--1Snn_3oF6r3nhbn1nLoSRGJAwtQSN54n_0V-QwdIswiVPelz-Iqgz-VZ9tHZyZm2E-6wMKMtVf1ZdcXJNHsKIhvM3P28BSQnFP-R5h5nc-sOy6LVeAqKmAelbAktHr0ue_W0FJCc6JOCeyaIJorONeCdWxTxRSggYs8ofmCksonlUTVLMzPNn9eVbat2mlLUzzyPYq9y88I',
  },
  {
    title: 'Advanced Data Analytics',
    description: 'Leverage data to drive marketing decisions. Covers SQL, Python basics, and Tableau.',
    price: '$199',
    duration: '60 Hours',
    category: 'Marketing',
    rating: '4.9',
    image: '',
  },
];

const testimonials = [
  {
    quote:
      '"EduFlow completely changed my career trajectory. The UI/UX course was rigorous, practical, and directly applicable. Within three months of completing the program, I landed a Senior Designer role at a top SaaS company."',
    name: 'Sarah Jenkins',
    role: 'Senior Product Designer',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZjcnaKovXaKEsfZEXuOlfhq2dVU1-aogAsuGmbfXwTeArK4qm-HFh7phmPXY0613RnFJGUgioSG2OmuIBdDEDurqUMYI9zbmMDrfhK0xW4Lw4SvQeiMknlPmnI8aF5ubrYbjCvq4L5mJOIj9liYFF-2zoy882icEYCvf2OsipvZRySeW2F5AZfLkjcbtsf2o5Lu4I9hz4dVaSAptaq89fXalz9vPAlUGwXXE98b_T6Bl39Prxm7MLC8N4Ge_8PBrVgr9FLCjAITf',
  },
  {
    quote:
      '"The Full-Stack Bootcamp provided the structured learning environment I needed. The distraction-free interface and high-quality video content made grasping complex backend concepts much easier than self-teaching."',
    name: 'Michael Torres',
    role: 'Software Engineer',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCs7OxaELFpVq6jMX3KZaw1G26RB2H9S7S9NjtSON5C_z3JUqyQ8Opffgv3c7on90QCcNiX_CYumbBIGSxmE_C2KHscKdYehSW1IKSoCHZqHKmL5fef1Gte3h8166ONZfdPoXTEd65yHisHBM6PQbiQJRXbeMpSFU-XBQ84yqP38vBe-L5ZZ4LepyhmA9_J5UIXO1wXKwq15eLfv_tjB6SO7w7mZM8hhdSBnihgJqzEqWe0w-qj8UzttdwoEsr-zWSzB8Q_atP2F-Ef',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f6fb] text-[#161b2a]">
      <header className="sticky top-0 z-50 border-b border-[#d4d9e6] bg-[#f7f8fc]/95 backdrop-blur">
        <nav className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link className="text-[35px] font-bold leading-none text-primary" href="/">
              EduFlow
            </Link>
            <div className="hidden items-center gap-7 md:flex">
              <Link className="text-[14px] font-medium text-[#272b39] hover:text-primary" href="/marketplace">
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
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#767b8d]">
                search
              </span>
              <input
                className="h-9 w-[200px] rounded-lg border border-[#c7cddd] bg-[#f7f8fc] pl-9 pr-3 text-[13px] text-[#2f3341] outline-none placeholder:text-[#8f94a3] focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Search courses..."
                type="text"
              />
            </div>
            <NavAuth />
          </div>
        </nav>
      </header>

      <section className="bg-[#e9edf7]">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-1 rounded-full bg-[#dde3f6] px-3 py-1 text-[12px] font-semibold text-primary">
              <span className="material-symbols-outlined text-[14px]">stars</span>
              Trusted by 10,000+ professionals
            </div>
            <h1 className="mb-5 text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-[#141a29]">
              Master Any Skill with <span className="text-primary">EduFlow</span>
            </h1>
            <p className="mb-8 max-w-[620px] text-[21px] leading-[1.65] text-[#596075]">
              Accelerate your career with expertly crafted courses. Join a community of learners dedicated to
              professional growth in a premium, distraction-free environment.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="btn-primary h-12 px-7 text-[15px]" href="/register">
                Get Started
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <button className="btn-ghost h-12 px-7 text-[15px]" type="button">
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                Watch Demo
              </button>
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-[520px] grid-cols-2 grid-rows-2 gap-3">
            <div className="relative row-span-2 overflow-hidden rounded-xl border border-[#cad0df] shadow-[0_18px_35px_rgba(24,33,56,0.16)]">
              <img
                alt="Featured class"
                className="absolute inset-0 h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuABcZeSPymvR92iDriIVjUuULiKrGL8FVC6vWUqABuTMMmANQuSVCDzZW_khfvGGZfqmZM0kJI0jP3U30KTHDNIrP1NoHaqujssbyEESROoTASuNXNGj-bJzhaESUKk-buoHTvD9MHbKu51bJXmp0ZzLyJygeqfFqekYApMZewkYTMrJeBjJ7ku2SXWQtk4jKabTy_BRUzehu071ypDVhpEdwRhvblQrDmj0es57LnaVinF8H-0wdAvfoM4EjrPJE5SMQu5RwGu4rHj"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                <span className="mb-1 inline-block rounded bg-primary px-2 py-[2px] text-[11px] font-semibold text-white">
                  Featured
                </span>
                <p className="text-[26px] font-semibold text-white">Advanced UI/UX</p>
              </div>
            </div>

            <div className="rounded-xl border border-[#cad0df] bg-[#dfe6f6] p-4 shadow-sm">
              <div className="mb-8 flex items-center justify-between">
                <span className="material-symbols-outlined rounded-full bg-primary p-1.5 text-[18px] text-white">
                  code
                </span>
                <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#46506a]">
                  <span className="material-symbols-outlined text-[14px] text-[#ff8d2b]">star</span>4.9
                </span>
              </div>
              <p className="text-[17px] font-semibold text-[#1f2535]">Web Development</p>
              <p className="text-[14px] text-[#606985]">Master modern frameworks</p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-[#5750ea] to-[#4338ca] p-5 text-center text-white shadow-[0_18px_35px_rgba(67,56,202,0.35)]">
              <p className="mt-3 text-[48px] font-bold leading-none">85%</p>
              <p className="mt-2 text-[14px] leading-5 text-white/90">Completion Rate on Premium Courses</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f6fb] py-14">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-[42px] font-bold tracking-[-0.02em] text-[#171d2d]">Explore Categories</h2>
              <p className="mt-1 text-[18px] text-[#5e677f]">Find the perfect path for your career advancement.</p>
            </div>
            <a className="inline-flex items-center gap-1 text-[14px] font-semibold text-primary hover:underline" href="#">
              View All Categories
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <a
                key={category.name}
                className="rounded-xl border border-[#cdd2df] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                href="#"
              >
                <span className="material-symbols-outlined mb-4 inline-flex rounded-lg bg-[#e8ecf8] p-2 text-primary">
                  {category.icon}
                </span>
                <h3 className="text-[31px] font-semibold text-[#171d2d]">{category.name}</h3>
                <p className="text-[16px] text-[#616a83]">{category.count}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e9edf7] py-14">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-[42px] font-bold tracking-[-0.02em] text-[#171d2d]">Top Rated Courses</h2>
          <p className="mt-1 text-[18px] text-[#5e677f]">Hand-picked by industry experts.</p>

          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
            {courses.map((course) => (
              <Link
                key={course.title}
                className="min-w-[320px] max-w-[320px] snap-start overflow-hidden rounded-xl border border-[#cad0df] bg-white shadow-[0_12px_24px_rgba(20,30,55,0.08)]"
                href="/course-details"
              >
                <div className="relative h-[180px] bg-[#dde4f5]">
                  {course.image ? (
                    <img alt={course.title} className="h-full w-full object-cover" src={course.image} />
                  ) : (
                    <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[62px] text-[#8f96ab]">
                      imagesmode
                    </span>
                  )}
                  <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-[2px] text-[11px] font-semibold text-[#232a3b]">
                    {course.category}
                  </div>
                  <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-[2px] text-[11px] font-semibold text-primary">
                    <span className="material-symbols-outlined text-[13px]">star</span>
                    {course.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-[30px] font-semibold leading-tight text-[#171d2d]">{course.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-[#616a83]">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#e3e6f0] pt-3">
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#636d89]">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {course.duration}
                    </span>
                    <span className="text-[28px] font-bold text-[#171d2d]">{course.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f6fb] py-16">
        <div className="mx-auto w-full max-w-[1280px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[46px] font-bold tracking-[-0.02em] text-[#171d2d]">Your Path to Success</h2>
          <p className="mx-auto mt-2 max-w-[860px] text-[18px] text-[#5e677f]">
            A streamlined process designed to take you from beginner to expert in minimal time.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: 'search', title: 'Choose Your Path', desc: 'Browse our curated catalog and select the skills that align with your career goals.' },
              { icon: 'menu_book', title: 'Learn & Practice', desc: 'Engage with high-quality video content and complete hands-on assignments.' },
              { icon: 'emoji_events', title: 'Succeed & Advance', desc: 'Earn your certificate and apply your new skills to advance your career.' },
            ].map((item, index) => (
              <div key={item.title} className="mx-auto max-w-[360px]">
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#cad0df] bg-white shadow-md">
                  <span className="material-symbols-outlined text-[28px] text-primary">{item.icon}</span>
                  <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-[36px] font-semibold text-[#171d2d]">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-[#616a83]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#dfe6f6] py-16">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-9 text-center">
            <h2 className="text-[46px] font-bold tracking-[-0.02em] text-[#171d2d]">Hear from Our Alumni</h2>
            <p className="mt-2 text-[18px] text-[#5e677f]">Real stories of career transformation.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-xl border border-[#ccd3e3] bg-white p-6 shadow-[0_10px_24px_rgba(18,26,43,0.08)]">
                <div className="mb-4 flex gap-1 text-primary">
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="material-symbols-outlined text-[18px]">star</span>
                </div>
                <p className="text-[18px] italic leading-8 text-[#2c3345]">{item.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <img alt={item.name} className="h-11 w-11 rounded-full object-cover" src={item.avatar} />
                  <div>
                    <p className="text-[14px] font-semibold text-[#1c2334]">{item.name}</p>
                    <p className="text-[12px] text-[#66708c]">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
