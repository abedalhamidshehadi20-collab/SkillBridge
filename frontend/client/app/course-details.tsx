/**
 * Course Details Page
 * Displays detailed information about a specific course including:
 * - Course header with breadcrumbs, title, ratings
 * - Video preview section
 * - Learning objectives
 * - Course curriculum
 * - Instructor information
 * - Sticky enrollment card with pricing
 */

import type { CSSProperties } from "react";

const courseTheme = {
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
  "--color-inverse-on-surface": "#eaf1ff",
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

const courseMarkup = `
<nav class="bg-surface dark:bg-surface-dim shadow-sm flex justify-between items-center px-lg py-sm w-full sticky top-0 z-50">
<div class="flex items-center gap-xl">
<a class="font-h3 text-h3 font-bold text-primary dark:text-primary-fixed-dim" href="/">EduFlow</a>
<div class="hidden md:flex gap-lg items-center">
<a class="font-body-md text-body-md text-primary dark:text-primary-fixed-dim border-b-2 border-primary font-bold hover:text-primary dark:hover:text-primary-fixed transition-colors active:scale-95 duration-150" href="/marketplace">Marketplace</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors active:scale-95 duration-150" href="#">Success Stories</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors active:scale-95 duration-150" href="#">Enterprise</a>
</div>
</div>
<div class="flex items-center gap-md">
<a class="font-label-md text-label-md text-primary px-md py-sm rounded border border-outline-variant hover:bg-surface-container transition-colors h-[40px] flex items-center" href="/login">Log In</a>
<a class="font-label-md text-label-md text-on-primary bg-gradient-to-r from-[#6366f1] to-[#4f46e5] px-md py-sm rounded shadow hover:shadow-md transition-all h-[40px] flex items-center" href="/register">Get Started</a>
<div class="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border border-outline-variant ml-sm">
<img alt="User profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIgYAjS5yZAD4LlofACwlK-WXaZVSEwypxXMlhKD-44j8_Adr5yg8ov03DMskTFMgsq_1kAZsoNfTIFgB6A2fIJjz8YLx-bhr29Wng2MDRahSF-DnEQLra-qxW2NtohsatOfA0Ne01yJcAbaOmrl2od2Q4-VbQFF5o4d6-Bc1bjosBhIbjUjnLOIY64TNrH5xYCtKqa1Tv5fYDLrwWEUcBSTXaQsiZbajp-aK-Fu_K0_IdqKBe1R--MThtMiia-EyxADgANaq0kKqS"/>
</div>
</div>
</nav>
<header class="bg-inverse-surface text-inverse-on-surface pt-3xl pb-3xl px-lg">
<div class="max-w-container-max mx-auto w-full">
<div class="flex items-center gap-sm mb-lg text-outline-variant font-body-sm text-body-sm">
<a class="hover:text-inverse-primary transition-colors" href="#">Development</a>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
<a class="hover:text-inverse-primary transition-colors" href="#">Web Development</a>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
<span class="text-inverse-on-surface">React</span>
</div>
<h1 class="font-h1 text-h1 text-inverse-on-surface mb-md max-w-3xl">Advanced React Patterns &amp; Performance Optimization</h1>
<p class="font-body-lg text-body-lg text-outline-variant max-w-3xl mb-lg">Master enterprise-level React applications. Learn advanced state management, render optimization, and architectural patterns used by top tech companies.</p>
<div class="flex items-center gap-md mb-lg">
<div class="flex items-center gap-xs text-[#fbbf24]">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined">star_half</span>
</div>
<span class="font-label-md text-label-md text-inverse-primary">4.8 (2,451 ratings)</span>
<span class="font-body-sm text-body-sm text-outline-variant">15,302 students</span>
</div>
<div class="flex items-center gap-sm">
<span class="font-body-sm text-body-sm text-outline-variant">Created by</span>
<a class="font-label-md text-label-md text-inverse-primary hover:underline" href="#instructor">Sarah Jenkins</a>
</div>
</div>
</header>
<main class="max-w-container-max mx-auto w-full px-lg py-xl grid grid-cols-1 lg:grid-cols-12 gap-gutter relative">
<div class="lg:col-span-8 flex flex-col gap-2xl">
<section class="rounded-xl overflow-hidden shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)] relative group aspect-video bg-surface-variant">
<img alt="React Code on Screen" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpTrHeeB3bL25W3tpUy_lkcSduIgHk18PPOk3ZTuZWoPHo7epb__Tp-OxLFYW1jpuEvt1MkZQDHongBtl9lPDiEYdmWmrftz4AU8PY32xWlUu3MP5TmEwTC2uIp5Ib-HPx4xdGcBa2q4yR5wbjSb8qy22zO1-2gPFYkNnhLS4wRYxKAm8a1nFx_nXsCR_REA4GmO6ovNgu4XXUNfSUVmis-kCW-7y2r_GbluuasKHwNMkh00150K7htVfOHShEt2fFmZfEdD_Mc3Ua"/>
<div class="absolute inset-0 bg-on-background/20 flex items-center justify-center group-hover:bg-on-background/30 transition-colors">
<button class="w-16 h-16 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center text-primary shadow-lg hover:scale-105 transition-transform">
<span class="material-symbols-outlined text-[32px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</button>
</div>
<div class="absolute bottom-0 left-0 right-0 p-md bg-gradient-to-t from-on-background/80 to-transparent flex items-center gap-sm text-surface">
<span class="font-label-sm text-label-sm">Preview Course</span>
</div>
</section>
<section class="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]">
<h2 class="font-h3 text-h3 text-on-surface mb-lg">What you'll learn</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-md">
<div class="flex items-start gap-sm">
<span class="material-symbols-outlined text-primary mt-1">check</span>
<p class="font-body-md text-body-md text-on-surface-variant">Implement advanced custom hooks for complex state management</p>
</div>
<div class="flex items-start gap-sm">
<span class="material-symbols-outlined text-primary mt-1">check</span>
<p class="font-body-md text-body-md text-on-surface-variant">Optimize re-renders using useMemo, useCallback, and React.memo</p>
</div>
<div class="flex items-start gap-sm">
<span class="material-symbols-outlined text-primary mt-1">check</span>
<p class="font-body-md text-body-md text-on-surface-variant">Build scalable architectures for enterprise applications</p>
</div>
<div class="flex items-start gap-sm">
<span class="material-symbols-outlined text-primary mt-1">check</span>
<p class="font-body-md text-body-md text-on-surface-variant">Master the Context API for global state without Redux</p>
</div>
</div>
</section>
<section>
<h2 class="font-h3 text-h3 text-on-surface mb-md">Course Description</h2>
<div class="font-body-md text-body-md text-on-surface-variant space-y-md">
<p>Are you comfortable with basic React but feel overwhelmed when building large-scale applications? This course bridges the gap between knowing React and engineering scalable React architecture.</p>
<p>We'll dive deep into performance bottlenecks, profiling tools, and structural patterns that professional teams use to maintain codebases with thousands of components.</p>
<button class="font-label-md text-label-md text-primary mt-sm flex items-center gap-xs hover:underline">
                        Read more
                        <span class="material-symbols-outlined text-[16px]">expand_more</span>
</button>
</div>
</section>
<section>
<h2 class="font-h3 text-h3 text-on-surface mb-md">Course Curriculum</h2>
<div class="flex justify-between items-center mb-md font-body-sm text-body-sm text-on-surface-variant">
<span>12 sections • 145 lectures • 18h 20m total length</span>
<button class="text-primary hover:underline font-label-sm text-label-sm">Expand all</button>
</div>
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="border-b border-outline-variant last:border-b-0 bg-surface-container-lowest">
<button class="w-full flex items-center justify-between p-md hover:bg-surface-container-low transition-colors text-left group">
<div class="flex items-center gap-md">
<span class="material-symbols-outlined text-outline group-hover:text-primary transition-colors">expand_more</span>
<span class="font-h4 text-h4 text-on-surface">1. Introduction &amp; Setup</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant hidden md:block">5 lectures • 45m</span>
</button>
<div class="p-md pt-0 bg-surface-container-lowest">
<ul class="space-y-sm">
<li class="flex items-center justify-between font-body-sm text-body-sm py-xs">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary text-[18px]">play_circle</span>
<a class="text-on-surface hover:text-primary transition-colors" href="#">Welcome to the Course</a>
</div>
<div class="flex items-center gap-md">
<span class="text-primary text-xs border border-primary px-2 rounded-full hidden md:inline-block">Preview</span>
<span class="text-on-surface-variant">05:20</span>
</div>
</li>
<li class="flex items-center justify-between font-body-sm text-body-sm py-xs">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-outline-variant text-[18px]">article</span>
<span class="text-on-surface">Environment Setup Guide</span>
</div>
<span class="text-on-surface-variant">10:00</span>
</li>
</ul>
</div>
</div>
<div class="border-b border-outline-variant last:border-b-0 bg-surface-container-lowest">
<button class="w-full flex items-center justify-between p-md hover:bg-surface-container-low transition-colors text-left group">
<div class="flex items-center gap-md">
<span class="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
<span class="font-h4 text-h4 text-on-surface">2. Advanced State Management</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant hidden md:block">12 lectures • 2h 15m</span>
</button>
</div>
</div>
</section>
<section class="pt-xl border-t border-outline-variant" id="instructor">
<h2 class="font-h3 text-h3 text-on-surface mb-lg">Your Instructor</h2>
<div class="flex flex-col md:flex-row gap-lg">
<div class="w-32 h-32 rounded-full overflow-hidden shrink-0 border-2 border-surface-variant shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]">
<img alt="Instructor Sarah Jenkins" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG-TWITuk1jYdrChHSMWtEL_fqo35M-BbJbWdGfTAXfsZaHtDUbQMelYgKJjqHR3biXP4EtIXPrOLyJYlbpGGM4HPCjJUgkJZK4XnbIvgwE-fCMsQ6kPLdkg2kIU_DCSiaJGSeEK5pm3pL1MbZtJ0eAWMJWjqjEKYvDvSRiTTIqhRV1cGjqf9nf3W-UenZojgVx-UIRCpvU8tS0wnI2ks0i38JzlDhlhTLsTA1hdy5AoCKq4ZH8xPqeDoToazIyAGPfP8uez5eW5Ht"/>
</div>
<div>
<h3 class="font-h4 text-h4 text-on-surface">Sarah Jenkins</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md">Senior Frontend Engineer &amp; Educator</p>
<div class="flex items-center gap-md mb-md font-body-sm text-body-sm text-on-surface-variant">
<div class="flex items-center gap-xs"><span class="material-symbols-outlined text-[18px]">star</span> 4.8 Rating</div>
<div class="flex items-center gap-xs"><span class="material-symbols-outlined text-[18px]">group</span> 50k+ Students</div>
<div class="flex items-center gap-xs"><span class="material-symbols-outlined text-[18px]">play_circle</span> 8 Courses</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">Sarah is a Senior Frontend Engineer who has worked at leading tech companies. She specializes in building high-performance web applications and loves breaking down complex architectural concepts into digestible lessons.</p>
</div>
</div>
</section>
</div>
<div class="lg:col-span-4 hidden lg:block">
<div class="sticky top-32 bg-surface-container-lowest rounded-xl shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1)] border border-outline-variant overflow-hidden">
<div class="p-lg border-b border-outline-variant">
<div class="flex items-end gap-sm mb-md">
<span class="font-h1 text-h1 text-on-surface font-bold">$89.99</span>
<span class="font-body-lg text-body-lg text-outline-variant line-through mb-1">$129.99</span>
</div>
<button class="w-full h-[48px] font-label-md text-label-md text-on-primary bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded shadow hover:shadow-md transition-all mb-sm">
                        Enroll Now
                    </button>
<button class="w-full h-[48px] font-label-md text-label-md text-primary bg-surface-container-lowest border border-outline-variant rounded hover:bg-surface-container transition-colors mb-sm">
                        Add to Cart
                    </button>
<p class="font-body-sm text-body-sm text-center text-on-surface-variant">30-Day Money-Back Guarantee</p>
</div>
<div class="p-lg">
<h4 class="font-label-md text-label-md text-on-surface mb-sm">This course includes:</h4>
<ul class="space-y-sm font-body-sm text-body-sm text-on-surface-variant">
<li class="flex items-center gap-sm"><span class="material-symbols-outlined text-[18px]">ondemand_video</span> 18.5 hours on-demand video</li>
<li class="flex items-center gap-sm"><span class="material-symbols-outlined text-[18px]">article</span> 14 articles</li>
<li class="flex items-center gap-sm"><span class="material-symbols-outlined text-[18px]">code</span> 10 coding exercises</li>
<li class="flex items-center gap-sm"><span class="material-symbols-outlined text-[18px]">all_inclusive</span> Full lifetime access</li>
<li class="flex items-center gap-sm"><span class="material-symbols-outlined text-[18px]">devices</span> Access on mobile and TV</li>
<li class="flex items-center gap-sm"><span class="material-symbols-outlined text-[18px]">emoji_events</span> Certificate of completion</li>
</ul>
</div>
</div>
</div>
</main>
<footer class="bg-surface-container-highest dark:bg-on-background w-full px-lg py-3xl flex flex-col items-center justify-center space-y-md mt-3xl border-t border-outline-variant">
<div class="font-h4 text-h4 font-bold text-on-surface dark:text-surface-bright">EduFlow</div>
<div class="flex gap-lg">
<a class="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-300" href="#">Terms of Service</a>
<a class="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-300" href="#">Privacy Policy</a>
<a class="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-300" href="#">Cookie Settings</a>
<a class="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-300" href="#">Contact Support</a>
</div>
<div class="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant mt-lg">
            © 2024 EduFlow Learning Inc. All rights reserved.
        </div>
</footer>
`;

export default function CourseDetailPage() {
  return (
    <div
      className="bg-background text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container"
      style={courseTheme}
      dangerouslySetInnerHTML={{ __html: courseMarkup }}
    />
  );
}
