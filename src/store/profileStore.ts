import { profileSchema } from '@/schemas/profileSchema';
import { toast } from 'sonner';
import z from 'zod';
import axios from 'axios';
import { create } from 'zustand';
import { Link } from './linkStore';

const baseURL = '/api';

export type Profile = {
  id: string;
  bio: string;
  location?: string;
  slug: string;
  image?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  links: Link[];
};

type GetProfileResponse = {
  profile: Profile;
};

type SetProfileResponse = {
  profile: Profile;
};

type ProfileStore = {
  isLoading: boolean;      
  isSubmitting: boolean;  
  profile?: Profile;

  setProfile: (
    data: z.infer<typeof profileSchema>
  ) => Promise<{ success?: string; error?: string }>;

  getProfile: (slug: string) => Promise<void>;
};

export const userProfileStore = create<ProfileStore>((set) => ({
  isLoading: false,
  isSubmitting: false,
  profile: undefined,

  getProfile: async (slug: string) => {
    set({ isLoading: true });
    try {
      const res = await axios.get<GetProfileResponse>(`${baseURL}/user/${slug}`);
      set({ profile: res.data.profile });
      toast.success('Profile fetched successfully');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to get profile!');
    } finally {
      set({ isLoading: false });
    }
  },

  setProfile: async (data) => {
    set({ isSubmitting: true });
    try {
      const res = await axios.post<SetProfileResponse>(`${baseURL}/profile`, data);
      set({ profile: res.data.profile });
      toast.success('Profile updated!');
      return { success: 'Profile updated' };
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to set profile');
      return { error: 'Something went wrong' };
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
