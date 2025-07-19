'use client';
import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Modal } from './Modal';
import Image from 'next/image';
const AddBtn = () => {
  return (
    <Modal
      trigger={(openModal) => (
        <div className="flex justify-center items-center border-b">
          <div className="w-[80%]">
            <div className="w-full p-4 pb-6 flex flex-col">
              <div>
                <div className="flex items-center space-x-3 py-4">
                  <Image
                    src="/default1.jpg"
                    alt="Profile Picture"
                    width={64}
                    height={64}
                    className="rounded-full object-cover border"
                  />
                  <div className="flex flex-col gap-0.5 leading-tight">
                    <span className="font-semibold">
                      Yashxp1
                    </span>
                    <p className="text-md">
                      Full-Stack Developer
                    </p>
                    <p className="text-sm">Ranchi, India</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button onClick={openModal} className="mt-2 w-full ">
                  <Plus className="mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default AddBtn;
