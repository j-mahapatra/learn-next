'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm-modal';

interface CourseActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
}

const CourseActions = ({
  disabled,
  isPublished,
  courseId,
}: CourseActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success('Course deleted successfully.');
      router.refresh();
      router.push('/instructor/courses');
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
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success('Chapter unpublished successfully.');
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success('Course published successfully.');
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

export default CourseActions;
