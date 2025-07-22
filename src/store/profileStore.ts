import { profileSchema } from '@/schemas/profileSchema';
import { toast } from 'sonner';
import z from 'zod';
import { create } from 'zustand';

const baseURL = 'http://localhost:3000/api';

type Profile = {
  userId: string;
  bio: string;
  location: string;
  slug: string;
};

type ProfileStore = {
  isLoading: boolean;
  setProfile: (
    data: z.infer<typeof profileSchema>
  ) => Promise<{ success?: string; error?: string }>;
  deleteProfile: () => void;
};

export const userProfileStore = create<ProfileStore>((set) => ({
  isLoading: false,

  setProfile: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${baseURL}/profile`, data);
      const response = res.data as { message?: string };
      console.log(res.data);
      toast.success(response.message || 'Link added successfully');
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to set profile');
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteProfile: async () => {},
}));
