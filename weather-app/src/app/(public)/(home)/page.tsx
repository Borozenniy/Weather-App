import { CityList } from '@/components/city/city-list/city-list';
import { SearchBar } from '@/components/search-bar/search-bar';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-surface-light-2 dark:bg-surface-dark-2 dark:text-zinc-50'>
      <main className='flex items-start max-sm:items-center min-h-screen w-6xl flex-col py-28 px-8'>
        <SearchBar />
        <CityList />
      </main>
    </div>
  );
}
