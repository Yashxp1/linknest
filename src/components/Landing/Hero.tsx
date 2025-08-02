// import { DarkModeToggle } from '@/components/DarkModeToggle';
// import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Manrope } from 'next/font/google';
// import { MoveRight } from 'lucide-react';
import { FaArrowRight } from 'react-icons/fa';
import Icons from './Icons';
import Navbar from './Navbar';
import Footer from './Footer';


const manropefont = Manrope({
  subsets: ['latin'],
  weight: '400',
});
const Hero = () => {
  return (
    <div
      className={`relative ${manropefont.className} min-h-screen overflow-hidden`}
    >
      <div>
        <Navbar />
      </div>
      {/* Left side images */}
      <div className="absolute left-70 top-70 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <Image
          src="/HeroBgDark.png"
          alt="hero bg left"
          width={386}
          height={579}
          className="pointer-events-none hidden scale-x-[-1] h-auto rotate-[-12deg] opacity-40 dark:block"
          priority
        />
        <Image
          src="/HeroBgLight.png"
          alt="hero bg left"
          width={386}
          height={579}
          className="pointer-events-none block h-auto scale-x-[-1] rotate-[-12deg] opacity-40 dark:hidden"
          priority
        />
      </div>

      {/* Right side images */}
      <div className="absolute right-70 top-70 transform translate-x-1/2 -translate-y-1/2 z-0">
        <Image
          src="/HeroBgDark.png"
          alt="hero bg right"
          width={386}
          height={579}
          className="pointer-events-none hidden h-auto rotate-[12deg] opacity-40 dark:block"
          priority
        />
        <Image
          src="/HeroBgLight.png"
          alt="hero bg right"
          width={386}
          height={579}
          className="pointer-events-none block h-auto rotate-[12deg] opacity-40 dark:hidden"
          priority
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center md:gap-12 lg:gap-12">
          <h1 className="text-4xl leading-[1.1] font-bold tracking-[-0.02em] sm:flex-row md:text-4xl lg:text-6xl">
            Your digital presence <br /> Simplified and{' '}
            <span className="bg-gradient-to-br from-black to-white/5 bg-clip-text text-transparent dark:from-white dark:to-black/5">
              unified
            </span>
          </h1>
          <p className="mx-auto max-w-xs text-sm leading-tight sm:text-[16px]">
            A minimal, clean hub to organize and share all your important links
            in one place.
          </p>
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-black to-[#7FBEE4] opacity-40 blur-[60px]">
            <Image
              src="/gradii1.png"
              alt="Screenshot dark mode"
              width={500}
              height={300}
            />
          </div>
          <Link href="/auth/register">
            <div className="flex border  px-5 py-2 gap-2  items-center justify-center backdrop-blur-xs dark:bg-white/5 dark:border-white/5 bg-white/20 border-white/30">
              <div className="">
                <button className="font-semibold ">Get Started</button>
              </div>
              <div>
                <span className="">
                  <FaArrowRight />
                </span>
              </div>
            </div>
          </Link>
        </div>
        {/* <div className="mt-16 text-center text-2xl font-medium text-muted-foreground">
          Trusted by{' '}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent font-semibold">
            2,000+ creators ,
          </span>
          <br />
          freelancers, and{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
            businesses.
          </span>
        </div> */}
      </div>
      <div className="w-full">
        <Icons />
      </div>

      <div className="flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default Hero;
