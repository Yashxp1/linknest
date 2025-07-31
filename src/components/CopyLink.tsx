'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userProfileStore } from '@/store/profileStore';
import { Share } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CopyLink() {
  const profile = userProfileStore((state) => state.profile);
  const slug = profile?.slug;
  const url = slug ? `${window.location.origin}/user/${slug}` : '';

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Copied');
      setTimeout(() => setCopied(false), 2000); // reset after 2 sec
    } catch (err) {
      console.error('Copy failed:', err);
      toast.error('Failed to copy');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Share <Share className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Profile</DialogTitle>
          <DialogDescription>
            You can share this link with anyone to view your profile.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="profile-link">Your shareable URL</Label>
            <Input
              id="profile-link"
              type="text"
              readOnly
              value={url}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
