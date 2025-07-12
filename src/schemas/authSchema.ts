import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must contain at least 3 letters')
    .regex(/^[A-Za-z\s]+$/, 'Name must only contain letters and spaces'),

  username: z
    .string()
    .min(3, 'Username must contain at least 2 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must include at least one special character'
    ),
});

export const signinSchema = z.object({
  username: z
    .string()
    .min(3, 'Name must contain at least 3 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  password: z.string().min(3, 'Password must include at least one special character'),
});
