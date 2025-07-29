import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function RedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  const link = await prisma.shortURL.findUnique({
    where: {
      slug: await params.slug,
    },
  });

  if (!link) {
    return <h1>LINK NOT FOUND!</h1>;
  }

  redirect(link.url);
}
