import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { File } from 'lucide-react';

import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/ui/banner';
import VideoPlayer from '@/components/video-player';
import CourseEnrollButton from '@/components/course-enroll-button';
import { Separator } from '@/components/ui/separator';
import TextEditor from '@/components/text-editor';
import ChapterProgressButton from '@/components/chapter-progress-button';

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const {
    course,
    chapter,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (!course || !chapter) {
    return redirect('/');
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant='success'
          label='You have already completed this chapter.'
        />
      )}
      {isLocked && (
        <Banner
          variant='warning'
          label='You need to purchase the course to access this chapter.'
        />
      )}
      <div className='flex flex-col max-w-5xl mx-auto pb-16'>
        <div className='p-2 sm:p-5'>
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className='flex flex-col p-2 sm:p-5 md:flex-row justify-between items-center'>
          <h2 className='text-2xl font-semibold mb-2'>{chapter.title}</h2>
          {purchase ? (
            <ChapterProgressButton
              courseId={params.courseId}
              chapterId={params.chapterId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          ) : (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course.price!}
            />
          )}
        </div>
        <Separator orientation='horizontal' />
        <div>
          <TextEditor previewOnly value={chapter.description!} />
        </div>
        {!!attachments.length && (
          <>
            <Separator />
            <div className='p-5'>
              {attachments.map((attachment) => (
                <a
                  key={attachment.id}
                  href={attachment.url}
                  target='_blank'
                  className='flex items-center p-2 w-full bg-secondary border rounded-md hover:underline mb-2 gap-x-2'
                >
                  <File />
                  <p className='line-clamp-1'>{attachment.name}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChapterIdPage;
