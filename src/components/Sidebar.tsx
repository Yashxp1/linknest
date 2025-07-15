'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { DarkModeToggle } from './DarkModeToggle';

const Sidebar = ({
  trigger,
}: {
  trigger: (openSidebar: () => void) => React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {trigger(openSidebar)}

      {isOpen && (
        <aside className="fixed animate-in fade-in duration-300 top-0 left-0 z-50 border-r w-52 h-screen flex flex-col items-center justify-evenly bg-white dark:bg-[#191919]">
          <div className="flex justify-center items-center py-4 w-full">
            <Button variant="outline" className="w-full">
              Yash123
            </Button>
          </div>
          <div className="gap-2 flex flex-col justify-center items-center py-4 w-full">
            <Link href="/dashboard" className="w-full text-center">
              <Button variant="ghost" className="w-full">
                Profile
              </Button>
            </Link>
            <Link href="/url-shortner" className="w-full text-center">
              <Button variant="ghost" className="w-full">
                URL Shortener
              </Button>
            </Link>
          </div>
          <div className="py-4">
            <DarkModeToggle />
          </div>

          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              onClick={closeSidebar}
              className="animate-in fade-in duration-300"
            >
              Close
            </Button>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
