import { SignIn } from '@clerk/nextjs';

export default function Signin() {
  return (
    <section className='h-[calc(100vh-150px)] flex flex-col justify-center items-center'>
      <SignIn redirectUrl={'/'} />
    </section>
  );
}
