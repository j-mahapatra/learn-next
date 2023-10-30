'use client';

import { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FileEdit, FilePlus2, ImageIcon, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import Image from 'next/image';
import FileUploader from '../file-uploader';

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Course image is a required field.',
  }),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { imageUrl: initialData?.imageUrl || '' },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toggleEdit();
      toast.success('Course updated successfully.');
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
        <p className='text-lg'>Course Image</p>
        <Button
          variant='ghost'
          className='hover:text-ring'
          onClick={toggleEdit}
        >
          {isEditing ? (
            <X className='h-4 w-4' />
          ) : initialData?.imageUrl ? (
            <FileEdit className='h-4 w-4' />
          ) : (
            <FilePlus2 className='h-4 w-4' />
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.imageUrl ? (
          <div className='flex justify-center items-center h-48 m-2 rounded-sm bg-card'>
            <ImageIcon className='h-16 w-16 text-ring' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <Image
              className='object-cover rounded-sm'
              fill
              src={initialData.imageUrl}
              alt='Course Image'
            />
          </div>
        ))}
      {isEditing && (
        <div className='flex justify-center items-center flex-col'>
          <FileUploader
            endpoint='courseImage'
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <p className='text-xs text-muted-foreground mt-4'>
            16:9 Aspect Ratio Recommended
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
