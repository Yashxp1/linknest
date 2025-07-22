import { linkUpdateSchema } from '@/schemas/linkSchema';
import { userLinkStore } from '@/store/linkStore';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type UpdateLinkFormatData = z.infer<typeof linkUpdateSchema>;

interface UpdateLinkModalProps {
  trigger: (openModal: () => void) => React.ReactNode;
  link: {
    linkId: string;
    title: string;
    url: string;
  };
}
const UpdateLinkModal = ({ trigger, link }: UpdateLinkModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateLinkFormatData>({
    resolver: zodResolver(linkUpdateSchema),
    defaultValues: {
      linkId: '',
      title: '',
      url: '',
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const closeModal = () => setIsOpen(false);
  const openModal = () => {
    reset({
      linkId: link.linkId,
      title: link.title,
      url: link.url,
    });
    setSuccess('');
    setError('');
    setIsOpen(true);
  };

  const { isLoading, updateLink, getLink } = userLinkStore();

  const onSubmit = async (data: UpdateLinkFormatData) => {
    // isLoading: true;
    await updateLink(data).then((res) => {
      if (res.error) {
        setError(res.error);
        toast.error('Error adding link');
        // isLoading: false;
      }
      if (res.success) {
        setError('');
        console.log(res);
        getLink()
        toast.success('Link added!');
        setSuccess(res.success);
        closeModal();
        // isLoading: false;
      }
    });
  };

  return (
    <div>
      {trigger(openModal)}
      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-black/50  backdrop-blur-xs z-40 animate-in fade-in duration-300"
        >
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center dark:bg-[#191919] border rounded-sm p-5 bg-white w-[30%]">
              <div className="w-full flex flex-col gap-4">
                {/* <h1 className='text-4xl'>Add Link</h1> */}
                <div className=" flex flex-col gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...register('title')} />
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" {...register('url')} />
                  {errors.url && (
                    <p className="text-sm text-red-500">{errors.url.message}</p>
                  )}
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}
              <div className="flex gap-4 pt-4 justify-center items-center">
                <Button
                  onClick={closeModal}
                  variant="outline"
                  className="w-full "
                >
                  Close
                </Button>
                <Button type="submit" className="w-full">
                {isLoading ? 'Updating...' : 'Update'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateLinkModal;
