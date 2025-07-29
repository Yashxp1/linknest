import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { url } = body;

    if (!url) {
      return NextResponse.json({ message: 'URL NOT FOUND' }, { status: 400 });
    }

    let slug = nanoid(6);
    let exists = await prisma.shortURL.findUnique({
      where: { slug },
    });

    while (exists) {
      slug = nanoid(6);
      exists = await prisma.shortURL.findUnique({
        where: { slug },
      });
    }

    const shortenURL = await prisma.shortURL.create({
      data: { slug, url },
    });

    return NextResponse.json(
      {
        data: shortenURL,
        shortURL: `${req.nextUrl.origin}/s/${slug}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('url-shortener error', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
