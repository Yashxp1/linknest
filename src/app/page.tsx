import { auth } from '@/auth';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const authSession = await auth()
  console.log(authSession)
  return (
    <div>
      This is home page
      <div className="flex p-4 gap-3">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default page;
