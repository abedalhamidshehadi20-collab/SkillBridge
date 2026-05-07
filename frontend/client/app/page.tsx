import type { CSSProperties } from "react";

const homeTheme = {
  "--color-on-error-container": "#93000a",
  "--color-on-tertiary-container": "#fffbff",
  "--color-outline": "#767586",
  "--color-surface-container-lowest": "#ffffff",
  "--color-tertiary-fixed": "#ffdcc5",
  "--color-on-tertiary": "#ffffff",
  "--color-inverse-surface": "#27313f",
  "--color-primary-container": "#6063ee",
  "--color-on-error": "#ffffff",
  "--color-on-primary": "#ffffff",
  "--color-on-secondary-fixed": "#0f0069",
  "--color-primary-fixed-dim": "#c0c1ff",
  "--color-surface-dim": "#d0dbed",
  "--color-inverse-primary": "#c0c1ff",
  "--color-on-secondary": "#ffffff",
  "--color-primary": "#4648d4",
  "--color-error": "#ba1a1a",
  "--color-inverse-on-surface": "#eaf1ff",
  "--color-primary-fixed": "#e1e0ff",
  "--color-surface-container-high": "#dee9fc",
  "--color-on-background": "#121c2a",
  "--color-on-surface": "#121c2a",
  "--color-on-primary-container": "#fffbff",
  "--color-surface-container-low": "#eff4ff",
  "--color-secondary-fixed": "#e2dfff",
  "--color-background": "#f8f9ff",
  "--color-on-primary-fixed": "#07006c",
  "--color-on-secondary-fixed-variant": "#3323cc",
  "--color-outline-variant": "#c7c4d7",
  "--color-on-primary-fixed-variant": "#2f2ebe",
  "--color-on-secondary-container": "#fffbff",
  "--color-secondary-fixed-dim": "#c3c0ff",
  "--color-on-tertiary-fixed-variant": "#703700",
  "--color-surface": "#f8f9ff",
  "--color-tertiary": "#904900",
  "--color-tertiary-container": "#b55d00",
  "--color-error-container": "#ffdad6",
  "--color-surface-container": "#e6eeff",
  "--color-on-tertiary-fixed": "#301400",
  "--color-secondary": "#4b41e1",
  "--color-surface-container-highest": "#d9e3f6",
  "--color-secondary-container": "#645efb",
  "--color-surface-variant": "#d9e3f6",
  "--color-tertiary-fixed-dim": "#ffb783",
  "--color-surface-tint": "#494bd6",
  "--color-surface-bright": "#f8f9ff",
  "--color-on-surface-variant": "#464554",
  "--spacing-lg": "24px",
  "--spacing-base": "8px",
  "--spacing-gutter": "24px",
  "--spacing-3xl": "64px",
  "--spacing-xl": "32px",
  "--spacing-container-max": "1280px",
  "--spacing-2xl": "48px",
  "--spacing-sm": "8px",
  "--spacing-xs": "4px",
  "--spacing-md": "16px",
} as CSSProperties;

