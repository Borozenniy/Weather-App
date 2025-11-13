import { CityList } from '@/components/city/city-list/city-list';
import { SearchBar } from '@/components/search-bar/search-bar';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <main className='flex items-start max-sm:items-center min-h-screen w-full flex-col py-32 px-16 bg-gray-50 dark:bg-gray-900 dark:text-zinc-50'>
        <SearchBar />
        <CityList />
      </main>
    </div>
  );
}
