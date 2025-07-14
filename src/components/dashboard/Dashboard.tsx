import React from 'react';
import Preview from '../Preview';
import AddBtn from '../AddBtn';
import Card from '../Card';

const Dashboard = () => {
  return (
    <div className="w-full border h-screen flex">
      <div className="border w-full">
        <AddBtn />

        <div>
          <Card />
        </div>
      </div>
      <div className="border w-[70%] md:flex hidden">
        <Preview />
      </div>
    </div>
  );
};

export default Dashboard;
