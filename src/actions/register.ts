'use server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { RegisterSchema } from '@/schemas/authSchema';
import * as z from 'zod';
import { generateSlug } from '@/lib/GenerateSlug';
import { NextResponse } from 'next/server';

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validateData = RegisterSchema.parse(data);
    if (!validateData) {
      return { error: 'Invlaid input data' };
    }

    const { email, name, password, passwordConfirmation } = validateData;

    if (password !== passwordConfirmation) {
      return { error: 'Password do not match' };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return { error: 'Email already in use, Please try another one' };
    }

    const lowercaseEmail = email.toLowerCase();

    const slug = generateSlug(name || email);

    if (!slug) {
      return NextResponse.json({ message: 'Slug not found' }, { status: 404 });
    }

    // const user = await prisma.user.create({
    //   data: {
    //     email: lowercaseEmail,
    //     name,
    //     password: hashPassword,
    //     slug,
    //   },
    // });

    // const slug = generateSlug(user.id);

    return { success: `Email verification is sent on ${lowercaseEmail}` };
  } catch (error) {
    console.error(error);
  }
};
