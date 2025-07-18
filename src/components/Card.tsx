import { Switch } from '@/components/ui/switch';
import { Grip, Pencil, X } from 'lucide-react';
import React from 'react';

const Card = () => {
  return (
    <div className="border rounded-2xl m-4 p-2 flex justify-between items-center">
      <div className='flex items-center'>
        <div className='px-2 cursor-grab'>
          <Grip size={16}/>
        </div>
        <div className="pl-2 flex flex-col ">
          <p className="font-semibold flex items-center  gap-2">
            Google
            <span>
              <Pencil size={14} />
            </span>
          </p>
          <p className="flex items-center  gap-2">
            www.google.com
            <span>
              <Pencil size={14} />
            </span>
          </p>
        </div>
      </div>
      <div className="pr-2 pt-2 flex flex-col justify-between items-center gap-6">
        <div>
          <Switch />
        </div>
        <div>
          <X />
        </div>
      </div>
    </div>
  );
};

export default Card;
