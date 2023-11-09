import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Chapter, Course, UserProgress } from '@prisma/client';
import CourseSidebar from '@/components/course-sidebar';

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden mr-5 hover:opacity-50 transition-all'>
        <Menu />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 max-w-xs'>
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
