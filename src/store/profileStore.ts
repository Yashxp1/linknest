import { toast } from 'sonner';
import { create } from 'zustand';

const baseURL = 'http://localhost:3000/api';

type Profile = {
  title: string;
  bio?: string;
  profileId: string;
  slug: string;
  userId: string;
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
};

type ProfileStore = {
  profile: Profile | null;
  isLoading: boolean;
  setProfile: (profile: Profile) => void;
  deleteProfile: () => void;
};

export const userProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  isLoading: false,

  setProfile: async (profile) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${baseURL}/profile`);
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to set profile');
    } finally {
      set({ isLoading: false });
    }
  },
  deleteProfile: async () => {
    set({ profile: null });
  },
}));
