import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const errorHandlerPlugin = fp(async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      const statusCode = error.statusCode || 500;

      request.log.error({
        err: error,
        url: request.url,
        method: request.method,
      });

      reply.status(statusCode).send({
        success: false,
        error: {
          message:
            statusCode >= 500 && process.env.NODE_ENV === 'production'
              ? 'Internal Server Error'
              : error.message,
          code: error.code || 'INTERNAL_ERROR',
          statusCode,
        },
      });
    }
  );
});
