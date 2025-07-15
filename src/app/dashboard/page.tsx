import Dashboard from '@/components/dashboard/Dashboard';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const page = () => {
  return (
    <div className="flex">
      <div>
        {/* <Sidebar /> */}
      </div>
      <div className='w-full'>
        <div className='w-full'>
          <Navbar />
        </div>
        <div>

        <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default page;
