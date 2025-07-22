'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { userProfileStore } from '@/store/profileStore';
import { profileSchema } from '@/schemas/profileSchema';

type editProfileData = z.infer<typeof profileSchema>;

interface editProfileModalProps {
  trigger: (openModal: () => void) => React.ReactNode;
  profile: {
    bio: string;
    location: string;
    image: string;
  };
}
const EditProfileModal = ({ trigger, profile }: editProfileModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<editProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      // bio: '',
      // location: '',
      // image: '',
      bio: profile.bio,
      location: profile.location,
      image: profile.image,
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const closeModal = () => setIsOpen(false);
  const openModal = () => {
    reset({
      bio: profile.bio,
      location: profile.location,
      image: profile.image,
    });
    setSuccess('');
    setError('');
    setIsOpen(true);
  };

  const { isLoading, setProfile, getProfile } = userProfileStore();

  const onSubmit = async (data: editProfileData) => {
    // isLoading: true;
    await setProfile(data).then((res) => {
      if (res.error) {
        setError(res.error);
        toast.error('Error adding link');
        // isLoading: false;
      }
      if (res.success) {
        setError('');
        console.log(res);
        // getProfile();
        toast.success('Link added!');
        setSuccess(res.success);
        closeModal();
        // isLoading: false;
      }
    });
  };

  return (
    <div>
      {trigger(openModal)}
      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-black/50  backdrop-blur-xs z-40 animate-in fade-in duration-300"
        >
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center dark:bg-[#191919] border rounded-sm p-5 bg-white w-[30%]">
              <div className="w-full flex flex-col gap-4">
                {/* <h1 className='text-4xl'>Add Link</h1> */}
                <div className=" flex flex-col gap-3">
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
                    <p className="text-sm text-red-500">
                      {errors.location.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="image">image</Label>
                  <Input id="image" {...register('image')} />
                  {errors.image && (
                    <p className="text-sm text-red-500">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}
              <div className="flex gap-4 pt-4 justify-center items-center">
                <Button
                  onClick={closeModal}
                  variant="outline"
                  className="w-full "
                >
                  Close
                </Button>
                <Button type="submit" className="w-full">
                  {isLoading ? 'Saving...' : 'Saving'}
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
