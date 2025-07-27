import { auth } from '@/auth';
import { generateSlug } from '@/lib/GenerateSlug';
import { prisma } from '@/lib/prisma';
import { profileSchema } from '@/schemas/profileSchema';
import { NextRequest, NextResponse } from 'next/server';

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
        links: {
          where: {
            visible: true,
          },
          orderBy: { order: 'asc' },
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
  } catch (error: any) {
    console.error('Slug error');
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
