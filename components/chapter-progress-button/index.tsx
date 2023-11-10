'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle, Undo } from 'lucide-react';

import { useConfettiStore } from '@/hooks/use-confetti-store';
import { Button } from '@/components/ui/button';

interface ChapterProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

const ChapterProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: ChapterProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success('Progress updated successfully.');
      router.refresh();
    } catch {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? Undo : CheckCircle;

  return (
    <Button
      className='w-full md:w-auto'
      disabled={isLoading}
      type='button'
      variant={isCompleted ? 'secondary' : 'outline'}
      onClick={onClick}
    >
      <Icon className='h-4 w-4 mr-2' />
      {isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
    </Button>
  );
};

export default ChapterProgressButton;
