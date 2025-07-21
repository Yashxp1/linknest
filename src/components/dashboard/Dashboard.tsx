import React from 'react';
import Preview from '../Preview';
import AddBtn from '../AddBtn';
import Card from '../Card';
import Sidebar from '../Sidebar';

const Dashboard = () => {
  return (
    <div className="w-full flex border-b">
      <Sidebar />
      <div className="flex-1  border-r pl-13">
        <AddBtn />
        <div>
          <Card />
        </div>
      </div>
      <div className="w-[30%] md:flex justify-center items-center hidden">
        <Preview />
      </div>
    </div>
  );
};

export default Dashboard;
