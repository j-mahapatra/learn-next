import Link from 'next/link';
import Image from 'next/image';
import { BookOpenText } from 'lucide-react';

import { IconBadge } from '@/components/ui/icon-badge';
import CourseProgress from '@/components/course-progress';

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };
  return (
    <Link href={`/courses/${id}`}>
      <div className='group hover:shadow-sm transition overflow-hidden border rounded-md p-4 h-full'>
        <div className='relative w-full aspect-video rounded-md overflow-hidden'>
          <Image fill className='object-cover' alt={title} src={imageUrl} />
        </div>
        <div className='flex flex-col pt-2'>
          <div className='text-lg md:text-base font-medium group-hover:text-ring transition line-clamp-2'>
            {title}
          </div>
          <p className='text-xs text-muted-foreground'>{category}</p>
          <div className='my-3 flex items-center gap-x-2 text-sm md:text-xs'>
            <div className='flex items-center gap-x-1'>
              <IconBadge size='sm' icon={BookOpenText} />
              <p>
                {chaptersLength} {chaptersLength === 1 ? 'Chapter' : 'Chapters'}
              </p>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              value={progress}
              size='sm'
              variant={progress === 100 ? 'success' : 'default'}
            />
          ) : (
            <p className='text-md md:text-sm font-medium'>
              {formattedPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
