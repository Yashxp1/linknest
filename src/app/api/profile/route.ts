import { verifyToken } from '@/auth';
import { prisma } from '@/lib/prisma';
import { cardSchema } from '@/schemas/profileSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('session')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();

    const decoded = verifyToken(token);

    // console.log(decoded?.id);

    if (!decoded || !decoded.id) {
      return NextResponse.json({
        error: 'Invalid token',
        status: 401,
      });
    }

    const validatedData = cardSchema.parse(body);

    const slug =
      validatedData.slug ??
      validatedData.title.toLowerCase().replace(/\s+/g, '-');

    const profile = await prisma.profile.create({
      data: {
        userId: decoded.id,
        title: validatedData.title,
        bio: validatedData.bio,
        profilePic: validatedData.profilePic,
        slug: slug,
      },
    });

    return NextResponse.json({
      success: true,
      profile: {
        id: decoded.id,
        title: validatedData.title,
        profilePic: profile.profilePic,
        slug: profile.slug,
        bio: profile.bio,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    });
  } catch (error: any) {
    console.error('Error profile -->', error.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('session')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const ProfileData = await prisma.profile.findMany({
      where: { userId: decoded.id },
      include: {
        links: true,
      },
    });

    return NextResponse.json({ ProfileData }, { status: 201 });
  } catch (error: any) {
    console.error('Error in profile --->', error.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
