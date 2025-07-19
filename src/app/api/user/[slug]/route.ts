// import { prisma } from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function GET(
//   req: NextResponse,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     const { slug } = params;

//     const profile = await prisma.profile.findUnique({
//       where: {
//         slug,
//       },
//       include: {
//         links: true,
//       },
//     });

//     if (!profile) {
//       return NextResponse.json(
//         { messgae: 'Profile not found' },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         profile,
//       },
//       {
//         status: 201,
//       }
//     );
//   } catch (error: any) {
//     console.error('Slug error');
//     return NextResponse.json({ message: 'Server Error' }, { status: 500 });
//   }
// }
