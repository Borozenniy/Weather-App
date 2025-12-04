import React from 'react';
import type { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className='w-full min-h-screen flex items-center justify-center pt-18 bg-surface-light-1 dark:bg-gray-800 dark:text-zinc-50'>
      {children}
    </div>
  );
}

export default Layout;
