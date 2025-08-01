'use client';
import React from 'react';
import AddBtn from '../AddBtn';
import Card from '../Card';
import Preview from '../Preview';

const LinkPage = () => {
  return (
    <div className="w-full flex h-screen overflow-hidden ">
    
      <div className="flex-1 border-r overflow-y-auto lg:pl-12 hide-scrollbar">
        <div className=" py-6">
          <AddBtn />
          <div className="mt-4">
            <Card />
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
