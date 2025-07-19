
// import { Label } from '@radix-ui/react-dropdown-menu';
// import { Plus } from 'lucide-react';
// import React, { useState } from 'react';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { auth } from '@/auth';
// import { profileSchema } from '@/schemas/profileSchema';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { userProfileStore } from '@/store/profileStore';
// import { useRouter } from 'next/navigation';

// type ProfileFormData = z.infer<typeof profileSchema>;

// const Profile = async () => {
//   const session = await auth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<ProfileFormData>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: { bio: '', location: '', slug: '', profilePic: '' },
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const router = useRouter();

//   const { isLoading, setProfile } = userProfileStore();

//   const onSubmit = async (data: ProfileFormData) => {
//     await setProfile(data).then((res) => {
//       if (res.error) {
//         setError(res.error);
//       }
//       if (res.success) {
//         setError('');
//         console.log(res);
//         setSuccess(res.success);
//         router.push('/dashboard');
//       }
//     });
//   };

//   return (
//     <div className="w-full flex justify-center h-screen items-center">
//       <div className="w-[50%] ">
//         <div className="flex justify-center text-lg">
//           <h1 className="font-semibold">Your Profile</h1>
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="flex justify-center items-center py-4">
//             <div>
//               <img
//                 src="ss.png"
//                 alt="pfp"
//                 className="w-24 h-24 object-cover rounded-full border"
//               />
//               {/* <div className=''>
//               <Plus />
//             </div> */}
//             </div>
//           </div>
//           <div className="flex flex-col gap-8 justify-center items-center">
//             <div className="w-[70%] flex flex-col gap-4">
//               <div>
//                 <Label>Name</Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   placeholder="John Doe"
//                   defaultValue={session?.user?.name ?? ''}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <Label>Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="johndoe@gmail.com"
//                   defaultValue={session?.user?.email ?? ''}
//                   readOnly
//                 />
//               </div>

//               {/* <div>
//               <Label>Title</Label>
//               <Input id="title" type="text" placeholder="Software Engineer" />
//             </div> */}
//               <div>
//                 <Label>Add a bio</Label>
//                 <Input
//                   id="bio"
//                   type="text"
//                   placeholder="Building scalable softwares"
//                   {...register('bio')}
//                 />
//                 {errors.bio && (
//                   <p className="text-sm text-red-500">{errors.bio.message}</p>
//                 )}
//               </div>
//               <div>
//                 <Label>Location</Label>
//                 <Input
//                   id="location"
//                   type="text"
//                   placeholder="San Francisco"
//                   {...register('location')}
//                 />
//                 {errors.location && (
//                   <p className="text-sm text-red-500">
//                     {errors.location.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div>
//               <Button type="submit">
//                 {isLoading ? 'Loading...' : 'Save and continue'}
//               </Button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;
