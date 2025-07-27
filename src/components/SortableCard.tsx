'use client';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grip } from 'lucide-react';
import { useEffect, useState } from 'react';
import { userLinkStore } from '@/store/linkStore';
import DropDown from './DropDown';
import { Switch } from '@/components/ui/switch';

const SortableItem = ({ link }: { link: any }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const { toggleVisibilty } = userLinkStore();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-[#0A0A0A]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          <div className="cursor-grab mr-3" {...attributes} {...listeners}>
            <Grip size={16} className="text-gray-400" />
          </div>
          <div className="flex-col min-w-0 inline-block flex-1">
            <p className="font-semibold truncate">{link.title}</p>
            <a
              href={link.url}
              target="_blank"
              className="text-sm cursor-pointer truncate"
            >
              {link.url}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 ml-4">
          <Switch
            checked={link.visible}
            onCheckedChange={(checked) => toggleVisibilty(link.id, checked)}
          />
          <DropDown link={link} />
        </div>
      </div>
    </div>
  );
};

export default function SortableCard() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px drag before sensor activates
      },
    })
  );
  const { getLink, links, updateLinkOrder } = userLinkStore();

  useEffect(() => {
    getLink();
  }, []);

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(links.map((link) => link.id));
  }, [links]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id as string);
    const newIndex = items.indexOf(over.id as string);
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    await updateLinkOrder(newItems);
  };

  return (
    <div className="m-4 space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => {
            const link = links.find((l) => l.id === id);
            if (!link) {
              console.warn(`Link not found for id: ${id}`);
              return null;
            }
            return <SortableItem key={id} link={link} />;
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
