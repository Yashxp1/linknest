import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';

const baseURL = '/api';

type regiterData = {
  name: string;
  username: string;
  password: string;
};

type loginData = {
  username: string;
  password: string;
};

type AuthState = {
  isLoading: boolean;
  register: (data: regiterData) => Promise<boolean>;
  login: (data: loginData) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoading: false,

  register: async (data) => {
    set({ isLoading: true });
    try {
      await axios.post(`${baseURL}/auth/register`, data, {
        withCredentials: true,
      });
      toast.success('registered successfully');
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (data: loginData) => {
    set({isLoading: true})
    try {
      const res = await axios.post(`${baseURL}/auth/login`, data, {
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