const homeMarkup = `
<nav class="bg-surface dark:bg-surface-dim font-body-md text-body-md docked full-width top-0 shadow-sm bg-surface dark:bg-surface-dim flex justify-between items-center px-lg py-sm w-full sticky top-0 z-50">
<div class="flex items-center gap-xl">
<span class="font-h3 text-h3 font-bold text-primary dark:text-primary-fixed-dim">EduFlow</span>
<div class="hidden md:flex gap-lg">
<a class="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors active:scale-95 duration-150" href="/marketplace">Marketplace</a>
<a class="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors active:scale-95 duration-150" href="#">Success Stories</a>
<a class="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors active:scale-95 duration-150" href="#">Enterprise</a>
</div>
</div>
<div class="flex items-center gap-md">
<div class="relative hidden md:block">
<span class="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
<input class="pl-xl pr-sm py-sm rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-64 text-body-sm font-body-sm" placeholder="Search courses..." type="text"/>
</div>
<button class="font-label-md text-label-md text-primary bg-surface border border-outline-variant px-md py-sm rounded-lg hover:bg-surface-container-low transition-colors active:scale-95 h-10 md:h-12 flex items-center justify-center">Log In</button>
<button class="font-label-md text-label-md text-on-primary btn-gradient px-md py-sm rounded-lg hover:opacity-90 transition-opacity active:scale-95 shadow-ambient-md h-10 md:h-12 flex items-center justify-center">Get Started</button>
<img alt="User profile" class="w-10 h-10 rounded-full border border-outline-variant cursor-pointer hidden md:block object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfAy401-vku_Gf-a_Wa0OJ4mz8JuyPKfRjYuzN7QJTB0lZpUpzUWgSXpfbRm62MvzMwXkiRWKG9ILgrWooC0MuXqGMmoKfGuSppjfh5JAkE3hwI-Zh08ZMg0DjFGjVLDFh_YjUjU1O5pMz7oOvWet_-X54FnggF7YuwzZW7_2x5jZ2sapy4ZNuvZIYh6PdzSPYJw1mO94E4BaHuWWV7BWEtmAW8F-j4YlXsOkiR-g2bBfpiYUwJEFXdUnCfsTn3qjfihOEqHnIYQp5"/>
</div>
</nav>
<header class="relative w-full min-h-[819px] flex items-center justify-center overflow-hidden bg-surface-container-low pt-2xl pb-3xl">
<div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
<div class="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary-fixed opacity-50 blur-[80px]"></div>
<div class="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-secondary-fixed opacity-50 blur-[60px]"></div>
</div>
<div class="container mx-auto px-lg max-w-container-max relative z-10 grid md:grid-cols-2 gap-xl items-center">
<div class="flex flex-col gap-lg z-10">
<div class="inline-flex items-center gap-xs bg-surface-container-high text-primary px-sm py-xs rounded-full self-start font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">stars</span>
                    Trusted by 10,000+ professionals
                </div>
<h1 class="font-h1 text-h1 text-on-background leading-tight">Master Any Skill with <span class="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">EduFlow</span></h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-lg">Accelerate your career with expertly crafted courses. Join a community of learners dedicated to professional growth in a premium, distraction-free environment.</p>
<div class="flex gap-md mt-sm">
<button class="font-label-md text-label-md text-on-primary btn-gradient px-lg py-sm rounded-lg hover:opacity-90 transition-opacity active:scale-95 shadow-ambient-md h-12 flex items-center justify-center gap-sm">
                        Get Started
                        <span class="material-symbols-outlined">arrow_forward</span>
</button>
<button class="font-label-md text-label-md text-on-surface bg-surface border border-outline-variant px-lg py-sm rounded-lg hover:bg-surface-container-low transition-colors active:scale-95 h-12 flex items-center justify-center gap-sm">
<span class="material-symbols-outlined">play_circle</span>
                        Watch Demo
                    </button>
</div>
</div>
<div class="relative z-10 w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
<div class="grid grid-cols-2 grid-rows-2 gap-sm w-full h-full max-w-[500px] max-h-[500px]">
<div class="col-span-1 row-span-2 rounded-xl overflow-hidden shadow-ambient-lg relative">
<img alt="Students learning" class="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABcZeSPymvR92iDriIVjUuULiKrGL8FVC6vWUqABuTMMmANQuSVCDzZW_khfvGGZfqmZM0kJI0jP3U30KTHDNIrP1NoHaqujssbyEESROoTASuNXNGj-bJzhaESUKk-buoHTvD9MHbKu51bJXmp0ZzLyJygeqfFqekYApMZewkYTMrJeBjJ7ku2SXWQtk4jKabTy_BRUzehu071ypDVhpEdwRhvblQrDmj0es57LnaVinF8H-0wdAvfoM4EjrPJE5SMQu5RwGu4rHj"/>
<div class="absolute bottom-0 left-0 w-full p-md bg-gradient-to-t from-black/60 to-transparent text-white glass-card rounded-b-xl border-0 border-t border-white/20">
<span class="font-label-sm text-label-sm bg-primary px-xs py-[2px] rounded text-white mb-xs inline-block">Featured</span>
<h4 class="font-h4 text-h4 leading-tight mb-xs">Advanced UI/UX</h4>
</div>
</div>
<div class="col-span-1 row-span-1 rounded-xl bg-surface-container-high p-md flex flex-col justify-between shadow-ambient-md border border-outline-variant">
<div class="flex justify-between items-start">
<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined">code</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-[2px]">
<span class="material-symbols-outlined text-[14px] text-tertiary">star</span> 4.9
                            </span>
</div>
<div>
<p class="font-label-md text-label-md text-on-surface">Web Development</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Master modern frameworks</p>
</div>
</div>
<div class="col-span-1 row-span-1 rounded-xl bg-primary text-on-primary p-md flex flex-col justify-center items-center shadow-ambient-md relative overflow-hidden btn-gradient">
<div class="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-white opacity-10 blur-xl"></div>
<span class="font-h2 text-h2 font-bold mb-xs">85%</span>
<p class="font-body-sm text-body-sm text-center opacity-90">Completion Rate on Premium Courses</p>
</div>
</div>
</div>
</div>
</header>
<section class="py-3xl bg-surface">
<div class="container mx-auto px-lg max-w-container-max">
<div class="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
<div>
<h2 class="font-h2 text-h2 text-on-surface mb-sm">Explore Categories</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Find the perfect path for your career advancement.</p>
</div>
<a class="font-label-md text-label-md text-primary hover:text-primary-fixed-dim transition-colors flex items-center gap-xs group" href="#">
                    View All Categories <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</a>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-md">
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg hover:shadow-ambient-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col gap-md">
<div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span class="material-symbols-outlined text-[24px]">terminal</span>
</div>
<div>
<h4 class="font-h4 text-h4 text-on-surface mb-xs">Development</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">120+ Courses</p>
</div>
</div>
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg hover:shadow-ambient-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col gap-md">
<div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
<span class="material-symbols-outlined text-[24px]">brush</span>
</div>
<div>
<h4 class="font-h4 text-h4 text-on-surface mb-xs">Design</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">85+ Courses</p>
</div>
</div>
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg hover:shadow-ambient-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col gap-md">
<div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
<span class="material-symbols-outlined text-[24px]">storefront</span>
</div>
<div>
<h4 class="font-h4 text-h4 text-on-surface mb-xs">Business</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">200+ Courses</p>
</div>
</div>
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg hover:shadow-ambient-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col gap-md">
<div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-error group-hover:bg-error group-hover:text-on-error transition-colors">
<span class="material-symbols-outlined text-[24px]">campaign</span>
</div>
<div>
<h4 class="font-h4 text-h4 text-on-surface mb-xs">Marketing</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">95+ Courses</p>
</div>
</div>
</div>
</div>
</section>
<section class="py-3xl bg-surface-container-low overflow-hidden">
<div class="container mx-auto px-lg max-w-container-max">
<div class="mb-xl">
<h2 class="font-h2 text-h2 text-on-surface mb-sm">Top Rated Courses</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Hand-picked by industry experts.</p>
</div>
<div class="flex gap-gutter overflow-x-auto pb-lg snap-x snap-mandatory scrollbar-hide -mx-lg px-lg md:mx-0 md:px-0">
<div class="min-w-[300px] md:min-w-[340px] max-w-[340px] bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-ambient-md snap-start flex-shrink-0 flex flex-col group">
<div class="relative h-48 overflow-hidden">
<img alt="Coding workspace" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY_p8T5fabqsBmJ2aP-4XAB60NIhrr6F1UDNZZJINPJAehfmULKsuKKqURMTDqHei-33lEw9nTPs1wDxjrVA28JOK2r6lybZ6hDB3xAaL82NT-F5p9jr-hTEZ25-H5uWUePRDykeYVjagReXHVhJejF5tbDFU81ha7NL_eRKnURSlqawuqBu_Pksm5eI2B9pUWrq_hmM4hMFz1poKxqAAlIoZvGkOZidBqoYld6u5Fj_XqEH528kiF5V9uHUVbD7SovEohGS7riY3A"/>
<div class="absolute top-sm right-sm bg-surface/90 backdrop-blur-sm px-xs py-[2px] rounded text-primary font-label-sm text-label-sm flex items-center gap-[2px]">
<span class="material-symbols-outlined text-[14px]">star</span> 4.8
                        </div>
<div class="absolute bottom-sm left-sm bg-surface-container-highest/90 backdrop-blur-sm px-sm py-[2px] rounded-full text-on-surface font-label-sm text-label-sm">
                            Development
                        </div>
</div>
<div class="p-md flex flex-col flex-grow">
<h4 class="font-h4 text-h4 text-on-surface mb-xs line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">Full-Stack Engineering Boot-camp</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md line-clamp-2">Master React, Node.js, and Postgres in this comprehensive 12-week immersive program.</p>
<div class="mt-auto pt-md border-t border-outline-variant flex justify-between items-center">
<div class="flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">schedule</span> 120 Hours
                            </div>
<span class="font-h4 text-h4 text-on-surface">$149</span>
</div>
</div>
</div>
<div class="min-w-[300px] md:min-w-[340px] max-w-[340px] bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-ambient-md snap-start flex-shrink-0 flex flex-col group">
<div class="relative h-48 overflow-hidden">
<img alt="Design sketches" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdmi6OQdL-TYCx0BzXo-YRfLOip59uFZb2s-3vtebK2kAUgVrc2dPHxhYXa1b9CXnrPUpKc8zW6tGxi4siEjDwmgFGGcHJOYaQUHmSQV1-xnMAuMXfzpUiKff21TtoxiAPlLrb--70f0Gvr5xM1WrKfwUwL69MD1doJzWXahmAxu03u-xp-Saeg5AO5hAJfba4ose5plcIHDgAphAfxj64R0LKEarWFbCZq_N2jKl3apSXr5HCPZH5L3H0myjUaCk0Y9Lz_xVybp4A"/>
<div class="absolute top-sm right-sm bg-surface/90 backdrop-blur-sm px-xs py-[2px] rounded text-primary font-label-sm text-label-sm flex items-center gap-[2px]">
<span class="material-symbols-outlined text-[14px]">star</span> 4.9
                        </div>
<div class="absolute bottom-sm left-sm bg-surface-container-highest/90 backdrop-blur-sm px-sm py-[2px] rounded-full text-on-surface font-label-sm text-label-sm">
                            Design
                        </div>
</div>
<div class="p-md flex flex-col flex-grow">
<h4 class="font-h4 text-h4 text-on-surface mb-xs line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">UX/UI Principles &amp; Practices</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md line-clamp-2">Learn to design intuitive interfaces that user love, focusing on psychology and accessibility.</p>
<div class="mt-auto pt-md border-t border-outline-variant flex justify-between items-center">
<div class="flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">schedule</span> 45 Hours
                            </div>
<span class="font-h4 text-h4 text-on-surface">$89</span>
</div>
</div>
</div>
<div class="min-w-[300px] md:min-w-[340px] max-w-[340px] bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-ambient-md snap-start flex-shrink-0 flex flex-col group">
<div class="relative h-48 overflow-hidden">
<img alt="Business meeting" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRnz3ziulX8fVeydKRtiQc-KRUcen7mjsR61ZiweyBkqiJyVhfyR1XDzIRcHuBPrn--1Snn_3oF6r3nhbn1nLoSRGJAwtQSN54n_0V-QwdIswiVPelz-Iqgz-VZ9tHZyZm2E-6wMKMtVf1ZdcXJNHsKIhvM3P28BSQnFP-R5h5nc-sOy6LVeAqKmAelbAktHr0ue_W0FJCc6JOCeyaIJorONeCdWxTxRSggYs8ofmCksonlUTVLMzPNn9eVbat2mlLUzzyPYq9y88I"/>
<div class="absolute top-sm right-sm bg-surface/90 backdrop-blur-sm px-xs py-[2px] rounded text-primary font-label-sm text-label-sm flex items-center gap-[2px]">
<span class="material-symbols-outlined text-[14px]">star</span> 4.7
                        </div>
<div class="absolute bottom-sm left-sm bg-surface-container-highest/90 backdrop-blur-sm px-sm py-[2px] rounded-full text-on-surface font-label-sm text-label-sm">
                            Business
                        </div>
</div>
<div class="p-md flex flex-col flex-grow">
<h4 class="font-h4 text-h4 text-on-surface mb-xs line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">Agile Product Management</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md line-clamp-2">Lead teams to success by mastering agile methodologies, sprint planning, and backlog grooming.</p>
<div class="mt-auto pt-md border-t border-outline-variant flex justify-between items-center">
<div class="flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">schedule</span> 30 Hours
                            </div>
<span class="font-h4 text-h4 text-on-surface">$119</span>
</div>
</div>
</div>
<div class="min-w-[300px] md:min-w-[340px] max-w-[340px] bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-ambient-md snap-start flex-shrink-0 flex flex-col group">
<div class="relative h-48 overflow-hidden bg-surface-container-high flex items-center justify-center">
<span class="material-symbols-outlined text-outline-variant text-[64px]">imagesmode</span>
<div class="absolute top-sm right-sm bg-surface/90 backdrop-blur-sm px-xs py-[2px] rounded text-primary font-label-sm text-label-sm flex items-center gap-[2px]">
<span class="material-symbols-outlined text-[14px]">star</span> 4.9
                        </div>
<div class="absolute bottom-sm left-sm bg-surface-container-highest/90 backdrop-blur-sm px-sm py-[2px] rounded-full text-on-surface font-label-sm text-label-sm">
                            Marketing
                        </div>
</div>
<div class="p-md flex flex-col flex-grow">
<h4 class="font-h4 text-h4 text-on-surface mb-xs line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">Advanced Data Analytics</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md line-clamp-2">Leverage data to drive marketing decisions. Covers SQL, Python basics, and Tableau.</p>
<div class="mt-auto pt-md border-t border-outline-variant flex justify-between items-center">
<div class="flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">schedule</span> 60 Hours
                            </div>
<span class="font-h4 text-h4 text-on-surface">$199</span>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="py-3xl bg-surface relative overflow-hidden">
<div class="container mx-auto px-lg max-w-container-max relative z-10">
<div class="text-center max-w-2xl mx-auto mb-2xl">
<h2 class="font-h2 text-h2 text-on-surface mb-sm">Your Path to Success</h2>
<p class="font-body-md text-body-md text-on-surface-variant">A streamlined process designed to take you from beginner to expert in minimal time.</p>
</div>
<div class="grid md:grid-cols-3 gap-xl">
<div class="flex flex-col items-center text-center group">
<div class="w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center mb-md group-hover:bg-primary-container group-hover:border-primary-container transition-colors shadow-ambient-md relative">
<span class="material-symbols-outlined text-[32px] text-primary">search</span>
<div class="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm flex items-center justify-center">1</div>
</div>
<h3 class="font-h3 text-h3 text-on-surface mb-xs">Choose Your Path</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant max-w-[250px]">Browse our curated catalog and select the skills that align with your career goals.</p>
</div>
<div class="flex flex-col items-center text-center group relative">
<div class="hidden md:block absolute top-8 left-[-50%] w-full h-[2px] bg-gradient-to-r from-transparent via-outline-variant to-transparent -z-10"></div>
<div class="w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center mb-md group-hover:bg-primary-container group-hover:border-primary-container transition-colors shadow-ambient-md relative">
<span class="material-symbols-outlined text-[32px] text-primary">menu_book</span>
<div class="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm flex items-center justify-center">2</div>
</div>
<h3 class="font-h3 text-h3 text-on-surface mb-xs">Learn &amp; Practice</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant max-w-[250px]">Engage with high-quality video content and complete hands-on assignments.</p>
</div>
<div class="flex flex-col items-center text-center group relative">
<div class="hidden md:block absolute top-8 left-[-50%] w-full h-[2px] bg-gradient-to-r from-transparent via-outline-variant to-transparent -z-10"></div>
<div class="w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center mb-md group-hover:bg-primary-container group-hover:border-primary-container transition-colors shadow-ambient-md relative">
<span class="material-symbols-outlined text-[32px] text-primary">emoji_events</span>
<div class="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm flex items-center justify-center">3</div>
</div>
<h3 class="font-h3 text-h3 text-on-surface mb-xs">Succeed &amp; Advance</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant max-w-[250px]">Earn your certificate and apply your new skills to advance your career.</p>
</div>
</div>
</div>
</section>
<section class="py-3xl bg-surface-container-highest relative">
<div class="absolute inset-0 overflow-hidden pointer-events-none">
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-primary-fixed/30 blur-[100px]"></div>
</div>
<div class="container mx-auto px-lg max-w-container-max relative z-10">
<div class="text-center mb-2xl">
<h2 class="font-h2 text-h2 text-on-surface mb-sm">Hear from Our Alumni</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Real stories of career transformation.</p>
</div>
<div class="grid md:grid-cols-2 gap-xl">
<div class="glass-card rounded-xl p-lg flex flex-col gap-md shadow-ambient-md">
<div class="flex gap-xs text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p class="font-body-lg text-body-lg text-on-surface italic">"EduFlow completely changed my career trajectory. The UI/UX course was rigorous, practical, and directly applicable. Within three months of completing the program, I landed a Senior Designer role at a top SaaS company."</p>
<div class="flex items-center gap-md mt-auto pt-md">
<img alt="Sarah J." class="w-12 h-12 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZjcnaKovXaKEsfZEXuOlfhq2dVU1-aogAsuGmbfXwTeArK4qm-HFh7phmPXY0613RnFJGUgioSG2OmuIBdDEDurqUMYI9zbmMDrfhK0xW4Lw4SvQeiMknlPmnI8aF5ubrYbjCvq4L5mJOIj9liYFF-2zoy882icEYCvf2OsipvZRySeW2F5AZfLkjcbtsf2o5Lu4I9hz4dVaSAptaq89fXalz9vPAlUGwXXE98b_T6Bl39Prxm7MLC8N4Ge_8PBrVgr9FLCjAITf"/>
<div>
<h4 class="font-label-md text-label-md text-on-surface">Sarah Jenkins</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Senior Product Designer</p>
</div>
</div>
</div>
<div class="glass-card rounded-xl p-lg flex flex-col gap-md shadow-ambient-md">
<div class="flex gap-xs text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p class="font-body-lg text-body-lg text-on-surface italic">"The Full-Stack Bootcamp provided the structured learning environment I needed. The distraction-free interface and high-quality video content made grasping complex backend concepts much easier than self-teaching."</p>
<div class="flex items-center gap-md mt-auto pt-md">
<img alt="Michael T." class="w-12 h-12 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs7OxaELFpVq6jMX3KZaw1G26RB2H9S7S9NjtSON5C_z3JUqyQ8Opffgv3c7on90QCcNiX_CYumbBIGSxmE_C2KHscKdYehSW1IKSoCHZqHKmL5fef1Gte3h8166ONZfdPoXTEd65yHisHBM6PQbiQJRXbeMpSFU-XBQ84yqP38vBe-L5ZZ4LepyhmA9_J5UIXO1wXKwq15eLfv_tjB6SO7w7mZM8hhdSBnihgJqzEqWe0w-qj8UzttdwoEsr-zWSzB8Q_atP2F-Ef"/>
<div>
<h4 class="font-label-md text-label-md text-on-surface">Michael Torres</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Software Engineer</p>
</div>
</div>
</div>
</div>
</div>
</section>
<footer class="bg-surface-container-highest dark:bg-on-background font-body-sm text-body-sm full-width bottom flat no shadows w-full px-lg py-3xl flex flex-col items-center justify-center space-y-md">
<div class="font-h4 text-h4 font-bold text-on-surface dark:text-surface-bright mb-md">EduFlow</div>
<div class="flex flex-wrap justify-center gap-lg mb-md">
<a class="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-300" href="#">Terms of Service</a>
<a class="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-300" href="#">Privacy Policy</a>
<a class="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-300" href="#">Cookie Settings</a>
<a class="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-300" href="#">Contact Support</a>
</div>
<div class="text-on-surface-variant dark:text-outline-variant mt-xl text-center">
            © 2024 EduFlow Learning Inc. All rights reserved.
        </div>
</footer>
`;

export default function Home() {
  return (
    <div
      className="bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen"
      style={homeTheme}
      dangerouslySetInnerHTML={{ __html: homeMarkup }}
    />
  );
}
