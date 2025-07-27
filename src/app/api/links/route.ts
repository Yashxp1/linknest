import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { linkSchema } from '@/schemas/linkSchema';
import { deleteSchema, linkUpdateSchema } from '@/schemas/linkSchema';
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
    const result = linkSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const validatedData = result.data;

    const latestOrder = await prisma.link.count({
      where: { userId: user?.id },
    });

    // const user = await prisma.user.findUnique({where: {
    //   id: user?.id
    // }})

    // if(!user) {
    //   return NextResponse.json({})
    // }

    const link = await prisma.link.create({
      data: {
        title: validatedData.title,
        url: validatedData.url,
        userId: user.id,
        // userId: validatedData.userId,
        order: latestOrder + 1,
      },
    });
    console.log(link);
    return NextResponse.json({ success: true, link }, { status: 200 });
  } catch (error: any) {
    console.error(error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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

    const links = await prisma.link.findMany({
      where: { userId: user.id },
      // orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        title: true,
        url: true,
        order: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });
    // const links = await prisma.link.findMany({
    //   where: { userId: user.id, visible: true },
    //   orderBy: { createdAt: 'desc' },
    //   select: {
    //     id: true,
    //     title: true,
    //     url: true,
    //     order: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     userId: true,
    //   },
    // });

    if (!links) {
      return NextResponse.json({ message: 'Links not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, res: links }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
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
    const result = linkUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const validatedData = result.data;

    const updatedLink = await prisma.link.update({
      where: { id: validatedData.linkId, userId: user.id },
      data: {
        title: validatedData.title,
        url: validatedData.url,
      },
    });

    return NextResponse.json(
      { success: 'true', res: updatedLink },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
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
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    console.log('DELETE request body:', body);
    const result = deleteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: result.error },
        { status: 400 }
      );
    }

    const { linkId } = result.data;

    const existinfLink = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: user.id,
      },
    });

    if (!existinfLink) {
      return NextResponse.json(
        {
          message: 'Link not found',
        },
        { status: 404 }
      );
    }

    const deletedLink = await prisma.link.delete({
      where: {
        id: linkId,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, deletedLink });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Server Error' },
      { status: 500 }
    );
  }
}
