import { generateToken, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { signupSchema } from '@/schemas/authSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validate = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: {
        username: validate.username,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 409 }
      );
    }

    const hashed = await hashPassword(validate.password);

    const user = await prisma.user.create({
      data: {
        name: validate.name,
        username: validate.username,
        password: hashed,
      },
    });

    const token = generateToken({ userId: user.id, username: user.username });

    const res = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          username: user.username,
        },
      },
      { status: 201 }
    );

    res.cookies.set({
      name: 'session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });
    return res;
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
