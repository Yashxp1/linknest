import { profile } from 'console';
import { z } from 'zod';

const urlRegex =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

export const linkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Too long'),
  url: z
    .string()
    .min(1, 'URL is required')
    .regex(urlRegex, 'Invalid URL format'),
    // profileId: z.string().cuid('Invalid Profile ID'),
});
