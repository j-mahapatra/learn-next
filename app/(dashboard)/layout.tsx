import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full w-full'>
      <div className='fixed w-full h-20 md:pl-48 inset-y-0 z-10'>
        <Navbar />
      </div>
      <div className='hidden md:flex h-full w-48 flex-col fixed inset-y-0 z-10'>
        <Sidebar />
      </div>
      <main className='md:pl-48 pt-20 h-full w-full'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
