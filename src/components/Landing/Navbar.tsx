import { AudioLines, Sparkles, Waves } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { DarkModeToggle } from '../DarkModeToggle';

const Navbar = () => {
  return (
    <nav className="fixed top-1 left-0 w-full z-50 flex justify-center">
      <div className="w-[80%] shadow-2xs mt-4 px-2 text-center bg-white/20 border dark:bg-black/5 py-2  rounded-2xl backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center justify-center gap-2">
            <Sparkles />
              <p className="font-semibold text-xl">LinkNest</p>
            </div>
          </Link>
          <div className="gap-2 flex justify-center items-center">
            <div>
              <DarkModeToggle></DarkModeToggle>
            </div>
            {/* <Link href="/register">
              <Button
                size="sm"
                variant="outline"
                className="font-semibold hover:bg-yellow-300 bg-yellow-400 border-yellow-600"
              >
                Register
              </Button>
            </Link> */}
            <Link href="/auth/login">
              <Button className="font-semibold" size="sm">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
