import Link from 'next/link';
import { redirect } from 'next/navigation';
import { db } from '@/lib/database';
import { auth } from '@clerk/nextjs';
import { ArrowBigLeft, PencilRuler, ScanEye, Video } from 'lucide-react';

import { IconBadge } from '@/components/ui/icon-badge';
import ChapterTitleForm from '@/components/chapter-title-form';
import ChapterDescriptionForm from '@/components/chapter-description-form';
import ChapterAccessForm from '@/components/chapter-access-form';
import ChapterVideoForm from '@/components/chapter-video-form';

const ChapterPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect('/');
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <div className='w-full mr-auto'>
          <Link
            className='flex items-center justify-left text-sm hover:text-ring tansition mb-6'
            href={`/instructor/courses/${params.courseId}`}
          >
            <ArrowBigLeft /> Back to Course Setup
          </Link>
          <div className='flex justify-between items-center w-full'>
            <div className='flex flex-col gap-y-2'>
              <h1 className='text-2xl font-bold'>Chapter Setup</h1>
              <p className='text-sm'>
                Complete all fields {`(${completedFields}/${totalFields})`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
        <div className='space-y-4'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={PencilRuler} />
              <h2 className='text-xl px-1'>Customize Your Chapter</h2>
            </div>
            <ChapterTitleForm
              courseId={params.courseId}
              initialData={chapter}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              courseId={params.courseId}
              initialData={chapter}
              chapterId={params.chapterId}
            />
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={ScanEye} />
              <h2 className='text-xl px-1'>Access Settings</h2>
            </div>
            <ChapterAccessForm
              courseId={params.courseId}
              initialData={chapter}
              chapterId={params.chapterId}
            />
          </div>
        </div>
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={Video} />
            <h2 className='text-xl px-1'>Chapter Video</h2>
          </div>
          <ChapterVideoForm
            courseId={params.courseId}
            initialData={chapter}
            chapterId={params.chapterId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
