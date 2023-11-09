'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import MuxPlayer from '@mux/mux-player-react';
import { Loader2, Lock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useConfettiStore } from '@/hooks/use-confetti-store';

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  return (
    <div className='relative aspect-video'>
      {!isReady && !isLocked && (
        <div className='flex absolute inset-0 items-center justify-center bg-accent'>
          <Loader2 className='h-4 w-4 animate-spin' />
        </div>
      )}
      {isLocked ? (
        <div className='flex flex-col absolute inset-0 items-center justify-center bg-accent gap-y-2'>
          <Lock className='h-6 w-6' />
          <p className='text-sm'>This chapter is locked.</p>
        </div>
      ) : (
        <MuxPlayer
          title={title}
          className={cn('overflow-hidden', !isReady && 'hidden')}
          playbackId={playbackId}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {}}
          autoPlay
        />
      )}
    </div>
  );
};

export default VideoPlayer;
