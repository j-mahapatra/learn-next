'use client';

import { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Pencil, X } from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ChapterTitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Course title is a required field.',
  }),
});

const ChapterTitleForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

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
        <p className='text-lg'>Chapter Title</p>
        <Button
          variant='ghost'
          className='hover:text-ring'
          onClick={toggleEdit}
        >
          {isEditing ? (
            <X className='h-4 w-4' />
          ) : (
            <Pencil className='h-4 w-4' />
          )}
        </Button>
      </div>
      <div className='py-2 px-2'>
        {isEditing ? (
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='e.g. "Introduction..."' {...field} />
                    </FormControl>
                    <FormDescription className='text-xs'>
                      This is your chapter title. It describes the content of
                      the chapter.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center gap-1'>
                <Button type='submit' disabled={isSubmitting || !isValid}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <p className='italic text-sm'>{initialData.title}</p>
        )}
      </div>
    </div>
  );
};

export default ChapterTitleForm;
