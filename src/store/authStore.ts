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

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,

  register: async (data) => {
    set({ isLoading: true });
    try {
      await axios.post(`${baseURL}/auth/register`, data, {
        withCredentials: true,
      });
      toast.success('registered successfully');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      console.log(error)
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (data: loginData) => {
    set({ isLoading: true });
    try {
       await axios.post(`${baseURL}/auth/login`, data, {
        withCredentials: true,
      });
      toast.success('Signed in successfully');
      return true;
    } catch (error) {
      console.error(error);
      toast.error( 'Login failed');
      console.log(error)
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      await axios.post(`${baseURL}/api/logout`, {}, { withCredentials: true });
      toast.success('Logged out');
    } catch (error) {
      console.error(error);
      toast.error('Logout failed');
    } finally {
      set({ isLoading: false });
    }
  },
}));
