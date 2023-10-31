'use client';

import { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Delete, File, FilePlus2, Loader2, Trash2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Attachment, Course } from '@prisma/client';
import FileUploader from '../file-uploader';

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteFileId, setDeleteFileId] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: initialData?.attachments || '' },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toggleEdit();
      toast.success('Course updated successfully.');
      router.refresh();
    } catch {
      toast.error('Something went wrong!');
    }
  };

  const onDelete = async (attachmentId: string) => {
    try {
      setDeleteFileId(attachmentId);
      await axios.delete(
        `/api/courses/${courseId}/attachments/${attachmentId}`
      );
      toast.success('Attachment deleted successfully.');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setDeleteFileId(null);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className='mt-5 border-border bg-accent rounded-sm p-5'>
      <div className='flex items-center justify-between font-medium pl-2'>
        <p className='text-lg'>Course Attachments</p>
        <Button
          variant='ghost'
          className='hover:text-ring'
          onClick={toggleEdit}
        >
          {!isEditing && <FilePlus2 className='h-4 w-4' />}
        </Button>
      </div>
      {!isEditing ? (
        <>
          {initialData?.attachments.length === 0 ? (
            <p className='italic text-sm text-muted-foreground p-2 pb-0'>
              No Attachments
            </p>
          ) : (
            <div className='space-y-2 mt-2'>
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className='flex items-center justify-between w-full p-2'
                >
                  <File className='h-4 w-4 mx-2' />
                  <p className='line-clamp-1 text-xs '>{attachment.name}</p>
                  {deleteFileId === attachment.id ? (
                    <div>
                      <Loader2 className='h-4 w-4 mr-4 animate-spin' />
                    </div>
                  ) : (
                    <button onClick={() => onDelete(attachment.id)}>
                      <Trash2 className='h-4 w-4 mr-4 hover:text-destructive' />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className='flex justify-center items-center flex-col'>
          <FileUploader
            endpoint='courseAttachment'
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
