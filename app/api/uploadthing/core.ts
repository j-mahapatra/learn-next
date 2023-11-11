import { auth } from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { isInstructor } from '@/lib/instructor';

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  const isUserInstructor = isInstructor(userId);

  if (!userId || !isUserInstructor) {
    throw new Error('Unauthorized');
  }

  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileCount: 1, maxFileSize: '4MB' } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(['text', 'image', 'video', 'audio', 'pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: '1GB' } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
