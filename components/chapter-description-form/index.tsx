'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Button } from '@/components/ui/button';
import { Chapter } from '@prisma/client';
import TextEditor from '@/components/text-editor';

interface ChapterDescriptionFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: 'Course description is a required field.',
  }),
});

const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData?.description || '' },
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
        <p className='text-lg'>Chapter Description</p>
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
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextEditor {...field} />
                    </FormControl>
                    <FormDescription className='text-xs'>
                      This is your chapter description. It explains what the
                      chapter contains and what the student will learn after
                      studying this chapter.
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
        ) : initialData.description ? (
          <TextEditor previewOnly={true} value={initialData.description} />
        ) : (
          <p className='italic text-sm text-muted-foreground'>No Description</p>
        )}
      </div>
    </div>
  );
};

export default ChapterDescriptionForm;
