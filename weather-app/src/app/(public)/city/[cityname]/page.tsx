import type { Metadata } from 'next';
import DetailsPage from './city-page';

type ParamsProps = {
  cityname: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}): Promise<Metadata> {
  return {
    title: (await params).cityname,
  };
}

async function CityPage({ params }: { params: ParamsProps }) {
  const { cityname } = await params;
  return <DetailsPage cityname={cityname} />;
}

export default CityPage;
