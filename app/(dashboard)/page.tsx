import { redirect } from 'next/navigation';
import Image from 'next/image';
import { auth } from '@clerk/nextjs';

import { getDashboardCourses } from '@/actions/get-dashboard-courses';
import CoursesList from '@/components/courses-list';
import { CheckCircle, Clock } from 'lucide-react';
import InfoCard from '@/components/info-card';

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className='p-5 space-y-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <InfoCard
          icon={Clock}
          label='In Progress'
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label='Completed'
          variant='success'
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
