import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { cardSchema } from '@/schemas/profileSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await auth();

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const validatedData = cardSchema.parse(body);

    // const slug =
    //   validatedData.slug ??
    //   validatedData.title.toLowerCase().replace(/\s+/g, '-');

    const profile = await prisma.profile.create({
      data: {
        userId: session.user.id,
        title: validatedData.title,
        bio: validatedData.bio,
        profilePic: validatedData.profilePic,
        slug: validatedData.slug,
      },
    });

    return NextResponse.json({ success: true, profile }, { status: 201 });
  } catch (error: any) {
    console.error('Error profile -->', error.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const ProfileData = await prisma.profile.findMany({
      where: { userId: session.user.id },
      include: {
        link: true,
      },
    });

    return NextResponse.json({ ProfileData }, { status: 200 });
  } catch (error: any) {
    console.error('Error in profile --->', error.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
