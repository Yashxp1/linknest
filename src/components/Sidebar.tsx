'use client';


import NextLink from 'next/link';
import { Link as LinkIcon, LogOut, User } from 'lucide-react';
import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
  return (
    <div className="h-screen border-r px-2 fixed top-0 left-0 bg-white dark:bg-[#0A0A0A] flex flex-col justify-between">
      <div className="flex flex-col items-center gap-2 pt-20">
        <NextLink href="/dashboard">
          <div className="rounded-full p-2 border cursor-pointer">
            <User size={18} className="stroke-[1.2] hover:text-blue-400" />
          </div>
        </NextLink>

        <NextLink href="/url-shortener">
          <div className="rounded-full p-2 border cursor-pointer">
            <LinkIcon size={18} className="stroke-[1.2] hover:text-green-400" />
          </div>
        </NextLink>
      </div>

      <div className="flex flex-col gap-4 justify-between pb-16">
        <div>
          <DarkModeToggle />
        </div>
        {/* <div className="rounded-full p-2 border"> */}
          <button
            onClick={() => signOut()}
            className="rounded-full p-2 border hover:text-red-500"
          >
            <LogOut size={18} className="stroke-[1.2]" />
          </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
