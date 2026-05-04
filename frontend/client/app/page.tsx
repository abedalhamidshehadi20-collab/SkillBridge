import { redirect } from 'next/navigation';

export default function Home() {
  // Since we haven't built a public landing page yet, 
  // redirect users to the authentication flow.
  redirect('/login');
}
