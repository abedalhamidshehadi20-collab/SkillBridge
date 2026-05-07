import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Supabase Auth Callback Route
 *
 * Supabase email confirmation links (and OAuth redirects) land here with a
 * `code` query param. This handler exchanges that code for a session via
 * PKCE, sets the session cookie, then redirects to `next` (default: /dashboard).
 *
 * Without this route, the `code` param is ignored and the user lands on the
 * home page still unauthenticated.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to `next`, preserving the origin for absolute safety
      const redirectUrl = new URL(next, origin);
      return NextResponse.redirect(redirectUrl.toString());
    }

    // Code exchange failed — send to confirm-email with an error flag
    const errorUrl = new URL('/confirm-email', origin);
    errorUrl.searchParams.set('error', error.message);
    return NextResponse.redirect(errorUrl.toString());
  }

  // No code present — redirect to confirm-email idle state
  return NextResponse.redirect(new URL('/confirm-email', origin));
}
