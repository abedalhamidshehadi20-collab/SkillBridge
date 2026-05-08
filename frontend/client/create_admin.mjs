import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://powkhbcizthqtilwgikf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvd2toYmNpenRocXRpbHdnaWtmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzg3NjMyNCwiZXhwIjoyMDkzNDUyMzI0fQ.D-XjnjuYmSbmNJGszRt_siWC_Zvf7aiBgZCLdwo3AB8';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  const email = 'abedalhamid@admin.com';
  const password = 'abed.208';
  const firstName = 'Abedalhamid';
  const lastName = 'Shehadi';

  console.log(`Creating admin user: ${email}...`);

  // Check if user already exists
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existing = existingUsers?.users?.find(u => u.email === email);

  let userId;

  if (existing) {
    console.log('User already exists, updating...');
    userId = existing.id;

    // Update password and metadata
    await supabase.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        is_admin: true,
      },
    });
    console.log('Auth user updated.');
  } else {
    // Create the user with admin metadata
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        is_admin: true,
      },
    });

    if (authError) {
      console.error('Error creating user:', authError);
      return;
    }

    userId = authData.user.id;
    console.log('User created with ID:', userId);
  }

  // Upsert profile with admin role
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: userId,
    first_name: firstName,
    last_name: lastName,
    role: 'admin',
  }, { onConflict: 'id' });

  if (profileError) {
    console.error('Error upserting profile:', profileError);
  } else {
    console.log('Profile set with role: admin');
  }

  console.log('\n--- SUCCESS ---');
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Role: admin');
}

main();
