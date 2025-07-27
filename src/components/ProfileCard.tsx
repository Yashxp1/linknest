'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Mona_Sans } from 'next/font/google';
import { userProfileStore } from '@/store/profileStore';
import { userLinkStore } from '@/store/linkStore';
import { useParams } from 'next/navigation';
import { Button } from './ui/button';
import NextLink from 'next/link';

const MonaSansfont = Mona_Sans({
  subsets: ['latin'],
  weight: '400',
});

const ProfileCard = () => {
  const profile = userProfileStore((state) => state.profile);
  const getProfile = userProfileStore((state) => state.getProfile);
  const { slug } = useParams() as { slug: string };
  const { isLoading } = userLinkStore();

  useEffect(() => {
    if (slug && !profile) {
      getProfile(slug);
    }
  }, [slug, profile]);

  return (
    <div
      className={`flex items-center justify-center h-screen ${MonaSansfont.className} bg-white dark:bg-[#0A0A0A] transition-colors duration-300`}
    >
      <div className="flex flex-col items-center justify-center px-4 pt-4 pb-6 rounded-4xl bg-gradient-to-br from-pink-300 via-white to-blue-100 dark:from-[#121212] dark:via-[#1e1e1e] dark:to-[#2a2a2a] shadow-sm shadow-purple-300 dark:shadow-black/20 transition-all duration-300 backdrop-blur-sm">
        <div className="relative w-[21rem] aspect-square overflow-hidden rounded-4xl group">
          <Image
            src={profile?.image || '/goku.jpg'}
            alt="User Image"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="w-[21rem] mt-3">
          <div className="pl-5">
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
              Yashxp1
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
              {profile?.bio || 'No bio available'}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
              {profile?.location || 'Location not set'}
            </p>
          </div>

          {profile?.links.length === 0 && !isLoading && (
            <div className="border border-gray-300 dark:border-gray-700 rounded-2xl p-4 mt-4 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No links found.
              </p>
            </div>
          )}

          {profile?.links.map((link) => (
            <div
              key={link.id}
              className="flex justify-center items-center pt-2 text-black dark:text-white font-semibold text-sm"
            >
              <div className="flex flex-col gap-2 w-[90%] justify-center text-center items-center">
                <Button
                  asChild
                  variant="outline"
                  className="w-full font-semibold"
                >
                  <NextLink
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.title}
                  </NextLink>
                </Button>
                {/* <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 dark:border-gray-700 w-full py-2 rounded-xl cursor-pointer transition-all bg-white dark:bg-[#1e1e1e] hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                >
                  {link.title}
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
