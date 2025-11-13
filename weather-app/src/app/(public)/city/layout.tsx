import React from 'react';
import type { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className='w-full min-h-screen flex items-center justify-start pt-28 bg-gray-50 dark:bg-gray-900 dark:text-zinc-50 '>
      {children}
    </div>
  );
}

export default Layout;
