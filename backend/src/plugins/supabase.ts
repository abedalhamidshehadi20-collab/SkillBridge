import fp from 'fastify-plugin';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    supabase: SupabaseClient;
  }
}

export const supabasePlugin = fp(async (fastify: FastifyInstance) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or Service Role Key in environment variables.');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  fastify.decorate('supabase', supabase);
  fastify.log.info('Supabase client initialized (Service Role)');
});
