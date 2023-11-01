import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { FileBadge2, IndianRupee, Library, PencilRuler } from 'lucide-react';

import { db } from '@/lib/database';
import { IconBadge } from '@/components/ui/icon-badge';
import TitleForm from '@/components/title-form';
import DescriptionForm from '@/components/description-form';
import ImageForm from '@/components/image-form';
import CategoryForm from '@/components/category-form';
import PriceForm from '@/components/price-form';
import AttachmentForm from '@/components/attachment-form';
import ChaptersForm from '@/components/chapters-form';

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
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
    course.chapters.some((chapter) => chapter.isPublished),
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
          <DescriptionForm courseId={course.id} initialData={course} />
          <ImageForm courseId={course.id} initialData={course} />
          <CategoryForm
            courseId={course.id}
            initialData={course}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div className='space-y-5'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={Library} />
              <h2 className='text-xl px-1'>Course Chapters</h2>
            </div>
            <ChaptersForm courseId={course.id} initialData={course} />
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={IndianRupee} />
              <h2 className='text-xl px-1'>Sell Your Course</h2>
            </div>
            <PriceForm courseId={course.id} initialData={course} />
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={FileBadge2} />
              <h2 className='text-xl px-1'>Additional Resources</h2>
            </div>
            <AttachmentForm courseId={course.id} initialData={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
