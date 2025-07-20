'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

type ReusableModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit?: () => void;
  showFooter?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
};
const ReusableModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  showFooter = true,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  loading = false,
}: ReusableModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-2">{children}</div>

        {showFooter && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{cancelLabel}</Button>
            </DialogClose>
            <Button type="button" onClick={onSubmit} disabled={loading}>
              {loading ? 'Saving...' : submitLabel}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReusableModal;
