// import { profileSchema } from '@/schemas/profileSchema';
// import { toast } from 'sonner';
// import z, { success } from 'zod';
// import axios from 'axios';
// import { create } from 'zustand';
// import { Link } from '@prisma/client';

// const baseURL = 'http://localhost:3000/api';

// type Profile = {
//   userId: string;
//   bio: string;
//   slug: string;
//   location: string; 
//   image: string;
//   createdAt: Date;
//   updatedAt: Date;
//   links: Link[];
// };

// type GetProfileResponse = {
//   profile: Profile;
// };

// type SetProfileResponse = {
//   success?: string;
//   error?: string;
// };

// type ProfileStore = {
//   profile: Profile | null;
//   isLoading: boolean;
//   setProfile: (
//     data: z.infer<typeof profileSchema>
//   ) => Promise<{ success?: string; error?: string }>;
//   deleteProfile: () => void;
//   getProfile: (slug: string) => Promise<{ profile?: any; error?: string }>;
// };

// export const userProfileStore = create<ProfileStore>((set) => ({
//   isLoading: false,
//   profile: null,

//   getProfile: async (
//     slug: string
//   ): Promise<{ profile?: any; error?: string }> => {
//     try {
//       const res = await axios.get<GetProfileResponse>(`/api/user/${slug}`);
//       const fetchedProfile = res.data.profile;
//       toast.success('Profile fetched successfully');
//       set({ profile: fetchedProfile });
//       return { profile: res.data.profile };
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to get Profile!');
//       return {
//         error: error.response?.data?.message || 'Failed to get Profile!',
//       };
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   // setProfile: async (data) => {
//   //   set({ isLoading: true });
//   //   try {
//   //     const res = await axios.post<SetProfileResponse>(
//   //       `${baseURL}/profile`,
//   //       data
//   //     );
//   //     console.log(res.data);
//   //     if (res.data.success) toast.success(res.data.success);
//   //     return res.data;
//   //   } catch (error: any) {
//   //     toast.error(error.response?.data?.message || 'Failed to set profile');
//   //     return error;
//   //   } finally {
//   //     set({ isLoading: false });
//   //   }
//   // },
//   setProfile: async (data) => {
//     try {
//       const res = await axios.post('/api/user', data);
//       toast.success('Profile set!');
//       return res.data as { success?: string; error?: string };
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to set profile');
//       return { error: 'Something went wrong' };
//     } finally {
//       set({ isLoading: false });
//     }
//   },
//   deleteProfile: async () => {},
// }));
