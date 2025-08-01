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
    name: string;
    bio: string;
    location: string;
    image: any;
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
      bio: '',
      location: '',
      image: '',
      name: '',
      // bio: profile.bio,
      // location: profile.location,
      // image: profile.image,
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
      name: profile.name,
    });
    setSuccess('');
    setError('');
    setIsOpen(true);
  };

  const { isLoading, setProfile, getProfile } = userProfileStore();

  const onSubmit = async (data: editProfileData) => {
    let imageURL = '';

    const imageFile = data.image?.[0];

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'unsigned_profile_upload');
      formData.append('folder', 'profiles');

      try {
        const cloudinaryRes = await fetch(
          'https://api.cloudinary.com/v1_1/dbrwow790/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        const result = await cloudinaryRes.json();
        imageURL = result.secure_url;
      } catch (error) {
        toast.error('Image upload failed');
        return;
      }
    } else {
      imageURL = profile.image || '';
    }

    const payload = {
      ...data,
      image: imageURL,
    };

    const res = await setProfile(payload);
    if (res.error) {
      setError(res.error || 'An error occurred');
      toast.error('Error updating profile');
    } else {
      setSuccess(res.success || 'Profile updated successfully');
      toast.success('Profile updated!');
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
          <div className="flex justify-center items-center h-full p-4">
            <div className="flex flex-col justify-center items-center dark:bg-[#191919] border rounded-2xl p-6 bg-white w-full max-w-[90%] sm:w-[30%] max-h-[90vh] overflow-y-auto">
              <div className="w-full flex flex-col gap-4">
                <h1 className="text-2xl text-center font-semibold">
                  Edit Profile
                </h1>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register('name')} />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
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
                    <p className="text-sm text-red-500">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="image">Image</Label>
                  <Input id="image" type="file" {...register('image')} />
                  {errors.image && (
                    <p className="text-sm text-red-500">
                      Failed uploading image
                    </p>
                  )}
                </div>
              </div>

              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              {success && (
                <p className="text-sm text-green-500 mt-2">{success}</p>
              )}

              <div className="flex gap-4 pt-4">
                <Button onClick={closeModal} variant="outline" type="button">
                  Close
                </Button>
                <Button type="submit">
                  {isLoading ? 'Saving...' : 'Save'}
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
