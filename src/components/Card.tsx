'use client';
import { Switch } from '@/components/ui/switch';
import { Grip, Pencil, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';
import { userLinkStore } from '@/store/linkStore';
import { useSession } from 'next-auth/react';

const Card = () => {


  const { isLoading } = userLinkStore();
  const links = userLinkStore((state) => state.links);
  const getLink = userLinkStore((state) => state.getLink);

  useEffect(() => {
    getLink();
  }, []);



  return (
    <div className="m-4 space-y-3 h-screen">
      {isLoading && (
        <div className="border rounded-2xl p-4">
          <p className="text-gray-500">Loading links...</p>
        </div>
      )}

      {links.length === 0 && !isLoading && (
        <div className="border rounded-2xl p-4">
          <p className="text-gray-500">No links found.</p>
        </div>
      )}

      {links.map((link) => (
        <div
          key={link.id}
          className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            {/* Left side - Grip and Link Info */}
            <div className="flex items-center flex-1 min-w-0">
              <div className="cursor-grab mr-3">
                <Grip size={16} className="text-gray-400" />
              </div>
              <div className=" flex-col min-w-0 inline-block flex-1">
                <p className="font-semibold truncate">{link.title}</p>
                <a
                  href={link.url}
                  target="_blank"
                  className="text-sm cursor-pointer  truncate"
                >
                  {link.url}
                </a>
              </div>
            </div>

            {/* Right side - Controls */}
            <div className="flex flex-col items-center gap-4 ml-4">
              <Switch />
              <DropDown linkId={link.id} userId={link.userId} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
