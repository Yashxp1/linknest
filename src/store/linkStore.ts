import { linkSchema } from '@/schemas/linkSchema';
import { toast } from 'sonner';
import { create } from 'zustand';
import { z } from 'zod';
import axios from 'axios'

const baseURL = 'http://localhost:3000/api';

type Link = {
  id: string;
  title: string;
  url: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

type LinkStore = {
  isLoading: boolean;
  setLink: (data: z.infer<typeof linkSchema>) => Promise<{ success?: string; error?: string }>;
  deleteLink: () => void;
};

export const userLinkStore = create<LinkStore>((set) => ({
  isLoading: false,

  setLink: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${baseURL}/links`, data);
      console.log(res.data);

      return res.data;
    } catch (error: any) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Failed to add link!');
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteLink: async () => {},
}));
