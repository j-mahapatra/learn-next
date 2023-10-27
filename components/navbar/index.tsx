import NavbarRoutes from '@/components/navbar-routes';
import MobileSidebar from './partials/mobile-sidebar';

const Navbar = () => {
  return (
    <div className='flex items-center border-b-2 p-[17px]'>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
