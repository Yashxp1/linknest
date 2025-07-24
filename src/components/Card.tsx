'use client';
import { Switch } from '@/components/ui/switch';
import { Grip } from 'lucide-react';
import React, { useEffect } from 'react';
import DropDown from './DropDown';
import { userLinkStore } from '@/store/linkStore';

const Card = () => {
  const { isLoading, toggleVisibilty } = userLinkStore();
  const links = userLinkStore((state) => state.links);
  const getLink = userLinkStore((state) => state.getLink);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <div className="m-4 space-y-3">
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

            <div className="flex flex-col items-center gap-4 ml-4">
              <Switch />
              {/* <Switch
                checked={link.visible}
                onCheckedChange={(checked) => toggleVisibilty(link.id, checked)}
              /> */}

              <DropDown
                link={{
                  linkId: link.id,
                  title: link.title,
                  url: link.url,
                  userId: link.userId,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
