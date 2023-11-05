'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm-modal';

interface ChapterActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
  chapterId: string;
}

const ChapterActions = ({
  disabled,
  isPublished,
  courseId,
  chapterId,
}: ChapterActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success('Chapter deleted successfully.');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const onPublishOrUnpublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success('Chapter unpublished successfully.');
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success('Chapter published successfully.');
      }

      router.refresh();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center gap-x-2'>
      <Button
        onClick={onPublishOrUnpublish}
        disabled={disabled || isLoading}
        size='sm'
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button variant='destructive' size='sm' disabled={isLoading}>
          <Trash2 className='h-4 w-4' />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
