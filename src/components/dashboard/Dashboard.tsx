"use client"
import React from 'react';
import Preview from '../Preview';
import AddBtn from '../AddBtn';
import Card from '../Card';
import Sidebar from '../Sidebar';
import { userProfileStore } from '@/store/profileStore';

const Dashboard = () => {
  const { profile } = userProfileStore();
  if (!profile) {
    return null;
  }
  return (
    <div className="w-full flex border-b">
      <Sidebar />
      <div className="flex-1  border-r pl-13">
        <AddBtn profile={profile} />
        <div>
          <Card />
        </div>
      </div>
      <div className="w-[30%] lg:flex justify-center items-center hidden">
        <Preview />
      </div>
    </div>
  );
};

export default Dashboard;
