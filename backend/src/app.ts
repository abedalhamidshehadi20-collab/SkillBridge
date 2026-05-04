import type { FastifyInstance } from 'fastify';
import { corsPlugin } from './plugins/cors';
import { supabasePlugin } from './plugins/supabase';
import { errorHandlerPlugin } from './plugins/error-handler';
import { healthRoutes } from './routes/health.routes';
import { matchRoutes } from './routes/match.routes';

export async function buildApp(server: FastifyInstance) {
  // --- Plugins ---
  await server.register(corsPlugin);
  await server.register(supabasePlugin);
  await server.register(errorHandlerPlugin);

  // --- Routes ---
  await server.register(healthRoutes, { prefix: '/api' });
  await server.register(matchRoutes, { prefix: '/api/v1' });

  return server;
}
