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

    const body = await req.json();
    const validatedData = linkSchema.parse(body);

    const latestOrder = await prisma.link.count({
      where: { profileId: validatedData.profileId },
    });

    const link = await prisma.link.create({
      data: {
        title: validatedData.title,
        url: validatedData.url,
        profileId: validatedData.profileId,
        order: latestOrder + 1,
      },
    });

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
