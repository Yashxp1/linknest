'use client';
import { auth } from '@/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { userLinkStore } from '@/store/linkStore';
import { Plus } from 'lucide-react';
// import { useEffect, useState } from 'react';

interface DropDownProps {
  linkId: string;
  userId: string;
}

const DropDown = ({ linkId, userId }: DropDownProps) => {
  const { isLoading, deleteLink, getLink } = userLinkStore();
  // const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteLink({ linkId: linkId });
      if (res.success) {
        await getLink();
        //  setIsOpen(false)
      }
    } catch (error) {
      console.error('Failed to delete link:', error);
    }
  };

  // useEffect(() => {
  //   deleteLink(id);
  // }, [deleteLink]);

  return (
    <div className="  ">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Plus />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem variant="destructive"> Cancel</DropdownMenuItem>

          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDown;
