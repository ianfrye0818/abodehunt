import { SignUp } from '@clerk/nextjs';
export default function page() {
  return (
    <section className='h-[calc(100vh-150px)] flex flex-col justify-center items-center'>
      <SignUp redirectUrl={'/'} />
    </section>
  );
}
