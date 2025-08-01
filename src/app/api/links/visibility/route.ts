import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 500 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // const {orderedLinkIds} = req.json()

    const { linkId, visible } = await req.json();

    await prisma.link.update({
      where: { id: linkId, userId: user.id },
      data: { visible },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('visibilty error', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 500 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    
    if (!user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const visibleLinks = await prisma.link.findMany({
      where: {
        userId: session?.user.id,
        visible: true,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        url: true,
        order: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        visible: true,
      },
    });

    if (!visibleLinks) {
      return NextResponse.json({ message: 'Links not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true,res: visibleLinks }, { status: 201 });
  } catch (error) {
    console.error('Error fetching visible links');
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
