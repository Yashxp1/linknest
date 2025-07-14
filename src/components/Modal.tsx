'use client';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

export const Modal = ({
  trigger,
}: {
  trigger: (openModal: () => void) => React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <div>
      {trigger(openModal)}
      {isOpen && (
        <form className="fixed inset-0 bg-black/50  z-40 animate-in fade-in duration-300">
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center dark:bg-[#191919] rounded-2xl p-5 bg-white w-[30%]">
              <div className="w-full flex flex-col gap-4">
                <div className=" flex flex-col gap-3">
                  <Label>Title</Label>
                  <Input />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>URL</Label>
                  <Input />
                </div>
              </div>
              <div className='flex gap-4 pt-4 justify-center items-center'>
                <Button onClick={closeModal} variant='outline' className='w-full '>Close</Button>
                <Button onClick={closeModal} className='w-full'>Add</Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
