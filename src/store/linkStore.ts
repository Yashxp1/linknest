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

interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const isAxiosError = (error: unknown): error is AxiosErrorResponse => {
  return error instanceof Error && 'response' in error;
};

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
  links: Link[];
  visibleLinks: VisibleLink[];
  shareableData?: ShareableData;

  linksLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  visibilityLoading: boolean;
  reorderLoading: boolean;
  shareLoading: boolean;
  addLoading: boolean;

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
  links: [],
  visibleLinks: [],
  shareableData: undefined,

  linksLoading: false,
  updateLoading: false,
  deleteLoading: false,
  visibilityLoading: false,
  reorderLoading: false,
  shareLoading: false,
  addLoading: false,

  setLinks: (links) => set({ links }),

  setLink: async (data) => {
    set({ addLoading: true });
    try {
      const res = await axios.post(`${baseURL}/links`, data);
      const response = res.data as { message?: string };

      toast.success(response.message || 'Link added successfully');
      await get().getLink();
      return { success: response.message || 'Link added successfully' };
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Failed to add link!'
        : 'Failed to add link!';
      toast.error(message);
      return { error: message };
    } finally {
      set({ addLoading: false });
    }
  },

  getLink: async () => {
    set({ linksLoading: true });
    try {
      const res = await axios.get(`${baseURL}/links`);
      const response = res.data as { success: boolean; res: Link[] };
      set({ links: response.res });
      await get().getVisibleLink();
      return { success: 'Links fetched successfully' };
    } catch (error: unknown) {
      toast.error('Failed to get link!');
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Failed to get link!'
        : 'Failed to get link!';
      return { error: message };
    } finally {
      set({ linksLoading: false });
    }
  },

  shareLink: async (slug) => {
    set({ shareLoading: true });
    try {
      const res = await axios.get(`${baseURL}/user/${slug}`);
      const response = res.data as { profile: ShareableData };

      set({ shareableData: response.profile });
      toast.success('User profile fetched');
      console.log('USER DATA --->', response.profile);
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Failed to get shared link!'
        : 'Failed to get shared link!';
      toast.error(message);
    } finally {
      set({ shareLoading: false });
    }
  },

  getVisibleLink: async () => {
    set({ visibilityLoading: true });
    try {
      const res = await axios.get(`${baseURL}/links/visibility`);
      const response = res.data as { success: boolean; res: Link[] };
      set({ visibleLinks: response.res });

      console.log('LINKS --->', response.res);
      return { success: 'Links fetched successfully' };
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Failed to get link!'
        : 'Failed to get link!';
      toast.error(message);
      return { error: message };
    } finally {
      set({ visibilityLoading: false });
    }
  },

  updateLink: async (data) => {
    set({ updateLoading: true });
    try {
      const res = await axios.put(`${baseURL}/links`, data);
      const response = res.data as { message?: string };
      toast.success(response.message || 'Link updated successfully');
      return { success: response.message || 'Link updated successfully' };
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Failed to update link!'
        : 'Failed to update link!';
      toast.error(message);
      return { error: message };
    } finally {
      set({ updateLoading: false });
    }
  },

  deleteLink: async () => {
    set({ deleteLoading: true });
    try {
      const res = await axios.delete(`${baseURL}/links`);
      const response = res.data as { message?: string };
      toast.success(response.message || 'Link deleted successfully');
      return { success: response.message || 'Link deleted successfully' };
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Failed to delete link!'
        : 'Failed to delete link!';
      toast.error(message);
      return { error: message };
    } finally {
      set({ deleteLoading: false });
    }
  },

  toggleVisibilty: async (linkId, visible) => {
    set({ visibilityLoading: true });

    try {
      await axios.put(`${baseURL}/links/visibility`, {
        linkId,
        visible,
      });

      await get().getLink();
      toast.success('Toggled');
      return { success: 'Toggled' };
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Failed to toggle visibility'
        : 'Failed to toggle visibility';
      toast.error(message);
      return { error: message };
    } finally {
      set({ visibilityLoading: false });
    }
  },

  reorderLinks: async (orderedLinkIds) => {
    // set({ isLoading: true });
    try {
      await axios.put(`${baseURL}/links/reorder`, {
        orderedLinkIds,
      });

      await get().getLink();
      toast.success('Link order updated successfully');
      return { success: 'Link order updated successfully' };
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Failed to update order'
        : 'Failed to update order';
      toast.error(message);
      return { error: message };
      // } finally {
      //   set({ isLoading: false });
    }
  },
}));
