'use client';

import { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FileEdit, FilePlus2, Film, X } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Chapter, MuxData } from '@prisma/client';
import FileUploader from '../file-uploader';

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { videoUrl: initialData?.videoUrl || '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toggleEdit();
      toast.success('Chapter updated successfully.');
      router.refresh();
    } catch {
      toast.error('Something went wrong!');
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className='mt-5 border-border bg-accent rounded-sm p-5'>
      <div className='flex items-center justify-between font-medium pl-2'>
        <p className='text-lg'>Course Video</p>
        <Button
          variant='ghost'
          className='hover:text-ring'
          onClick={toggleEdit}
        >
          {isEditing ? (
            <X className='h-4 w-4' />
          ) : initialData?.videoUrl ? (
            <FileEdit className='h-4 w-4' />
          ) : (
            <FilePlus2 className='h-4 w-4' />
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.videoUrl ? (
          <div className='flex justify-center items-center h-48 m-2 rounded-sm bg-card'>
            <Film className='h-16 w-16 text-ring' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ''} />
          </div>
        ))}
      {isEditing && (
        <div className='flex justify-center items-center flex-col'>
          <FileUploader
            endpoint='chapterVideo'
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <p className='text-xs text-muted-foreground mt-4 text-center'>
          Video may take a while to load. Refresh if the video doesn&apos;t
          load!
        </p>
      )}
    </div>
  );
};

export default ChapterVideoForm;
