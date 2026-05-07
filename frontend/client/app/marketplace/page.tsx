import type { CSSProperties } from "react";

const marketplaceTheme = {
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

const marketplaceMarkup = `
<nav class="shadow-sm bg-surface flex justify-between items-center px-lg py-sm w-full sticky top-0 z-50">
<div class="flex items-center gap-xl">
<a class="font-h3 text-h3 font-bold text-primary" href="/">EduFlow</a>
<div class="hidden md:flex items-center gap-lg">
<a class="text-primary border-b-2 border-primary font-bold font-body-md text-body-md pb-1 active:scale-95 duration-150" href="/marketplace">Marketplace</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md pb-1 active:scale-95 duration-150" href="#">Success Stories</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md pb-1 active:scale-95 duration-150" href="#">Enterprise</a>
</div>
</div>
<div class="flex-1 max-w-md mx-lg hidden lg:block relative">
<span class="material-symbols-outlined absolute left-sm top-1/2 transform -translate-y-1/2 text-outline">search</span>
<input class="w-full pl-xl pr-sm py-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-sm text-body-sm transition-all text-on-surface placeholder:text-on-surface-variant" placeholder="Search for anything..." type="text"/>
</div>
<div class="flex items-center gap-md">
<a class="hidden md:block font-label-md text-label-md text-primary bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm hover:bg-surface-container-low transition-colors active:scale-95 duration-150" href="/login">Log In</a>
<a class="primary-gradient-button text-on-primary font-label-md text-label-md rounded-lg px-md py-sm hover:opacity-90 transition-opacity shadow-sm active:scale-95 duration-150" href="/register">Get Started</a>
<img alt="User profile" class="w-10 h-10 rounded-full border border-outline-variant object-cover ml-sm cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgQfQRUD1h3I3K6qFlDOb-3NbrWbc5tXmRwr3k8ufnss220cv7yzcKWJwECOW8kXuHLFmN7Dy7d3QgNHgr4tudb-_9bTIuL9W2I1iQ9yOljEM5A0AjTQYGWd9Kq12GbLTU_paDZZSx0Ch525P-K_q4_QY9ohtNOeyMfwJhZLUBKsforThJbXwQhqCdJfrJrBYvhJHT3VaXJewYs2bnStDspmpM4dAkEvsEazBQVcaBB_teBIB3KBQzoKZZBfW_QtbLZTlbAhrGAgMs"/>
</div>
</nav>
<main class="flex-grow flex w-full max-w-container-max mx-auto px-lg py-xl gap-xl">
<aside class="w-64 flex-shrink-0 hidden lg:block space-y-xl">
<div class="font-h4 text-h4 text-on-surface mb-md">Filters</div>
<div class="space-y-sm">
<div class="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-sm">Level</div>
<label class="flex items-center gap-sm font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
                    Beginner
                </label>
<label class="flex items-center gap-sm font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
                    Intermediate
                </label>
<label class="flex items-center gap-sm font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
                    Expert
                </label>
</div>
<div class="space-y-sm pt-md border-t border-outline-variant">
<div class="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-sm">Price</div>
<label class="flex items-center gap-sm font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
                    Free
                </label>
<label class="flex items-center gap-sm font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
                    Paid
                </label>
</div>
<div class="space-y-sm pt-md border-t border-outline-variant">
<div class="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-sm">Language</div>
<label class="flex items-center gap-sm font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
<input checked class="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
                    English
                </label>
<label class="flex items-center gap-sm font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
                    Spanish
                </label>
<label class="flex items-center gap-sm font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
                    French
                </label>
</div>
</aside>
<section class="flex-1">
<div class="bg-surface-container-lowest border border-outline-variant rounded-lg p-md mb-lg flex flex-col md:flex-row gap-md justify-between items-center ambient-shadow-card">
<div class="font-h3 text-h3 text-on-surface w-full md:w-auto">10,000+ Courses</div>
<div class="flex gap-sm w-full md:w-auto">
<select class="bg-surface-container-lowest border border-outline-variant text-on-surface font-body-sm text-body-sm rounded-lg py-sm px-md focus:border-primary focus:ring-primary outline-none cursor-pointer flex-1 md:flex-none">
<option>Most Popular</option>
<option>Highest Rated</option>
<option>Newest</option>
<option>Price: Low to High</option>
</select>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
<a class="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant ambient-shadow-card flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-300" href="/course-details">
<div class="relative h-48 w-full">
<img alt="Course Thumbnail" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR-tqsUWwI7arGg_dd6eMgWQ8gxgFuaUK1RR4gLh_55As_Qb5YmJX3LuggWF-ONAWa0kqjULh46F5DBWZzx3Xd5MhAg98VhpmYBEdXjg5d351ig5xyBlBpGvQUDZ52vuv44y_ZEfUb28j0CAh8eWi9kQOqV0lAJffSqbQjC7ompfUjKWlNT11O23JRT5G9c2x3KEuBFb2QJ8Gtfa_TAcNsy1SCFFRmVD6ScZkaQ7xj3t0JcSejIaO3UVzh0m9nRH0VSUDRHxeYda2O"/>
<div class="absolute top-sm left-sm bg-primary/10 text-primary font-label-sm text-label-sm px-2 py-1 rounded-full backdrop-blur-sm bg-surface-container-lowest/80 border border-primary/20">Best Seller</div>
</div>
<div class="p-md flex flex-col flex-1">
<h3 class="font-h4 text-h4 text-on-surface mb-xs line-clamp-2 group-hover:text-primary transition-colors">Advanced React Native: Build Enterprise Apps</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md">Sarah Drasner</p>
<div class="flex items-center gap-xs mb-md mt-auto">
<span class="font-label-sm text-label-sm text-tertiary-container">4.8</span>
<div class="flex text-tertiary-container">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]">star_half</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant ml-xs">(12,340)</span>
</div>
<div class="flex items-center justify-between border-t border-outline-variant pt-sm mt-sm">
<span class="font-h3 text-h3 text-on-surface">$89.99</span>
<div class="flex items-center gap-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">schedule</span>
<span class="font-label-sm text-label-sm">12h 30m</span>
</div>
</div>
</div>
</a>
<a class="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant ambient-shadow-card flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-300" href="/course-details">
<div class="relative h-48 w-full">
<img alt="Course Thumbnail" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMIKMpXimGfz-riRw3hkKMSLrdJUXR5_CGXc2yIZzFPLukvcJOMAtj6CUuBUqgNx9NVMgyNMrdsVY1rhG-P1PlSavmbDooJlfz8t4Y5DYVVC1LgxwCMflOU7hJIqpuVlzie6ByxDqAQEzvwPyQIqH-jM54DxsahhOhTKD2EVmtpFPeBkA0-lxCXwxL-QyBjQSLkeMUvVr-DzVFFe3ITbgW64sGxqVVQVZpBBBlWgbzarSobsN5r05L9FVP15bfOLzgBp5UhKRVlqZb"/>
</div>
<div class="p-md flex flex-col flex-1">
<h3 class="font-h4 text-h4 text-on-surface mb-xs line-clamp-2 group-hover:text-primary transition-colors">UI/UX Design Masterclass: Figma to Framer</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md">Gary Simon</p>
<div class="flex items-center gap-xs mb-md mt-auto">
<span class="font-label-sm text-label-sm text-tertiary-container">4.9</span>
<div class="flex text-tertiary-container">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant ml-xs">(8,102)</span>
</div>
<div class="flex items-center justify-between border-t border-outline-variant pt-sm mt-sm">
<span class="font-h3 text-h3 text-on-surface">$79.99</span>
<div class="flex items-center gap-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">schedule</span>
<span class="font-label-sm text-label-sm">8h 45m</span>
</div>
</div>
</div>
</a>
<a class="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant ambient-shadow-card flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-300" href="/course-details">
<div class="relative h-48 w-full">
<img alt="Course Thumbnail" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDpoR5Bry0ePcaQLohG6hdjwUQWjWPWNtnqbo2jL8t4bxE6pRd_ZYT2v0kHRaNHlrFweV_wqvPB7jKsw8nOV46aSzRnZ-3rPt0rlJzW26tXtKHHkNrJ5fiDMesg1sCGyNT75xR065YBiLAzTD3IuvNBe3utgf6uroAkcEytaxVkUbsa2zzymtEZ4T932weEmsM6zU6DMrAA6yNgJ5BYDQY6-z6MXCDaGoOieITa4GwIhB5Cma6OibrNzQ6vH9RJxR8G61Ux8EoFV89"/>
<div class="absolute top-sm left-sm bg-primary/10 text-primary font-label-sm text-label-sm px-2 py-1 rounded-full backdrop-blur-sm bg-surface-container-lowest/80 border border-primary/20">New</div>
</div>
<div class="p-md flex flex-col flex-1">
<h3 class="font-h4 text-h4 text-on-surface mb-xs line-clamp-2 group-hover:text-primary transition-colors">Data Science Bootcamp: Python &amp; Machine Learning</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md">Jose Portilla</p>
<div class="flex items-center gap-xs mb-md mt-auto">
<span class="font-label-sm text-label-sm text-tertiary-container">4.7</span>
<div class="flex text-tertiary-container">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]">star_half</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant ml-xs">(4,500)</span>
</div>
<div class="flex items-center justify-between border-t border-outline-variant pt-sm mt-sm">
<span class="font-h3 text-h3 text-on-surface">$99.99</span>
<div class="flex items-center gap-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">schedule</span>
<span class="font-label-sm text-label-sm">22h 10m</span>
</div>
</div>
</div>
</a>
<a class="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant ambient-shadow-card flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-300" href="/course-details">
<div class="relative h-48 w-full">
<img alt="Course Thumbnail" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0e5e58-2rTQV68h3R9iInEAWIUOpUXFQNvu5XW68IDvYGy7wT65wucl6zgPcZ7RU5_h8J-wgSl0Nn0CFreKENAlgooq5G7v0y1dICzazdxTVfzasssod7KjzTJX4Ds7Bnh7msjtOMWvKnGOwEs34ejjxwVc5CTD98Vtauf3zhdiYRWLg-Yls2zWfAKkulI5TfPmlOTUArVObrd5HdKW4MVIDSGWFQyOu-VPM9abYPHmbpezIuk_ASwz5vopph6amDUc8dHh3iR4YW"/>
</div>
<div class="p-md flex flex-col flex-1">
<h3 class="font-h4 text-h4 text-on-surface mb-xs line-clamp-2 group-hover:text-primary transition-colors">Agile Project Management &amp; Scrum Prep</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md">Mike Griffiths</p>
<div class="flex items-center gap-xs mb-md mt-auto">
<span class="font-label-sm text-label-sm text-tertiary-container">4.6</span>
<div class="flex text-tertiary-container">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[16px]">star_half</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant ml-xs">(2,100)</span>
</div>
<div class="flex items-center justify-between border-t border-outline-variant pt-sm mt-sm">
<span class="font-h3 text-h3 text-on-surface">$49.99</span>
<div class="flex items-center gap-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">schedule</span>
<span class="font-label-sm text-label-sm">5h 20m</span>
</div>
</div>
</div>
</a>
</div>
<div class="mt-xl flex justify-center gap-sm">
<button class="w-10 h-10 rounded-lg border border-outline-variant bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"><span class="material-symbols-outlined">chevron_left</span></button>
<button class="w-10 h-10 rounded-lg bg-primary text-on-primary font-label-md flex items-center justify-center">1</button>
<button class="w-10 h-10 rounded-lg border border-outline-variant bg-surface-container-lowest flex items-center justify-center font-label-md text-on-surface hover:bg-surface-container-low transition-colors">2</button>
<button class="w-10 h-10 rounded-lg border border-outline-variant bg-surface-container-lowest flex items-center justify-center font-label-md text-on-surface hover:bg-surface-container-low transition-colors">3</button>
<button class="w-10 h-10 rounded-lg border border-outline-variant bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"><span class="material-symbols-outlined">chevron_right</span></button>
</div>
</section>
</main>
<footer class="bg-surface-container-highest w-full px-lg py-3xl flex flex-col items-center justify-center space-y-md mt-auto">
<div class="font-h4 text-h4 font-bold text-on-surface">EduFlow</div>
<div class="flex flex-wrap justify-center gap-lg">
<a class="text-on-surface-variant font-body-sm text-body-sm hover:text-primary transition-all duration-300" href="#">Terms of Service</a>
<a class="text-on-surface-variant font-body-sm text-body-sm hover:text-primary transition-all duration-300" href="#">Privacy Policy</a>
<a class="text-on-surface-variant font-body-sm text-body-sm hover:text-primary transition-all duration-300" href="#">Cookie Settings</a>
<a class="text-on-surface-variant font-body-sm text-body-sm hover:text-primary transition-all duration-300" href="#">Contact Support</a>
</div>
<div class="text-on-surface-variant font-body-sm text-body-sm mt-lg">© 2024 EduFlow Learning Inc. All rights reserved.</div>
</footer>
`;

export default function MarketplacePage() {
  return (
    <div
      className="font-body-md text-on-surface antialiased flex flex-col min-h-screen bg-background"
      style={marketplaceTheme}
      dangerouslySetInnerHTML={{ __html: marketplaceMarkup }}
    />
  );
}
