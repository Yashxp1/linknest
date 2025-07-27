import {
  deleteSchema,
  linkSchema,
  linkUpdateSchema,
} from '@/schemas/linkSchema';
import { toast } from 'sonner';
import { create } from 'zustand';
import { z } from 'zod';
import axios from 'axios';
import { userProfileStore } from './profileStore';

const baseURL = 'http://localhost:3000/api';

export type Link = {
  id: string;
  title: string;
  url: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  visible: boolean;
};

type VisibleLink = {
  id: string;
  title: string;
  url: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  visible: boolean;
};

type LinkStore = {
  isLoading: boolean;
  links: Link[];
  visibleLinks: VisibleLink[];
  setLinks: (links: Link[]) => void;

  setLink: (
    data: z.infer<typeof linkSchema>
  ) => Promise<{ success?: string; error?: string }>;

  getLink: () => Promise<{ success?: string; error?: string }>;

  getVisibleLink: () => Promise<{ success?: string; error?: string }>;

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
  updateLinkOrder: (orderedIds: string[]) => Promise<void>;
};

export const userLinkStore = create<LinkStore>((set, get) => ({
  isLoading: false,
  links: [],
  visibleLinks: [],

  // visible:true,

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
      await get().getVisibleLink();

      return { success: 'Links fetched successfully' };
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to get link!');
      return { error: error.response?.data?.message || 'Failed to get link!' };
    } finally {
      set({ isLoading: false });
    }
  },

  getVisibleLink: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${baseURL}/links/visibility`);
      const response = res.data as { success: boolean; res: Link[] };
      set({ visibleLinks: response.res });

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

      const slug = userProfileStore.getState().profile?.slug;
      if (slug) {
        await userProfileStore.getState().getProfile(slug);
      }

      await get().getLink();
      toast.success(`Enabled`);
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

  updateLinkOrder: async (orderedIds: string[]) => {
    try {
      const res = await axios.put(`${baseURL}/links/reorder`, {
        orderedLinkIds: orderedIds,
      });
  
      console.log("✅ Reorder response:", res.data);
  
      
      await new Promise(r => setTimeout(r, 200));
      await get().getLink();
    } catch (error) {
      console.error('🔥 Reorder API error:', error);
      toast.error("Failed to reorder links");
    }
  }
  
}));
