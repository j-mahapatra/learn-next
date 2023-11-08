import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { db } from '@/lib/database';
import { getCourses } from '@/actions/get-courses';
import Categories from '@/components/categories';
import SearchInput from '@/components/search-input';
import CoursesList from '@/components/courses-list';

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className='px-5 pt-5 block md:hidden md:mb-0'>
        <SearchInput />
      </div>
      <div className='p-5'>
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
}
