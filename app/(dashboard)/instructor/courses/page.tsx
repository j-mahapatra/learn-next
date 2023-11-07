import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { db } from '@/lib/database';
import { columns } from '@/components/table/columns';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/table/data-table';

export default async function CoursesPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='p-5'>
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
