'use client';
import React from 'react';
import AddBtn from '../AddBtn';
import Card from '../SortableCard';
import Preview from '../Preview';
import SortableCard from '../SortableCard';

const LinkPage = () => {
  return (
    <div className="w-full flex h-screen overflow-hidden ">
    
      <div className="flex-1 border-r overflow-y-auto pl-12 hide-scrollbar">
        <div className="py-6">
          <AddBtn />
          <div className="mt-4">
            <SortableCard />
          </div>
        </div>
      </div>


      <div className="w-[30%] hidden lg:flex items-center justify-center border-l h-screen">
        <Preview />
      </div>
    </div>
  );
};

export default LinkPage;
