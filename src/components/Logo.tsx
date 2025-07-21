import { Sparkles } from 'lucide-react';
import { Manrope } from 'next/font/google';
import Link from 'next/link';

const manropefont = Manrope({
  subsets: ['latin'],
  weight: '400',
});

const Logo = () => {
  return (
    <div
      className={`${manropefont.className} text-xl flex justify-center items-center gap-2`}
    >
      <Link href="/">
        <div className="flex justify-center items-center gap-2">
          <div>
            <Sparkles />
          </div>
          <div className="flex">
            <p className="font-bold">LinkNest</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
