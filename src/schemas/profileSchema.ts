import { z } from 'zod';

export const cardSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  bio: z.string().max(160).optional(),
  slug: z.string().min(1, 'Slug is required'),
});
