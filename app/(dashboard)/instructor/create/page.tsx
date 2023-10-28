'use client';

import { useRouter } from 'next/navigation';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Course title is a required field.',
  }),
});

const CreatePage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/courses', values);
      router.push(`/instructor/courses/${response.data.id}`);
      toast.success('Course created successfully.');
    } catch {
      toast.error('Something went wrong!');
    }
  };
  return (
    <div className='flex w-full h-full p-4 px-6 justify-center sm:justify-normal items-center sm:items-stretch'>
      <div>
        <h1 className='text-2xl mb-3'>Enter your Course Title</h1>
        <p className='text-xs mb-3'>
          Name your course. This can be changed later.
        </p>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title:</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. "Machine Learning"' {...field} />
                  </FormControl>
                  <FormDescription className='text-xs'>
                    This is your course title. It describes the content of your
                    course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-1'>
              <Link href='/'>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </Link>
              <Button type='submit' disabled={isSubmitting || !isValid}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
