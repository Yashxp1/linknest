import {
  deleteSchema,
  linkSchema,
  linkUpdateSchema,
} from '@/schemas/linkSchema';
import { toast } from 'sonner';
import { create } from 'zustand';
import { z } from 'zod';
import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

type Link = {
  id: string;
  title: string;
  url: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  visible:boolean
};

type LinkStore = {
  isLoading: boolean;
  links: Link[];
  setLinks: (links: Link[]) => void;

  setLink: (
    data: z.infer<typeof linkSchema>
  ) => Promise<{ success?: string; error?: string }>;

  getLink: () => Promise<{ success?: string; error?: string }>;

  updateLink: (
    data: z.infer<typeof linkUpdateSchema>
  ) => Promise<{ success?: string; error?: string }>;

  deleteLink: (
    data: z.infer<typeof deleteSchema>
  ) => Promise<{ success?: string; error?: string }>;

  toggleVisibilty: (
    linkId: string,
    visible: boolean
  ) => Promise<{ success?: string; error?: string }>;
};

export const userLinkStore = create<LinkStore>((set, get) => ({
  isLoading: false,
  links: [],

  setLinks: (links) => set({ links }),

  setLink: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${baseURL}/links`, data);
      const response = res.data as { message?: string };

      toast.success(response.message || 'Link added successfully');
      await get().getLink();
      return { success: response.message || 'Link added successfully' };
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add link!');
      return { error: error.response?.data?.message || 'Failed to add link!' };
    } finally {
      set({ isLoading: false });
    }
  },

  getLink: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${baseURL}/links`);
      const response = res.data as { success: boolean; res: Link[] };
      set({ links: response.res });

      console.log('LINKS --->', response.res);
      // console.log(res.data);
      return { success: 'Links fetched successfully' };
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to get link!');
      return { error: error.response?.data?.message || 'Failed to get link!' };
    } finally {
      set({ isLoading: false });
    }
  },

  updateLink: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axios.put(`${baseURL}/links`, data);
      const response = res.data as { message?: string };
      toast.success(response.message || 'Link updated successfully');
      return { success: response.message || 'Link updated successfully' };
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update link!');
      return {
        error: error.response?.data?.message || 'Failed to update link!',
      };
    } finally {
      set({ isLoading: false });
    }
  },

  deleteLink: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axios.delete(`${baseURL}/links`, {
        data,
      } as any);
      const response = res.data as { message?: string };
      toast.success(response.message || 'Link deleted successfully');
      return { success: response.message || 'Link deleted successfully' };
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete link!');
      return {
        error: error.response?.data?.message || 'Failed to delete link!',
      };
    } finally {
      set({ isLoading: false });
    }
  },

  toggleVisibilty: async (linkId, visible) => {
    // set({ isLoading: true });
    try {
      const res = await axios.put(`${baseURL}/links/visibility`, {
        linkId,
        visible,
      });

      await get().getLink();
      toast.success('Toggled');

      return { success: 'Toggled' };
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Failed to toggle visibility';
      toast.error(message);
      return { error: message };
    } finally {
      set({ isLoading: false });
    }
  },
}));
