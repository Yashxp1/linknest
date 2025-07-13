import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { linkSchema } from '@/schemas/linkSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('session')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validate = linkSchema.parse(body);

    const profile = await prisma.profile.findFirst({
      where: {
        userId: decoded.id,
      },
    });

    if (!profile) {
      return NextResponse.json({ message: 'User not found' }, { status: 500 });
    }

    const existingLinks = await prisma.link.findMany({
      where: {
        profileId: profile.id,
      },
      orderBy: {
        order: 'desc',
      },
      take: 1,
    });

    const nextOrder = existingLinks.length > 0 ? existingLinks[0].order + 1 : 0;

    const createLink = await prisma.link.create({
      data: {
        title: validate.title,
        url: validate.url,
        profileId: profile.id,
        order: nextOrder,
      },
    });

    return NextResponse.json({
      message: 'Link created successfully',
      link: createLink,
    });
    
  } catch (error: any) {
    console.error('Link error ---> ', error.message);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
