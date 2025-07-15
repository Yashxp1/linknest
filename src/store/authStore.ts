import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';

const baseURL = 'http://localhost:3000/api';

type regiterData = {
  name: string;
  username: string;
  password: string;
};

type signinData = {
  username: string;
  password: string;
};

type AuthState = {
  isLoading: boolean;
  signup: (data: regiterData) => Promise<boolean>;
  signin: (data: signinData) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoading: false,

  // signup: async (data) => {
    set({ isLoading: true });
    try {
      await axios.post(`${baseURL}/auth/signup`, data, {
        withCredentials: true,
      });
      toast.success('signuped successfully');
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  signin: async (data: signinData) => {
    set({isLoading: true})
    try {
      const res = await axios.post(`${baseURL}/auth/signin`, data, {
        withCredentials: true,
      });
      toast.success('Signed in successfully');
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message || 'Login failed');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      await axios.post(`${baseURL}/api/logout`, {}, { withCredentials: true });
      toast.success('Logged out');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message || 'Logout failed');
    } finally {
      set({ isLoading: false });
    }
  },
}));
