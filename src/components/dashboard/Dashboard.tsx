import React from 'react';
import Preview from '../Preview';
import AddBtn from '../AddBtn';
import Card from '../Card';
// import Profile from '../Profile';

const Dashboard = () => {
  
  return (
    <div className="w-full border flex">
      <div className=" border w-full">
        <AddBtn />

        <div>
          <Card />
        </div>
      </div>
      <div className=" w-[70%] md:flex hidden">
        <Preview />
        {/* <Profile /> */}
      </div>
    </div>
  );
};

export default Dashboard;
