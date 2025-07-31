import {
  deleteSchema,
  linkSchema,
  linkUpdateSchema,
} from '@/schemas/linkSchema';
import { toast } from 'sonner';
import { create } from 'zustand';
import { z } from 'zod';
import axios from 'axios';
import { Profile } from './profileStore';

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

type VisibleLink = Link;

type ShareableData = Profile;

type LinkStore = {
  isLoading: boolean;
  links: Link[];
  visibleLinks: VisibleLink[];
  shareableData?: ShareableData;

  setLinks: (links: Link[]) => void;

  setLink: (
    data: z.infer<typeof linkSchema>
  ) => Promise<{ success?: string; error?: string }>;

  getLink: () => Promise<{ success?: string; error?: string }>;

  shareLink: (slug: string) => Promise<void>;

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

  reorderLinks: (
    orderedLinkIds: string[]
  ) => Promise<{ success?: string; error?: string }>;
};

export const userLinkStore = create<LinkStore>((set, get) => ({
  isLoading: false,
  links: [],
  visibleLinks: [],
  shareableData: undefined,

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

  shareLink: async (slug) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${baseURL}/user/${slug}`);
      const response = res.data as { profile: ShareableData };

      set({ shareableData: response.profile });
      toast.success('User profile fetched');
      console.log("USER DATA --->", response.profile);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to get shared link!');
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

      console.log('LINKS --->', response.res);
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

  reorderLinks: async (orderedLinkIds) => {
    set({ isLoading: true });
    try {
      await axios.put(`${baseURL}/links/reorder`, {
        orderedLinkIds,
      });

      await get().getLink();
      toast.success('Link order updated successfully');
      return { success: 'Link order updated successfully' };
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update order');
      return {
        error: error.response?.data?.message || 'Failed to update order',
      };
    } finally {
      set({ isLoading: false });
    }
  },
}));
