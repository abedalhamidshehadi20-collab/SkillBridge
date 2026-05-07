'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'error' | 'idle'>('idle');
  const [message, setMessage] = useState('Open the confirmation link from your email to verify your account.');

  // Resend state
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendEmail, setResendEmail] = useState('');

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
    if (resendCooldown > 0 || !resendEmail) return;
    setResendStatus('sending');
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: resendEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
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
  }, [resendCooldown, resendEmail]);

  useEffect(() => {
    const email = searchParams.get('email');
    const errorMsg = searchParams.get('error');

    if (email) {
      setResendEmail(email);
    }

    if (errorMsg) {
      // Came from /auth/callback after a failed code exchange
      setStatus('error');
      setMessage(errorMsg);
    } else {
      // Default: user arrived here from the register "check your email" screen
      setStatus('idle');
      setMessage('Open the confirmation link from your email to verify your account.');
    }
  }, [searchParams]);


  const iconMap = {
    error: 'error',
    idle: 'mark_email_unread',
  };

  const titleMap = {
    error: 'Verification failed',
    idle: 'Confirm your email',
  };

  const iconContainerClass = {
    error: 'bg-error-container',
    idle: 'bg-primary-container',
  };

  const iconClass = {
    error: 'text-on-error-container',
    idle: 'text-on-primary-container',
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-md sm:p-lg antialiased">
      {/* Subtle background pattern */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, var(--color-primary) 1px, transparent 1px), radial-gradient(circle at 75% 75%, var(--color-secondary) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <main className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl border border-surface-variant shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-lg sm:p-xl text-center relative z-10">
        {/* Status icon */}
        <div
          className={`w-20 h-20 ${iconContainerClass[status]} rounded-full flex items-center justify-center mx-auto mb-md shadow-sm transition-all duration-500`}
          style={{ animation: 'pop-in 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards' }}
        >
          <span
            className={`material-symbols-outlined ${iconClass[status]} text-4xl transition-all duration-300`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {iconMap[status]}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-h2 text-h2 text-on-background mb-xs transition-all duration-300">
          {titleMap[status]}
        </h1>

        {/* Message */}
        <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
          {message}
        </p>


        {/* Error & Idle — action buttons with inline resend */}
        {(status === 'error' || status === 'idle') && (
          <div className="flex flex-col gap-sm">
            {/* Resend email input (when no email is known) */}
            {!resendEmail && (
              <div className="flex flex-col gap-xs mb-xs">
                <label className="font-label-sm text-[13px] text-on-surface text-left ml-1" htmlFor="resend-email">
                  Enter your email to resend
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-xl">
                    mail
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    id="resend-email"
                    placeholder="your@email.com"
                    type="email"
                    onChange={(e) => setResendEmail(e.target.value)}
                    value={resendEmail}
                  />
                </div>
              </div>
            )}

            {/* Resend button */}
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0 || resendStatus === 'sending' || !resendEmail}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#4f46e5] text-white font-label-md text-label-md hover:bg-[#4338ca] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
                Failed to resend. Please try again.
              </p>
            )}

            <Link
              href="/login"
              className="btn-ghost h-12 w-full"
            >
              <span className="material-symbols-outlined text-lg mr-2">arrow_back</span>
              Back to login
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

