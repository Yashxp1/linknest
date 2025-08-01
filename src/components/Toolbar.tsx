import NextLink from 'next/link'; 
import { Link as LinkIcon, LogOut, User } from 'lucide-react';
import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';

const Toolbar = () => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 border px-6 py-2 rounded-xl bg-white dark:bg-[#0A0A0A] flex items-center gap-6 shadow-lg">
      <div className="flex items-center gap-4">
        <NextLink href="/dashboard">
          <div className="rounded-full p-2 border cursor-pointer">
            <User size={18} className="stroke-[1.2] hover:text-blue-400" />
          </div>
        </NextLink>

        <NextLink href="/url-shortener">
          <div className="rounded-full p-2 border cursor-pointer">
            <LinkIcon
              size={18}
              className="stroke-[1.2] hover:text-green-400"
            />
          </div>
        </NextLink>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full p-2 border">
          <LogOut size={18} className="stroke-[1.2] hover:text-red-500" />
        </div>
        <DarkModeToggle />
      </div>
    </div>
  );
};


export default Toolbar;
