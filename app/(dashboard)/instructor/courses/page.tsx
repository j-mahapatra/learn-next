import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CoursesPage() {
  return (
    <div className='p-5'>
      <Link href='/instructor/create'>
        <Button>Create New Course</Button>
      </Link>
    </div>
  );
}
