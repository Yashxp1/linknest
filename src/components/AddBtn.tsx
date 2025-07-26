'use client';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { AddLinkModal } from './Modal/AddLinkModal';
import EditProfileModal from './Modal/EditProfileModal';
import { userProfileStore } from '@/store/profileStore';
import { useSession } from 'next-auth/react';


const AddBtn = () => {
  const { data: session } = useSession();
  const profile = userProfileStore((state) => state.profile);
  const getProfile = userProfileStore((state) => state.getProfile);

  useEffect(() => {
    if (session?.user?.slug && !profile) {
      getProfile(session.user.slug);
    }
  }, [session?.user?.slug]);

  return (
    <div className="flex justify-center w-full border-b items-center  pt-10">
      <div className=" w-full">
        <div className="w-full p-4 pb-6 flex flex-col">
          <div className="flex justify-between">
            <div className="flex items-center space-x-3 py-4">
              <Image
                src="/defaultPic.jpg"
                alt="Profile Picture"
                width={64}
                height={64}
                className="rounded-full object-cover border"
              />
              <div className="flex flex-col gap-0.5 leading-tight">
                <span className="font-semibold">Yashxp1</span>
                <p className="text-md">
                  {/* Full-Stack Developer */}
                  {profile?.bio}
                </p>

                <p className="text-sm">
                  {/* New Delhi, India */}
                  {profile?.location}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full justify-center items-center">
            <div className="w-full">
              <AddLinkModal
                trigger={(openModal) => (
                  <div className="">
                    <Button onClick={openModal} className=" w-full">
                      <Plus className="" />
                      Add
                    </Button>
                  </div>
                )}
              />
            </div>
            <EditProfileModal
              trigger={(openModal) => (
                <div className="">
                  <Button onClick={openModal} variant="outline">
                    Edit Profile
                  </Button>
                  {/* <Pencil size={18} /> */}
                </div>
              )}
              profile={{
                bio: profile?.bio ?? '',
                location: profile?.location ?? '',
                image: profile?.image ?? '',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBtn;
