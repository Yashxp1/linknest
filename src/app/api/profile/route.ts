import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { profileSchema } from '@/schemas/profileSchema';
import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

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

    // const validatedData = result.data;
    const { image, name, location, bio } = result.data;

    let imageURL = '';

    if (image && !image.includes('res.cloudinary.com')) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: 'profiles',
        upload_preset: 'your_unsigned_preset_if_any',
      });
      imageURL = uploadResult.secure_url;
    } else {
      imageURL = image || '';
    }

    const profile = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: name,
        bio: bio,
        location: location,
        image: imageURL,
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
