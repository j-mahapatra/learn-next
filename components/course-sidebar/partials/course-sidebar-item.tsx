'use client';

import { usePathname, useRouter } from 'next/navigation';
import { CheckSquare, LockKeyhole, PlaySquare } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? LockKeyhole : isCompleted ? CheckSquare : PlaySquare;

  const isActive = pathname?.includes(id);

  const onChapterClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className='flex'>
      <button
        className={cn(
          'group flex w-full py-3 items-center gap-x-3 text-sm font-normal pl-6 transition-all',
          isActive ? 'bg-accent' : 'hover:bg-ring',
          isCompleted && 'bg-secondary text-ring hover:text-primary-foreground'
        )}
        onClick={onChapterClick}
      >
        <div>
          <Icon
            className={cn(
              'h-4 w-4',
              isCompleted && 'text-ring group-hover:text-primary-foreground'
            )}
          />
        </div>
        <p className='text-left'>{label}</p>
      </button>
      <div
        className={cn(
          'flex right-0 border-2 transition-all border-primary',
          isActive ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
};

export default CourseSidebarItem;
