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
    <div className="bg-background min-h-screen flex items-center justify-center p-md sm:p-gutter">
      <div className="w-full max-w-[420px] bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant p-lg sm:p-margin flex flex-col gap-lg">
        <div className="text-center flex flex-col gap-xs">
          <div className="font-h3 text-h3 text-primary flex items-center justify-center gap-xs">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              school
            </span>
            SkillBridge
          </div>
          <h1 className="font-h2 text-h2 text-on-surface mt-sm">Welcome back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Please enter your details to sign in.
          </p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-label-sm text-on-surface" htmlFor="email">
              Email
            </label>
            <input
              {...register('email')}
              className={`w-full bg-surface-container-lowest border ${
                errors.email ? 'border-error' : 'border-outline-variant'
              } rounded-lg px-md py-sm font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
              id="email"
              placeholder="Enter your email"
              type="email"
              disabled={isPending}
            />
            {errors.email && (
              <span className="text-error text-xs">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-label-sm text-on-surface" htmlFor="password">
              Password
            </label>
            <input
              {...register('password')}
              className={`w-full bg-surface-container-lowest border ${
                errors.password ? 'border-error' : 'border-outline-variant'
              } rounded-lg px-md py-sm font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
              id="password"
              placeholder="••••••••"
              type="password"
              disabled={isPending}
            />
            {errors.password && (
              <span className="text-error text-xs">{errors.password.message}</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-xs">
            <label className="flex items-center gap-xs cursor-pointer group">
              <div className="w-4 h-4 rounded border border-outline-variant bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-[12px] text-surface-container-lowest opacity-0 transition-opacity">
                  check
                </span>
              </div>
              <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                Remember me
              </span>
              <input className="hidden" type="checkbox" />
            </label>
            <Link
              className="font-label-sm text-label-sm text-primary hover:text-secondary transition-colors"
              href="#"
            >
              Forgot password?
            </Link>
          </div>
          <button
            className="w-full mt-sm bg-gradient-to-br from-primary to-secondary text-on-primary font-label-sm text-label-sm py-3 px-md rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] transition-all flex items-center justify-center gap-xs disabled:opacity-70 disabled:cursor-not-allowed"
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="relative flex items-center justify-center">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant"></div>
          </div>
          <div className="relative bg-surface-container-lowest px-md font-caption text-caption text-on-surface-variant">
            Or continue with
          </div>
        </div>
        <button
          className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-label-sm text-label-sm py-3 px-md rounded-lg flex items-center justify-center gap-sm hover:bg-surface-container hover:border-outline transition-all"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          Sign in with Google
        </button>
        <p className="text-center font-body-md text-body-md text-on-surface-variant">
          Don&apos;t have an account?{' '}
          <Link
            className="text-primary font-medium hover:text-secondary hover:underline transition-colors"
            href="/register"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
