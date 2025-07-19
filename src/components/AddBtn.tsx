'use client';
import React from 'react';
import { Button } from './ui/button';
import { Divide, Plus } from 'lucide-react';
import { Modal } from './Modal';
import { auth } from '@/auth';

const AddBtn = () => {

  return (
    <Modal
      trigger={(openModal) => (
        <div className="flex justify-center items-center border-b">
          <div className="w-[80%]">
            <div className="w-full p-4 pb-6 flex flex-col">
              <div>
                <div className="flex  py-4">
                  <img
                    src="ss.png"
                    alt="pfp"
                    className="w-18 h-18 object-cover rounded-full border"
                  />
                  <div className="px-4 flex flex-col">
                    <span className="font-semibold">Yashxp1</span>
                    <p className="text-md">Full-Stack developer</p>
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
