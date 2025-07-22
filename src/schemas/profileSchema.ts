import { z } from 'zod';

export const profileSchema = z.object({
  userId: z.string(),
  bio: z.string().max(160).optional(),
  location: z.string().max(30).optional(),
  slug: z.string().min(1, 'Slug is required'),
  // profilePic: z.string().optional(),
});
