import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div>
      This is home page
      <div className="flex p-4 gap-3">
        <Link href="/signin">
          <Button>Sign-in</Button>
        </Link>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default page;
