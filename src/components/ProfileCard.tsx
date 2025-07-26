'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Mona_Sans } from 'next/font/google';
import { userProfileStore } from '@/store/profileStore';
import { useSession } from 'next-auth/react';
import { userLinkStore } from '@/store/linkStore';

const MonaSansfont = Mona_Sans({
  subsets: ['latin'],
  weight: '400',
});

const ProfileCard = () => {
  const { data: session } = useSession();

  const profile = userProfileStore((state) => state.profile);
  const getProfile = userProfileStore((state) => state.getProfile);

  const { isLoading } = userLinkStore();
  const visibleLinks = userLinkStore((state) => state.visibleLinks);
  const getVisibleLink = userLinkStore((state) => state.getVisibleLink);


  useEffect(() => {
    getVisibleLink();
  }, []);

  useEffect(() => {
    if (session?.user?.slug && !profile) {
      getProfile(session.user.slug);
    }
  }, [session?.user?.slug, profile]);

  return (
    <div className={`${MonaSansfont.className} pt-13`}>
      <div className="flex flex-col items-center justify-center px-2 pt-2 pb-4 rounded-4xl bg-gradient-to-br from-pink-300 via-white to-blue-100 shadow-sm shadow-purple-300 dark:shadow-none transition-all duration-300 backdrop-blur-sm">
        <div className="relative w-[21rem] aspect-square overflow-hidden rounded-4xl group">
          <Image
            src={profile?.image || '/goku.jpg'}
            alt="User Image"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="w-[21rem] mt-2">
          <div className="pl-5">
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
              {/* {profile?.name || 'Your Name'} */}
              Yashxp1
            </h2>
            <p className="text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200">
              {profile?.location || 'Location not set'}
            </p>
            <p className="text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200">
              {profile?.bio || 'No bio available'}
            </p>
          </div>

          {visibleLinks.length === 0 && !isLoading && (
            <div className="border rounded-2xl p-4 mt-4 text-center">
              <p className="text-gray-500">No links found.</p>
            </div>
          )}

          {visibleLinks.map((link) => (
            <div
              key={link.id}
              className="flex justify-center items-center pt-2 text-black font-semibold text-sm"
            >
              <div className="flex flex-col gap-2 w-[90%] justify-center text-center items-center">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 w-full py-2 rounded-xl cursor-pointer transition-all bg-white"
                >
                  {link.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
