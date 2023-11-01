'use client';

import { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PlusSquare, X } from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Chapter, Course } from '@prisma/client';
import { Input } from '@/components/ui/input';

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '' },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success('Chapter created successfully.');
      toggleCreate();
      router.refresh();
    } catch {
      toast.error('Something went wrong!');
    }
  };

  const toggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  return (
    <div className='mt-5 border-border bg-accent rounded-sm p-5'>
      <div className='flex items-center justify-between font-medium pl-2'>
        <p className='text-lg'>Course Chapters</p>
        <Button
          variant='ghost'
          className='hover:text-ring'
          onClick={toggleCreate}
        >
          {isCreating ? (
            <X className='h-4 w-4' />
          ) : (
            <PlusSquare className='h-4 w-4' />
          )}
        </Button>
      </div>
      <div className='py-2 px-2'>
        {isCreating ? (
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='e.g. "Introduction"' {...field} />
                    </FormControl>
                    <FormDescription className='text-xs'>
                      This is your chapter title. It gives a brief idea about
                      the content of the chapter.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={isSubmitting || !isValid}>
                Create
              </Button>
            </form>
          </Form>
        ) : initialData?.chapters.length === 0 ? (
          <p className='italic text-sm text-muted-foreground'>No Chapters</p>
        ) : (
          <>
            {/* <div>Add Chapters here</div> */}
            <p className='text-xs text-muted-foreground pt-5 text-center'>
              Drag to reorder the chapters.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ChaptersForm;
