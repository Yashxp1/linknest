import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { url, customSlug } = body;

    if (!url) {
      return NextResponse.json({ mesage: 'URL NOT FOUND' }, { status: 404 });
    }

    const slug = customSlug || nanoid(6);

    const exitst = await prisma.shortURL.findUnique({
      where: {
        slug,
      },
    });

    if (exitst) {
      return NextResponse.json(
        { mesage: 'URL already exists' },
        { status: 401 }
      );
    }

    const shortenURL = await prisma.shortURL.create({
      data: { slug, url },
    });

    return NextResponse.json(
      { data: shortenURL, shortUrl: `${req.nextUrl.origin}/s/${slug}` },
      { status: 200 }
    );
  } catch (error) {
    console.error('url-shortener error', error);
    return NextResponse.json({ message: 'Sever Error' }, { status: 500 });
  }
}
