import { z } from 'zod';

export const profileSchema = z.object({
  bio: z.string().min(1).max(160).trim(),
  location: z.string().max(30).trim().optional(),
  image: z.string().optional(),
});
