'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas/authSchema';
import { prisma } from '@/lib/prisma';
import { AuthError } from 'next-auth';
import { signIn } from '../auth';

export const login = async (data: z.infer<typeof LoginSchema>) => {
  try {
    const validateData = LoginSchema.parse(data);

    if (!validateData) {
      return { Data: 'Invalid input fields' };
    }

    const { email, password } = validateData;

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExists || !userExists.password || !userExists.email) {
      return { error: 'email or password is incorrect' };
    }

    await signIn('credentials', {
      email: userExists.email,
      password: password,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Please confirm your email address' };
      }
    }

    throw error;
  }
  return { success: 'User logged in successfully' };
};
