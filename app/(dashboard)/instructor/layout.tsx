import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { isInstructor } from '@/lib/instructor';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!isInstructor(userId)) {
    return redirect('/');
  }
  return <>{children}</>;
};

export default InstructorLayout;
