import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/ui/banner';
import VideoPlayer from '@/components/video-player';

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
      </div>
    </div>
  );
};

export default ChapterIdPage;
