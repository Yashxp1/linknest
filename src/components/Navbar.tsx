'use client';

import { Menu } from 'lucide-react';
import React from 'react';
import Sidebar from './Sidebar';
import Logo from './Logo';
import { DarkModeToggle } from './DarkModeToggle';

const Navbar = () => {
  return (
    <div className=" flex dark:bg-[#0A0A0A] bg-white fixed border-b items-center justify-between w-full px-3 py-2">
      <div className=" flex justify-center items-center gap-6 px-4">
        <div>
          <Logo />
        </div>
      </div>
      <div>
        <button className="px-5 py-1 text-semibold dark:bg-white dark:text-black bg-black/80 text-white border rounded-sm">
          Share
        </button>
      </div>
    </div>
  );
};

export default Navbar;
