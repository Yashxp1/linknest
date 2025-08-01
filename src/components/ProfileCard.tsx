'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { Mona_Sans } from 'next/font/google';
import { userProfileStore } from '@/store/profileStore';
import { useSession } from 'next-auth/react';
import { userLinkStore } from '@/store/linkStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const MonaSansfont = Mona_Sans({
  subsets: ['latin'],
  weight: '400',
});

const ProfileCard = () => {
  const { data: session } = useSession();

  const profile = userProfileStore((state) => state.profile);
  const getProfile = userProfileStore((state) => state.getProfile);
  const slug = profile?.slug;

  const { visibilityLoading } = userLinkStore();
  const visibleLinks = userLinkStore((state) => state.visibleLinks);
  const getVisibleLink = userLinkStore((state) => state.getVisibleLink);

  useEffect(() => {
    if (slug && !profile) {
      getProfile(slug);
      getVisibleLink();
    }
  }, [slug, profile]);

  useEffect(() => {
    if (session?.user?.slug && !profile) {
      getProfile(session.user.slug);
      getVisibleLink();
    }
  }, [session?.user?.slug, profile]);

  return (
    <div
    className={`flex items-center justify-center h-full lg:h-screen px-4 ${MonaSansfont.className}`}
  >
  
      <div className="flex flex-col items-center justify-center px-2 pt-2 pb-6 rounded-4xl bg-gradient-to-br from-pink-300 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 shadow-sm shadow-purple-300 dark:shadow-none transition-all duration-300 backdrop-blur-sm">
        <div className="relative w-[21rem] aspect-square overflow-hidden rounded-4xl group">
          <Image
            src={profile?.image || '/goku.jpg'}
            alt="User Image"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="w-[21rem] mt-3">
          <div className="pl-5">
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text hover:from-blue-600 hover:to-purple-600 dark:from-white dark:to-gray-300 transition-all duration-300">
              {profile?.name || 'Name not set'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
              {profile?.bio || 'No bio available'}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
              {profile?.location || 'Location not set'}
            </p>
          </div>

          {visibleLinks.length === 0 && !visibilityLoading && (
            <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-4 mt-4 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No links found.
              </p>
            </div>
          )}

          {visibleLinks.map((link) => (
            <div
              key={link.id}
              className="flex justify-center items-center pt-2 text-sm"
            >
              <div className="flex flex-col gap-2 w-[90%] justify-center text-center items-center">
                <Button
                  asChild
                  variant="outline"
                  className="w-full font-semibold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Link href={link.url} target="_blank">
                    {link.title}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
