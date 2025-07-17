import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { linkSchema } from '@/schemas/linkSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: { profiles: true },
    });

    if (!user || !user.profiles || user.profiles.length === 0) {
      return NextResponse.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }

    const profile = user.profiles[0];

    const body = await req.json();
    const result = linkSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const validatedData = result.data;

    const latestOrder = await prisma.link.count({
      where: { profileId: profile.id },
    });

    const link = await prisma.link.create({
      data: {
        title: validatedData.title,
        url: validatedData.url,
        profileId: profile.id,
        order: latestOrder + 1,
      },
    });
    // console.log(link)
    return NextResponse.json({ success: true, link }, { status: 200 });
  } catch (error: any) {
    console.error(error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: 'Server Error' }, { status: 500 });
  }
}
