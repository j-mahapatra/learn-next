import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { Chapter, Course, UserProgress } from '@prisma/client';
import { db } from '@/lib/database';
import CourseSidebarItem from './partials/course-sidebar-item';
import CourseProgress from '@/components/course-progress';

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className='flex flex-col h-full overflow-y-auto border-r-2'>
      <div className='flex items-center justify-center p-5'>
        <h1 className='font-semibold text-center'>{course.title}</h1>
      </div>
      {purchase && (
        <div className='px-2'>
          <CourseProgress
            variant={progressCount === 100 ? 'success' : 'default'}
            value={progressCount}
          />
        </div>
      )}
      <div className='flex flex-col w-full'>
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
