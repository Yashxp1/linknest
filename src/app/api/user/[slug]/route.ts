import { auth } from '@/auth';
import { generateSlug } from '@/lib/GenerateSlug';
import { prisma } from '@/lib/prisma';
import { profileSchema } from '@/schemas/profileSchema';
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
    const result = profileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: 'Invalid Input' }, { status: 401 });
    }

    const validatedData = result.data;

    // const slug = generateSlug(
    //   session.user.name || session.user.email || user.id
    // );

    // console.log('SLUG --> ', slug);

    const profile = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        bio: validatedData.bio,
        location: validatedData.location,
        image: validatedData.image,
        // slug: slug,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, profile }, { status: 200 });
  } catch (error) {
    console.log('profile error');
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // const slug = req.nextUrl.pathname.split('/').pop();

    const { slug } = await params;

    // console.log('Requested SLUG => ', slug);

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 404 }
      );
    }



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
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Slug error');
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
