import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { PencilRuler } from 'lucide-react';

import { db } from '@/lib/database';
import { IconBadge } from '@/components/ui/icon-badge';
import TitleForm from '@/components/title-form';

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  if (!userId || !course) {
    return redirect('/');
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-bold'>Course Setup</h1>
          <p className='text-sm'>
            Complete all fields {`(${completedFields}/${totalFields})`}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
        <div>
          <div className='flex items-center gap-x-1'>
            <IconBadge icon={PencilRuler} />
            <h2 className='text-xl px-1'>Customize Your Course</h2>
          </div>
          <TitleForm courseId={course.id} initialData={course} />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
