import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    // console.log('📦 Body:', body);

    const { orderedLinkIds } = body;

    if (!Array.isArray(orderedLinkIds)) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    await Promise.all(
      orderedLinkIds.map((id, index) =>
        prisma.link.update({
          where: {
            id,
            userId: session.user.id,
          },
          data: {
            order: index,
          },
        })
      )
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('🔥 Drag and drop error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
