import LinkPage from '@/components/LinkPage/Dashboard';import { SessionProvider } from 'next-auth/react';
import React from 'react';

const page = () => {
  return (
    <div className="">
      <SessionProvider>
        <LinkPage />
      </SessionProvider>
    </div>
  );
};

export default page;
