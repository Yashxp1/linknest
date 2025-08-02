import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
)  {
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
  } catch (error) {
    console.error('Slug error', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

// export async function GET() {
//   try {
//     const session = await auth();

//     if (!session || !session.user?.email) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 500 });
//     }

//     const visibleLinks = await prisma.link.findMany({
//       where: {
//         userId: session?.user.id,
//         visible: true,
//       },
//       orderBy: { createdAt: 'desc' },
//       select: {
//         id: true,
//         title: true,
//         url: true,
//         order: true,
//         createdAt: true,
//         updatedAt: true,
//         userId: true,
//       },
//     });

//     if (!visibleLinks) {
//       return NextResponse.json({ message: 'Links not found' }, { status: 404 });
//     }
//     return NextResponse.json({ success: true,res: visibleLinks }, { status: 201 });
//   } catch (error) {
//     console.error('Error fetching visible links');
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }
