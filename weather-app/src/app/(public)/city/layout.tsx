import React from 'react';
import type { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className='flex min-h-screen w-full flex-col items-start justify-between pt-28 bg-gray-50 dark:bg-gray-900 dark:text-zinc-50 sm:items-start'>
      {children}
    </div>
  );
}

export default Layout;
