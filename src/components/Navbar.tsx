"use client"

import { Menu } from 'lucide-react';
import React from 'react';
import Sidebar from './Sidebar';

const Navbar = () => {
  return (
    <Sidebar
       trigger={(openSidebar) => (
        <div className="border w-full py-3">
          <div className="text-gray-400 px-4">
            <Menu onClick={openSidebar}/>
          </div>
        </div>
      )}
    />
  );
};

export default Navbar;
