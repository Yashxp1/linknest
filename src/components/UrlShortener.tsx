import React from 'react';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';
import { Manrope } from 'next/font/google';

const manropefont = Manrope({
  subsets: ['latin'],
  weight: '400',
});

const UrlShortener = () => {
  return (
    <div className={`${manropefont.className}`}>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="flex flex-col gap-4 w-full max-w-md px-4">
          <div className="flex flex-col gap-1">
            <Label className="font-semibold" >
              Paste your URL here
            </Label>
            <Input id="url" placeholder="eg: https://www.instagram.com/" />
          </div>
          <Button variant="outline" className='font-semibold'>Shorten✨</Button>
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
