import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { bioSchema } from '@/schemas/linkSchema';
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
    });

    if (!user?.id) {
      return NextResponse.json({ message: 'Unathorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = bioSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const validatedData = result.data;

    const bioData = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        bio: validatedData.bio,
        location: validatedData.location,
        slug: validatedData.slug,
      },
    });

    return NextResponse.json({ success: true, bioData }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const profile = await prisma.user.findUnique({
      where: {
        slug,
      },
      include: {
        links: true,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { messgae: 'Profile not found' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        profile,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error('Slug error');
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
