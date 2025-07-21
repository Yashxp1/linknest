import Image from 'next/image';
import React from 'react';
import { Instrument_Sans } from 'next/font/google';
import { Mona_Sans } from 'next/font/google';
import { Button } from './ui/button';

const InstrumentSansfont = Instrument_Sans({
  subsets: ['latin'],
  weight: '400',
});

const MonaSansfont = Mona_Sans({
  subsets: ['latin'],
  weight: '400',
});

const ProfileCard = () => {
  return (
    <div className={`${MonaSansfont.className}`}>
      <div className="justify-center px-2 rounded-4xl pt-2 pb-4 bg-gradient-to-br from-pink-300 via-white to-blue-100 items-center flex flex-col  shadow-lg hover:shadow-xl transition-all duration-300  backdrop-blur-sm">
        <div className="relative w-84 aspect-square overflow-hidden rounded-4xl group">
          <Image
            // src="/person1.avif"
            src="/looney.jpg"
            alt="Your Image"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="w-84 mt-4">
          <div className="pl-5">
            <h2 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
              Yashxp1
            </h2>
            <p className="text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200">
              San-francisco, USA
            </p>
            <p className="text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200">
              Full-Stack Developer and a web designer.
            </p>
          </div>
          <div className="flex justify-center items-center pt-2 text-black font-semibold text-sm">
            <div className="flex flex-col gap-2 w-[90%] justify-center text-center items-center">
              <p className=" border border-gray-300 w-full py-2 rounded-xl cursor-pointer transition-all bg-white">
                GitHub
              </p>
              <p className="border border-gray-300 w-full py-2 rounded-xl  cursor-pointer transition-all bg-white">
                Instagram
              </p>
              <p className="border border-gray-300 w-full py-2 rounded-xl cursor-pointer transition-all bg-white">
                Twitter
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
