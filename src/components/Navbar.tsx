'use client';

import { Menu } from 'lucide-react';
import React from 'react';
import Sidebar from './Sidebar';
import Logo from './Logo';
import { DarkModeToggle } from './DarkModeToggle';

const Navbar = () => {
  return (
    <Sidebar
      trigger={(openSidebar) => (
        <div className=" flex fixed dark:bg-black bg-white border-b items-center justify-between w-full px-3 py-1">
          <div className=" flex justify-center items-center gap-6 px-4">
            <Menu onClick={openSidebar} />
          <div>
            <Logo />
          </div>
          </div>
          <div>
            <DarkModeToggle/>
          </div>
        </div>
      )}
    />
  );
};

export default Navbar;
