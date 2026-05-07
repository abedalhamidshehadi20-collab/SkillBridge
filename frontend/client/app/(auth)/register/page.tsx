'use client';

import { createClient } from '@/lib/supabase/client';
import { useState, useTransition, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const registerSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>('');
  const [screenReaderOptimized, setScreenReaderOptimized] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Resend state
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleResend = useCallback(async () => {
    if (resendCooldown > 0 || !registeredEmail) return;
    setResendStatus('sending');
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: registeredEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm-email`,
        },
      });
      if (error) {
        setResendStatus('error');
        setTimeout(() => setResendStatus('idle'), 3000);
      } else {
        setResendStatus('sent');
        setResendCooldown(60);
        setTimeout(() => setResendStatus('idle'), 3000);
      }
    } catch {
      setResendStatus('error');
      setTimeout(() => setResendStatus('idle'), 3000);
    }
  }, [resendCooldown, registeredEmail]);

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
      const parts = data.fullName.trim().split(/\s+/);
      const firstName = parts[0] ?? data.fullName.trim();
      const lastName = parts.slice(1).join(' ');

      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm-email`,
          data: {
            first_name: firstName,
            last_name: lastName,
            optimize_screen_readers: screenReaderOptimized,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setRegisteredEmail(data.email);
        setSuccess(true);
      }
    });
  };

  if (success) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center p-md sm:p-lg antialiased">
        {/* Subtle dot pattern */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, var(--color-primary) 1px, transparent 1px), radial-gradient(circle at 75% 75%, var(--color-secondary) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div
          className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl border border-surface-variant shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-lg sm:p-xl text-center relative z-10"
          style={{ animation: 'fade-slide-up 0.5s ease-out forwards' }}
        >
          {/* Animated mail icon */}
          <div
            className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-md shadow-sm"
            style={{ animation: 'pop-in 0.6s cubic-bezier(0.175,0.885,0.32,1.275) forwards' }}
          >
            <span
              className="material-symbols-outlined text-on-primary-container text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              mark_email_unread
            </span>
          </div>

          <h1 className="font-h2 text-h2 text-on-background mb-xs">Check your email</h1>
          <p className="font-body-md text-body-md text-secondary mb-sm">
            We sent a confirmation link to{' '}
            <span className="font-semibold text-on-surface">{registeredEmail}</span>
          </p>

          {/* Steps to complete */}
          <div className="bg-surface-container rounded-lg border border-surface-variant p-md mb-lg text-left">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-on-primary-container text-xs font-bold">1</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface">
                Open your email inbox for <span className="font-medium">{registeredEmail}</span>
              </p>
            </div>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-on-primary-container text-xs font-bold">2</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface">
                Click the confirmation link in the email
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-on-primary-container text-xs font-bold">3</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface">
                You&apos;ll be redirected to your dashboard
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-sm">
            {/* Resend button */}
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0 || resendStatus === 'sending'}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-on-primary font-label-md text-label-md hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {resendStatus === 'sending' ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  Sending...
                </>
              ) : resendStatus === 'sent' ? (
                <>
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Email sent!
                </>
              ) : resendCooldown > 0 ? (
                <>
                  <span className="material-symbols-outlined text-lg">timer</span>
                  Resend in {resendCooldown}s
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">send</span>
                  Resend confirmation email
                </>
              )}
            </button>

            {resendStatus === 'error' && (
              <p className="text-error text-xs text-center">
                Failed to resend email. Please try again.
              </p>
            )}

            <Link
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
              href="/login"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to login
            </Link>
          </div>

          {/* Tip */}
          <p className="font-body-sm text-body-sm text-outline mt-md">
            Didn&apos;t receive the email? Check your spam folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-md sm:p-lg antialiased">
      <main className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl border border-surface-variant shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="p-lg sm:p-xl flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-lg w-full">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mb-sm shadow-sm">
              <span
                className="material-symbols-outlined text-on-primary-container text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                sign_language
              </span>
            </div>
            <h1 className="font-h2 text-h2 text-on-background mb-xs">Join the Bridge</h1>
            <p className="font-body-md text-body-md text-secondary">
              Start learning AI-assisted sign language today.
            </p>
          </div>

          {error && (
            <div className="w-full mb-md bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="w-full space-y-sm mb-md">
            <button
              className="w-full flex items-center justify-center gap-sm px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors duration-200"
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
              <span className="font-label-md text-[16px] text-on-surface">Continue with Google</span>
            </button>
            <button
              className="w-full flex items-center justify-center gap-sm px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors duration-200"
              type="button"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">ios</span>
              <span className="font-label-md text-[16px] text-on-surface">Continue with Apple</span>
            </button>
          </div>

          <div className="w-full flex items-center gap-4 mb-md">
            <div className="h-px bg-outline-variant flex-1" />
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Or</span>
            <div className="h-px bg-outline-variant flex-1" />
          </div>

          <form className="w-full space-y-md" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-[13px] text-on-surface ml-1" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-xl">
                  person
                </span>
                <input
                  {...register('fullName')}
                  className={`w-full pl-10 pr-4 py-3 bg-surface border ${
                    errors.fullName ? 'border-error' : 'border-outline-variant'
                  } rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                  id="fullName"
                  placeholder="Jane Doe"
                  type="text"
                  disabled={isPending}
                />
              </div>
              {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-[13px] text-on-surface ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-xl">
                  mail
                </span>
                <input
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-3 bg-surface border ${
                    errors.email ? 'border-error' : 'border-outline-variant'
                  } rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                  id="email"
                  placeholder="jane@example.com"
                  type="email"
                  disabled={isPending}
                />
              </div>
              {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-[13px] text-on-surface ml-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-xl">
                  lock
                </span>
                <input
                  {...register('password')}
                  className={`w-full pl-10 pr-4 py-3 bg-surface border ${
                    errors.password ? 'border-error' : 'border-outline-variant'
                  } rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  disabled={isPending}
                />
              </div>
              {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-container rounded-lg border border-surface-variant mt-sm">
              <div className="flex flex-col pr-md">
                <span className="font-label-sm text-[13px] text-on-surface">Optimize for Screen Readers</span>
                <span className="font-body-sm text-body-sm text-secondary">
                  Enhances semantic layout and aria tags.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  className="sr-only peer"
                  type="checkbox"
                  checked={screenReaderOptimized}
                  onChange={(event) => setScreenReaderOptimized(event.target.checked)}
                />
                <div className="w-11 h-6 bg-secondary-fixed-dim peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            <button
              className="w-full py-4 bg-primary text-on-primary rounded-lg font-label-md text-[16px] shadow-md hover:bg-surface-tint hover:shadow-lg transition-all duration-200 mt-md flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Creating Account...' : 'Create Account'}
              {!isPending && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
            </button>
          </form>

          <div className="mt-lg text-center">
            <p className="font-body-md text-body-md text-secondary">
              Already have an account?{' '}
              <Link
                className="font-label-sm text-[14px] text-primary hover:text-surface-tint hover:underline transition-colors"
                href="/login"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
