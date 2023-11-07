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
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import { Input } from '@/components/ui/input';

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number(),
});

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: initialData?.price || undefined },
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

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(initialData?.price ?? 0);

  return (
    <div className='mt-5 border-border bg-accent rounded-sm p-5'>
      <div className='flex items-center justify-between font-medium pl-2'>
        <p className='text-lg'>Course Price</p>
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
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Set a price...'
                        type='number'
                        step={0.01}
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className='text-xs'>
                      This is your course price. It is the amount that the
                      student needs to pay to access the course content.
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
        ) : initialData.price ? (
          <p className='italic text-sm'>{formattedPrice}</p>
        ) : (
          <p className='italic text-sm text-muted-foreground'>No Price</p>
        )}
      </div>
    </div>
  );
};

export default PriceForm;
