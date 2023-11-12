import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex flex-col w-full items-center'>
      <SignIn />
      <p className='text-xs z-50 text-center pt-5 pb-2 w-full'>
        Use the following credentials for exploring with the admin view:
      </p>
      <p className='text-xs z-50 text-center p-1 w-full'>
        Email address:
        <em> jmahapatra.dev@gmail.com</em>
      </p>
      <p className='text-xs z-50 text-center p-1 w-full'>
        Password:<em> jm_admin</em>
      </p>
    </div>
  );
}
