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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

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

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { updateLoading, updateLink, getLink } = userLinkStore();

  const openModal = () => {
    reset({
      linkId: link.linkId,
      title: link.title,
      url: link.url,
    });
    setError('');
    setSuccess('');
    setOpen(true);
  };

  const onSubmit = async (data: UpdateLinkFormatData) => {
    const res = await updateLink(data);
    if (res.error) {
      setError(res.error);
      toast.error('Error updating link');
    } else if (res.success) {
      setError('');
      toast.success('Link updated!');
      setSuccess(res.success);
      getLink();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger(openModal)}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register('title')} />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="url">URL</Label>
            <Input id="url" {...register('url')} />
            {errors.url && (
              <p className="text-sm text-red-500 mt-1">{errors.url.message}</p>
            )}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}
          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {updateLoading ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLinkModal;
