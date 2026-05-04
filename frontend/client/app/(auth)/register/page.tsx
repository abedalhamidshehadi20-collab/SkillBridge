'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Automatically redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 2000);
      }
    });
  };

  if (success) {
    return (
      <div className="bg-surface text-on-surface antialiased min-h-screen flex items-center justify-center p-xl">
        <div className="max-w-md w-full bg-surface-container-lowest p-xl rounded-xl shadow-sm border border-outline-variant text-center flex flex-col gap-md">
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-sm">
            <span className="material-symbols-outlined text-[32px]">check_circle</span>
          </div>
          <h1 className="font-h2 text-h2">Account Created!</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Welcome to SkillBridge. We are redirecting you to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      <div className="hidden lg:flex lg:w-[45%] bg-surface-container relative flex-col justify-between p-xl overflow-hidden border-r border-outline-variant/30">
        <div className="z-10 text-primary font-h2 text-h2 font-black tracking-tighter mix-blend-multiply">
          SkillBridge
        </div>
        <div className="z-10 max-w-md mt-auto pb-xl">
          <h2 className="font-h1 text-h1 text-on-surface mb-md">
            Swap skills.
            <br />
            Elevate your craft.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Join a curated network of professionals. Offer what you know, learn what you need, and grow together in a focused, high-caliber environment.
          </p>
        </div>
        <div
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center mix-blend-luminosity"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBoBctDdAknNqV02vq5DAovK4fHLNkxqrOf05iUSSQua6xOwvjGBOTuk_zQbO6ZAMTXRXbhouz_MbZbbXFZuU-YNIGY7e9-nniExN7xYEhTYEfl6f9Fxlf68JOzsQpMkLIlg9aIhNrJpKjr7jmf472iKEqhJxL7LsZMYFhCJwnwagH_Xbt8Z-meOMWbr15ndBSuTrZFVkfpp-KZNgfl_W1d48jhMXk0hXN_BFJ8N-rJLxQbABLYBimRdIzXpSIw4h5Jb17OKBcg3XF7')",
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-surface-container via-surface-container/80 to-transparent"></div>
      </div>
      <div className="w-full lg:w-[55%] flex items-center justify-center p-lg sm:p-xl bg-surface-container-lowest overflow-y-auto">
        <div className="w-full max-w-[480px] py-xl">
          <div className="mb-xl text-center lg:text-left">
            <div className="lg:hidden text-primary font-h2 text-h2 font-black tracking-tighter mb-lg">
              SkillBridge
            </div>
            <h1 className="font-h1 text-h1 text-on-surface mb-sm">Create your account</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Tell us a bit about yourself and your professional goals to get started.
            </p>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center mb-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">
            <div className="flex flex-col sm:flex-row gap-md">
              <div className="flex flex-col gap-xs flex-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="firstName">
                  First Name
                </label>
                <input
                  {...register('firstName')}
                  className={`px-md py-[10px] rounded-lg border ${
                    errors.firstName ? 'border-error' : 'border-outline-variant'
                  } bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder-outline font-body-md text-body-md transition-all shadow-sm`}
                  id="firstName"
                  placeholder="Jane"
                  type="text"
                  disabled={isPending}
                />
                {errors.firstName && <span className="text-error text-xs">{errors.firstName.message}</span>}
              </div>
              <div className="flex flex-col gap-xs flex-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  {...register('lastName')}
                  className={`px-md py-[10px] rounded-lg border ${
                    errors.lastName ? 'border-error' : 'border-outline-variant'
                  } bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder-outline font-body-md text-body-md transition-all shadow-sm`}
                  id="lastName"
                  placeholder="Doe"
                  type="text"
                  disabled={isPending}
                />
                {errors.lastName && <span className="text-error text-xs">{errors.lastName.message}</span>}
              </div>
            </div>
            <div className="flex flex-col gap-xs mt-sm">
              <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="email">
                Work Email
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline"
                  style={{ fontSize: '20px' }}
                >
                  mail
                </span>
                <input
                  {...register('email')}
                  className={`w-full pl-[44px] pr-md py-[10px] rounded-lg border ${
                    errors.email ? 'border-error' : 'border-outline-variant'
                  } bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder-outline font-body-md text-body-md transition-all shadow-sm`}
                  id="email"
                  placeholder="jane.doe@company.com"
                  type="email"
                  disabled={isPending}
                />
              </div>
              {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-xs mt-sm">
              <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline"
                  style={{ fontSize: '20px' }}
                >
                  lock
                </span>
                <input
                  {...register('password')}
                  className={`w-full pl-[44px] pr-md py-[10px] rounded-lg border ${
                    errors.password ? 'border-error' : 'border-outline-variant'
                  } bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder-outline font-body-md text-body-md transition-all shadow-sm`}
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  disabled={isPending}
                />
              </div>
              {errors.password ? (
                <p className="text-error text-xs mt-1">{errors.password.message}</p>
              ) : (
                <p className="font-caption text-caption text-outline mt-1">
                  Must be at least 8 characters long.
                </p>
              )}
            </div>

            <div className="h-px w-full bg-outline-variant/30 my-md"></div>
            
            {/* Note: In Phase 5 we will make these functional. For now, they are visual placeholders. */}
            <div className="flex flex-col gap-sm">
              <div className="flex justify-between items-end">
                <label className="font-label-sm text-label-sm text-on-surface">Skills you want to learn</label>
                <span className="font-caption text-caption text-outline">Select up to 3</span>
              </div>
              <div className="flex flex-wrap gap-xs">
                <button
                  className="px-md py-sm rounded-full border border-primary bg-primary-container text-on-primary-container font-label-sm text-label-sm transition-colors shadow-sm flex items-center gap-xs"
                  type="button"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
                    check
                  </span>
                  UX Research
                </button>
                <button
                  className="px-md py-sm rounded-full border border-outline-variant text-on-surface-variant bg-surface-container-lowest font-label-sm text-label-sm hover:bg-surface-container-low transition-colors shadow-sm"
                  type="button"
                >
                  Data Science
                </button>
                <button
                  className="px-[10px] py-sm rounded-full border border-dashed border-outline text-outline font-label-sm text-label-sm hover:bg-surface-container-low hover:text-on-surface-variant transition-colors flex items-center shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    add
                  </span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-sm mt-sm">
              <div className="flex justify-between items-end">
                <label className="font-label-sm text-label-sm text-on-surface">Skills you can teach</label>
                <span className="font-caption text-caption text-outline">Select up to 3</span>
              </div>
              <div className="flex flex-wrap gap-xs">
                <button
                  className="px-md py-sm rounded-full border border-secondary bg-secondary-container text-on-secondary-container font-label-sm text-label-sm transition-colors shadow-sm flex items-center gap-xs"
                  type="button"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
                    check
                  </span>
                  Figma Mastery
                </button>
                <button
                  className="px-[10px] py-sm rounded-full border border-dashed border-outline text-outline font-label-sm text-label-sm hover:bg-surface-container-low hover:text-on-surface-variant transition-colors flex items-center shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    add
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-xl">
              <button
                className="w-full py-[14px] rounded-lg bg-gradient-to-b from-primary to-secondary text-on-primary font-label-sm text-label-sm shadow-[0_4px_12px_rgba(53,37,205,0.25)] border-t border-white/20 hover:opacity-90 hover:-translate-y-[1px] transition-all flex justify-center items-center gap-sm disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
                disabled={isPending}
              >
                {isPending ? 'Creating Account...' : 'Create Account'}
                {!isPending && <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>}
              </button>
            </div>
            <p className="font-caption text-caption text-on-surface-variant text-center mt-sm">
              By creating an account, you agree to our{' '}
              <Link className="text-primary hover:underline" href="#">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link className="text-primary hover:underline" href="#">
                Privacy Policy
              </Link>.
            </p>
          </form>
          <div className="mt-xl text-center font-body-md text-body-md text-on-surface-variant">
            Already have an account?{' '}
            <Link className="text-primary font-label-sm text-label-sm hover:underline ml-xs" href="/login">
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
