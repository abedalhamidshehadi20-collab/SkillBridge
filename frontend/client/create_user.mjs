import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://powkhbcizthqtilwgikf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvd2toYmNpenRocXRpbHdnaWtmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzg3NjMyNCwiZXhwIjoyMDkzNDUyMzI0fQ.D-XjnjuYmSbmNJGszRt_siWC_Zvf7aiBgZCLdwo3AB8';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  const email = 'alex@skillbridge.test';
  const password = 'Password123!';
  const firstName = 'Alex';
  const lastName = 'Test';

  console.log(`Creating user: ${email}...`);

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      first_name: firstName,
      last_name: lastName
    }
  });

  if (authError) {
    console.error('Error creating user:', authError);
    return;
  }

  const userId = authData.user.id;
  console.log('User created with ID:', userId);

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
  
  if (!profile) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        role: 'Frontend Developer',
        can_teach: ['React', 'TypeScript', 'Tailwind CSS'],
        wants_to_learn: ['Node.js', 'PostgreSQL', 'Figma']
      });

      if (profileError) {
        console.error('Error creating profile:', profileError);
      } else {
        console.log('Profile created successfully!');
      }
  } else {
      console.log('Profile already exists via database trigger.');
      await supabase.from('profiles').update({
        role: 'Frontend Developer',
        can_teach: ['React', 'TypeScript', 'Tailwind CSS'],
        wants_to_learn: ['Node.js', 'PostgreSQL', 'Figma']
      }).eq('id', userId);
      console.log('Profile updated with mock skills.');
  }

  console.log('\n--- SUCCESS ---');
  console.log('Email:', email);
  console.log('Password:', password);
}

main();
