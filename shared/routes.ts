import { z } from 'zod';
import { insertPostSchema, insertSubscriberSchema, posts } from './schema';

export const api = {
  posts: {
    list: {
      method: 'GET' as const,
      path: '/api/posts' as const,
      responses: {
        200: z.array(z.custom<typeof posts.$inferSelect>()),
      },
    },
    getBySlug: {
      method: 'GET' as const,
      path: '/api/posts/:slug' as const,
      responses: {
        200: z.custom<typeof posts.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
    getByUsername: {
      method: 'GET' as const,
      path: '/api/authors/:username/posts' as const,
      responses: {
        200: z.array(z.custom<typeof posts.$inferSelect>()),
      },
    },
  },
  newsletter: {
    subscribe: {
      method: 'POST' as const,
      path: '/api/newsletter/subscribe' as const,
      input: insertSubscriberSchema,
      responses: {
        200: z.object({ message: z.string() }),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
