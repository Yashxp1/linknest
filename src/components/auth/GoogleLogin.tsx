
import { BsGoogle } from 'react-icons/bs';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';

const GoogleLogin = () => {
  const handleClick = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };
  return (
    <div className="flex mt-4">
      <Button
        onClick={handleClick}
        variant="outline"
        className="flex flex-row items-center gap-3 w-full"
      >
        <BsGoogle />
        Google Sign In
      </Button>
    </div>
  );
};

export default GoogleLogin;
