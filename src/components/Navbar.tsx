'use client';
import React from 'react';
import Logo from './Logo';
import { CopyLink } from './Modal/CopyLink';

const Navbar = () => {

  return (
    <div className=" flex dark:bg-[#0A0A0A] bg-white fixed border-b z-50 items-center justify-between w-full px-3 py-2">
      <div className=" flex justify-center items-center gap-6 px-4">
        <div>
          <Logo />
        </div>
      </div>
      <div>
       <CopyLink/>
      </div>
    </div>
  );
};

export default Navbar;
