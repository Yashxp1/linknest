'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { profileSchema } from '@/schemas/profileSchema';
import { userProfileStore } from '@/store/profileStore';

type profileModalData = z.infer<typeof profileSchema>;

interface profileModalProps {
  trigger: (openModal: () => void) => React.ReactNode;
  user: {
    userId: string;
    bio: string;
    location: string;
    slug: string;
  };
}

const EditProfileModal = ({ trigger, user }: profileModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<profileModalData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userId: '',
      bio: '',
      location: '',
      slug: '',
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const closeModal = () => setIsOpen(false);
  const openModal = () => {
    reset({
      userId: user.userId,
      bio: user.bio,
      location: user.location,
      slug: user.slug,
    });
    setSuccess('');
    setError('');
    setIsOpen(true);
  };

  const { isLoading, setProfile } = userProfileStore();

  const onSubmit = async (data: profileModalData) => {
    const res = await setProfile(data);
    // setProfileState(data);
    if (res.error) {
      setError(res.error);
      toast.error(res.error);
    }
    if (res.success) {
      setError('');
      toast.success(res.success);
      setSuccess(res.success);
      closeModal();
    }
  };

  return (
    <div>
      {trigger(openModal)}
      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 animate-in fade-in duration-300"
        >
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center dark:bg-[#191919] border rounded-sm p-5 bg-white w-[30%]">
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="userId">User ID</Label>
                  <Input id="userId" {...register('userId')} />
                  {errors.userId && (
                    <p className="text-sm text-red-500">{errors.userId.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" {...register('bio')} />
                  {errors.bio && (
                    <p className="text-sm text-red-500">{errors.bio.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" {...register('location')} />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" {...register('slug')} />
                  {errors.slug && (
                    <p className="text-sm text-red-500">{errors.slug.message}</p>
                  )}
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}
              <div className="flex gap-4 pt-4 justify-center items-center">
                <Button onClick={closeModal} variant="outline" className="w-full">
                  Close
                </Button>
                <Button type="submit" className="w-full">
                  {isLoading ? 'Updating...' : 'Update'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfileModal;
