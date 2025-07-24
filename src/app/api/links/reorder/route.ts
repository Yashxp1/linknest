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

    const { orderedLinkIds } = await req.json();

    await Promise.all(
      orderedLinkIds.map((id: string, index: number) =>
        prisma.link.update({
          where: { id, userId: user.id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true }, { status: 500 });
  } catch (error) {
    console.error('Drag and drop error', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
