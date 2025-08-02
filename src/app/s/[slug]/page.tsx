import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // In Next.js 15+, params is a Promise even in page components

  const link = await prisma.shortURL.findUnique({
    where: {
      slug,
    },
  });

  if (!link) {
    notFound(); // Better UX than returning JSX - shows proper 404 page
  }

  redirect(link.url);
}