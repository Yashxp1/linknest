import { Pacifico } from 'next/font/google';

const PacificoFont = Pacifico({
  subsets: ["latin"],
  weight:"400"
})

const Logo = () => {
  return <div className={`${PacificoFont.className} text-xl`}>linknest</div>;
};

export default Logo;
