import LinkPage from '@/components/LinkPage/Dashboard';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const page = () => {
  return (
    <div className="flex">
      <div>{/* <Sidebar /> */}</div>
      <div className="w-full">
        <div className="w-full pb-[36px]">
          <Navbar />
        </div>
        <div className="">
          <LinkPage />
        </div>
      </div>
    </div>
  );
};

export default page;
