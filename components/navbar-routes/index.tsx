'use client';

import { usePathname, useRouter } from 'next/navigation';

import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/search-input';

const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isInstructorPage = pathname?.startsWith('/instructor');
  const isCoursePage = pathname?.includes('/chapter');
  const isSearchPage = pathname === '/search';

  const redirectToUrl = (url: string) => {
    router.push(url);
  };

  return (
    <>
      {isSearchPage && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}
      <div className='flex gap-x-2 ml-auto items-center'>
        {isInstructorPage || isCoursePage ? (
          <Button
            variant='outline'
            size='sm'
            onClick={() => redirectToUrl('/')}
          >
            Student Mode
          </Button>
        ) : (
          <Button
            variant='outline'
            size='sm'
            onClick={() => redirectToUrl('/instructor/courses')}
          >
            Instructor Mode
          </Button>
        )}
        <UserButton afterSignOutUrl='/' />
      </div>
    </>
  );
};

export default NavbarRoutes;
