import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// API Route Handler - params is a Promise
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }

    const profile = await prisma.user.findUnique({
      where: {
        slug,
      },
      include: {
        links: {
          where: {
            visible: true,
          },
        },
      },
    });

    if (!profile) {
      return NextResponse.json(
        { message: 'Profile not found' }, // Fixed typo: "messgae" -> "message"
        { status: 404 } // Changed from 500 to 404 for "not found"
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
  } catch (error) {
    console.error('Slug error', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}