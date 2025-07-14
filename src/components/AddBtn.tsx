'use client';
import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Modal } from './Modal';

const AddBtn = () => {
  return (
    <Modal
      trigger={(openModal) => (
        <div className='w-full flex justify-center items-center'>
          <Button onClick={openModal} className="mt-6 w-[70%]">
            <Plus className="mr-2" />
            Add
          </Button>
        </div>
      )}
    />
  );
};

export default AddBtn;
