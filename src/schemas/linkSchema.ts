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
  // userId: z.string(),
});

export const bioSchema = z.object({
  bio: z.string().optional(),
  location: z.string().optional(),
});

export const linkUpdateSchema = z.object({
  linkId: z.string(),
  title: z.string(),
  url: z.string(),
});

export const deleteSchema = z.object({
  linkId: z.string(),
});
