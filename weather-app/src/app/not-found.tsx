import Link from 'next/link';

function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center px-4'>
      <h1 className='text-7xl font-bold mb-4'>404</h1>
      <p className='text-neutral-600 mb-6'>
        This page does not exist or maybe moved to another place
      </p>
      <Link href='/'>Back to home</Link>
    </div>
  );
}

export default NotFound;
