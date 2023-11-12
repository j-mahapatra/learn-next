import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { db } from '@/lib/database';
import { getProgress } from '@/actions/get-progress';
import CourseSidebar from '@/components/course-sidebar';
import CourseNavbar from '@/components/course-navbar';

export default async function CourseIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!course) {
    return redirect('/');
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='sticky w-full md:pl-[25%] inset-y-0 z-10 bg-background'>
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className='hidden md:flex h-full w-1/4 flex-col fixed inset-y-0 z-10'>
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className='md:pl-[25%] h-full w-full'>{children}</main>
    </div>
  );
}
