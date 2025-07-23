import { Link, LogOut, User } from 'lucide-react';
import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';

const Sidebar = () => {
  return (
    <div className="h-screen border-r px-2 fixed top-0 left-0 bg-white dark:bg-[#0A0A0A] flex flex-col justify-between">
      <div className="flex flex-col items-center gap-2 pt-20"> 
        <div className="rounded-full p-2 border">
          <User size={18} className="stroke-[1.2] hover:text-blue-400" />
        </div>

        <div className="rounded-full p-2 border">
          <Link size={18} className="stroke-[1.2] hover:text-green-400" />
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between pb-16">
        <div className="">
          <DarkModeToggle />
        </div>
        <div className="rounded-full p-2 border">
          <LogOut size={18} className="stroke-[1.2] hover:text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
