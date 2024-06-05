import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex flex-col w-full items-center'>
      <SignIn />
    </div>
  );
}
