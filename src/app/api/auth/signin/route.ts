import { comparePassword, generateToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { signinSchema } from '@/schemas/authSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validate = signinSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        username: validate.username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(
      validate.password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken({ id: user.id, username: user.username });

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          username: user.username,
        },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: 'session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
