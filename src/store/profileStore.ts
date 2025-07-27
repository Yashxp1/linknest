import { profileSchema } from '@/schemas/profileSchema';
import { toast } from 'sonner';
import z from 'zod';
import axios from 'axios';
import { create } from 'zustand';
import { Link } from './linkStore';

const baseURL = 'http://localhost:3000/api';

type Profile = {
  id: string;
  bio: string;
  location?: string;
  slug: string;
  image?: string;
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

  profile?: Profile;

  setProfile: (
    data: z.infer<typeof profileSchema>
  ) => Promise<{ success?: string; error?: string }>;

  deleteProfile: () => void;

  getProfile: (slug: string) => Promise<void>;
};

export const userProfileStore = create<ProfileStore>((set) => ({
  isLoading: false,
  profile: undefined,

  getProfile: async (slug: string) => {
    set({ isLoading: true });
    try {
      const res = await axios.get<GetProfileResponse>(
        `${baseURL}/user/${slug}`
      );

      set({ profile: res.data.profile });
      // toast.success('Profile fetched successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to get Profile!');
    } finally {
      set({ isLoading: false });
    }
  },

  setProfile: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axios.post<SetProfileResponse>(
        `${baseURL}/profile`,
        data
      );

      set({ profile: res.data.profile });

      toast.success('Profile updated!');
      return { success: 'Profile updated' };
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to set profile');
      return { error: 'Something went wrong' };
    } finally {
      set({ isLoading: false });
    }
  },
  deleteProfile: async () => {},
}));
