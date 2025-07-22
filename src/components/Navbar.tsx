'use client';

import { Menu } from 'lucide-react';
import React from 'react';
import Sidebar from './Sidebar';
import Logo from './Logo';
import { DarkModeToggle } from './DarkModeToggle';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <div className=" flex dark:bg-[#0A0A0A] bg-white fixed border-b items-center justify-between w-full px-3 py-2">
      <div className=" flex justify-center items-center gap-6 px-4">
        <div>
          <Logo />
        </div>
      </div>
      <div>
        <Button variant="outline" className="px-6">
          {' '}
          Share
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
