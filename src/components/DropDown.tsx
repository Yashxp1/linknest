'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { userLinkStore } from '@/store/linkStore';
import { Pencil, Plus } from 'lucide-react';
// import { useEffect, useState } from 'react';
import UpdateLinkModal from './Modal/UpdateLinkModal';

interface DropDownProps {
  link: {
    linkId: string;
    title: string;
    url: string;
    userId: string;
  };
}

const DropDown = ({ link }: DropDownProps) => {
  const { deleteLoading, deleteLink, getLink } = userLinkStore();
  // const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteLink({ linkId: link.linkId });
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
      <UpdateLinkModal
        trigger={(openModal) => (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Plus />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem variant="destructive"> Cancel</DropdownMenuItem>

              <DropdownMenuItem onClick={openModal}>Edit</DropdownMenuItem>

              <DropdownMenuItem onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        link={{
          linkId: link.linkId,
          title: link.title,
          url: link.url,
        }}
      />
    </div>
  );
};

export default DropDown;
