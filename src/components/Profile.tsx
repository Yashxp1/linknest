import React from 'react';

const Profile = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center text-lg">
        <h1 className="font-semibold">Your Profile</h1>
      </div>
      <div className='flex justify-center items-center py-4'>
        <img
          src="ss.png"
          alt="pfp"
          className="w-24 h-24 object-cover rounded-full border"
        />
      </div>
    </div>
  );
};

export default Profile;
