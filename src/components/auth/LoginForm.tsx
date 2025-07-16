'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
import GoogleLogin from './GoogleLogin';
import { LoginSchema } from '@/schemas/authSchema';
import { useState } from 'react';
import { login } from '@/actions/login';

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  // const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

const onSubmit = async (data: LoginFormData) => {
  setIsLoading(true);
    login(data).then((res) => {
      if (res.error) {
        setError(res.error);
        setIsLoading(false);
      }
      if (res.success) {
        // router.push('/dashboard')
        setError('');
        setSuccess(res.success);
        setIsLoading(false);
      }
    });
};

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Sign-in</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign-in'}
          </Button>
        </form>

        <GoogleLogin />
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center gap-2">
        <Link href="/register" className="w-full">
          <Button variant="link" className="w-full text-center">
            Don’t have an account? Sign-up
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
