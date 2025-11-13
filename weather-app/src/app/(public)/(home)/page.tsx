import { CityList } from '@/components/city/city-list/city-list';
import { SearchBar } from '@/components/search-bar/search-bar';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50font-sans'>
      <main className='flex min-h-screen w-full flex-col items-center py-32 px-16 bg-gray-50 dark:bg-gray-900 dark:text-zinc-50 sm:items-start'>
        <SearchBar />
        <CityList />
      </main>
    </div>
  );
}
