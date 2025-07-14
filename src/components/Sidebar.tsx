import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { DarkModeToggle } from './DarkModeToggle';

const Sidebar = () => {
  return (
    <aside className="border-2 w-52 h-screen hidden md:flex flex-col items-center justify-evenly">
      <div className="flex justify-center items-center py-4">
        <Button variant="outline">Yash123</Button>
      </div>
      <div className="gap-2 flex flex-col justify-center items-center py-22">
        <div>
          <Link href="/dashboard">
            <Button variant="ghost">Profile</Button>
          </Link>
        </div>
        <div>
          <Link href="/url-shortner">
            <Button variant="ghost">URL-shortner</Button>
          </Link>
        </div>
      </div>
      <div className="">
        <DarkModeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
