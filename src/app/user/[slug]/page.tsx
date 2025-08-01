import ShareableProfile from '@/components/ShareableProfile';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const page = () => {
  return (
    <SessionProvider>
      <div>
        <ShareableProfile/>
        {/* <ProfileCard /> */}
      </div>
    </SessionProvider>
  );
};

export default page;
