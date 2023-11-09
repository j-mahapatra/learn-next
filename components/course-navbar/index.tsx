import { Chapter, Course, UserProgress } from '@prisma/client';
import NavbarRoutes from '@/components/navbar-routes';
import CourseMobileSidebar from './partials/course-mobile-sidebar';

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className='flex items-center border-b-2 p-[14px]'>
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
