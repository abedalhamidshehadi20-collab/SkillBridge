'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ConfirmEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'idle'>('verifying');
  const [message, setMessage] = useState('Verifying your email link...');

  useEffect(() => {
    const verify = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');

      if (!token_hash || !type) {
        setStatus('idle');
        setMessage('Open the confirmation link from your email to verify your account.');
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as 'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change' | 'email',
      });

      if (error) {
        setStatus('error');
        setMessage(error.message);
        return;
      }

      setStatus('success');
      setMessage('Email confirmed successfully. Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 1500);
    };

    void verify();
  }, [router, searchParams]);

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-md sm:p-lg antialiased">
      <main className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl border border-surface-variant shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-lg sm:p-xl text-center">
        <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-md shadow-sm">
          <span className="material-symbols-outlined text-on-primary-container text-3xl">
            {status === 'error' ? 'error' : status === 'success' ? 'check' : 'mark_email_read'}
          </span>
        </div>

        <h1 className="font-h2 text-h2 text-on-background mb-xs">
          {status === 'error' ? 'Verification failed' : status === 'success' ? 'Email confirmed' : 'Confirm your email'}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-lg">{message}</p>

        {(status === 'error' || status === 'idle') && (
          <div className="flex flex-col gap-sm">
            <Link
              href="/resend-confirmation"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity"
            >
              Resend confirmation email
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
            >
              Back to login
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
