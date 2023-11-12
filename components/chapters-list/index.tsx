'use client';

import { useEffect, useState } from 'react';
import { Chapter } from '@prisma/client';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

import { cn } from '@/lib/utils';
import { GripVertical, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChaptersListProps {
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  items: Chapter[];
}

const ChaptersList = ({ onEdit, onReorder, items }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='chapters'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className='flex items-center bg-background gap-x-2 border-border border rounded-md text-sm mb-4'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className='px-2 py-4 border-r border-r-border rounded-l-md tansition'
                      {...provided.dragHandleProps}
                    >
                      <GripVertical className='h-4 w-4 hover:text-primary' />
                    </div>
                    <p className='text-left text-ellipsis line-clamp-1'>
                      {chapter.title}
                    </p>
                    <div className='flex items-center ml-auto gap-x-2 pr-2'>
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          'bg-primary',
                          !chapter.isPublished && 'bg-secondary'
                        )}
                      >
                        {chapter.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                      <button onClick={() => onEdit(chapter.id)}>
                        <Pencil className='h-4 w-4 hover:text-primary' />
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;
