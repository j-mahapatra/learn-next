import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-full w-full'>
      <div className='sticky w-full md:pl-[25%] inset-y-0 z-10 bg-background'>
        <Navbar />
      </div>
      <div className='hidden md:flex h-full w-1/4 flex-col fixed inset-y-0 z-10'>
        <Sidebar />
      </div>
      <main className='md:pl-[25%] h-full w-full'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
