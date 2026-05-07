'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    });
  };

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex items-center justify-center relative overflow-hidden p-md sm:p-gutter">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-blMV44r5bSbe4tSvH_kVz-fwRliimO7wiFD6UeJwCRjhWCeLeva42aEdWO1itndbgAp2sbwZc3PnKg0_emNEEkgOFE95ou16OhiyuKyJ8Z3qW3fAlxdJ920CQhlIf5jKYUNwBoUhpdIMvDLX3pNQEcfEhs5DfWAsJS2pgNzcvspLeFGv3NVQZJ-PrU9F_27NRjVdYiexTvOxFF0DNuke9yZ2LuzZKSxrwU3bcKS8LhF6wWVVO8F9HISLMt2KoTKBsB_GG8ri_Dc')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <main className="w-full max-w-[420px] relative z-10">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] p-xl border border-surface-container-highest">
          <div className="text-center mb-lg">
            <div className="flex items-center justify-center gap-xs mb-md">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
              <span className="font-h4 text-h4 text-on-surface">EduFlow</span>
            </div>
            <h1 className="font-h3 text-h3 text-on-surface mb-xs">Welcome Back</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Log in to continue your learning journey.
            </p>
          </div>

          {error && (
            <div className="mb-md bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-md" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-xs">
              <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="email">
                Email
              </label>
              <input
                {...register('email')}
                className={`w-full h-12 px-md bg-surface-container-lowest border ${
                  errors.email ? 'border-error' : 'border-outline-variant'
                } rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors shadow-sm disabled:opacity-70`}
                id="email"
                name="email"
                placeholder="name@company.com"
                type="email"
                disabled={isPending}
              />
              {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
            </div>

            <div className="space-y-xs">
              <div className="flex items-center justify-between">
                <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="password">
                  Password
                </label>
                <Link
                  className="font-label-sm text-label-sm text-primary hover:text-secondary transition-colors"
                  href="#"
                >
                  Forgot?
                </Link>
              </div>
              <input
                {...register('password')}
                className={`w-full h-12 px-md bg-surface-container-lowest border ${
                  errors.password ? 'border-error' : 'border-outline-variant'
                } rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors shadow-sm disabled:opacity-70`}
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                disabled={isPending}
              />
              {errors.password && <span className="text-error text-xs">{errors.password.message}</span>}
            </div>

            <button
              className="btn-primary w-full h-12 mt-md text-label-md"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          <div className="my-lg flex items-center">
            <div className="flex-grow border-t border-surface-container-highest"></div>
            <span className="px-md font-body-sm text-body-sm text-outline">or continue with</span>
            <div className="flex-grow border-t border-surface-container-highest"></div>
          </div>

          <div className="space-y-sm">
            <button
              className="btn-ghost w-full h-12 text-label-md"
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
            <button
              className="w-full h-12 bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg font-label-md text-label-md flex items-center justify-center gap-sm hover:bg-surface-container-low transition-colors shadow-sm"
              type="button"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1C5.92 1 1 5.92 1 12a11 11 0 0 0 7.51 10.44c.55.1.75-.23.75-.52v-1.82c-3.06.67-3.7-1.48-3.7-1.48-.5-1.28-1.22-1.62-1.22-1.62-1-.68.08-.67.08-.67 1.11.08 1.7 1.14 1.7 1.14.99 1.7 2.6 1.2 3.23.91.1-.71.39-1.2.7-1.48-2.44-.28-5-1.22-5-5.45 0-1.2.43-2.18 1.14-2.95-.11-.28-.5-1.43.11-2.97 0 0 .93-.3 3.06 1.12a10.6 10.6 0 0 1 5.57 0c2.13-1.42 3.06-1.12 3.06-1.12.61 1.54.22 2.69.11 2.97.71.77 1.14 1.75 1.14 2.95 0 4.24-2.56 5.16-5.01 5.44.4.34.75 1.01.75 2.05v3.03c0 .29.2.63.76.52A11 11 0 0 0 23 12c0-6.08-4.92-11-11-11z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          <p className="mt-lg text-center font-body-sm text-body-sm text-on-surface-variant">
            Don&apos;t have an account?{' '}
            <Link
              className="font-label-sm text-label-sm text-primary hover:text-secondary transition-colors"
              href="/register"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
