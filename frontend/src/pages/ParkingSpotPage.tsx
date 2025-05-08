import { useGetParkingSpotMonthInfoQuery } from '@/api/parkingSpotApiSlice';
import ParkingCalendar from '@/components/pages/ParkingSpotPage/ParkingCalendar';
import { AlertDestructive } from '@/components/shared/AlertDestructive';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { ArrowLeft } from 'lucide-react';
import { NavLink, useParams } from 'react-router';

const ParkingSpotPage = () => {
  const { slug } = useParams();

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const { data, error, isLoading } = useGetParkingSpotMonthInfoQuery(
    slug ? { slug, year, month } : skipToken
  );

  if (isLoading) return <Loader />;

  if (error) return <AlertDestructive message={getErrorMessage(error)} />;

  if (!data || !data.parkingSpot || !data.monthInfo) {
    return (
      <div className="text-center py-8">Нет данных о парковочном месте</div>
    );
  }

  const { parkingSpot, monthInfo } = data;

  return (
    <div className="container mx-auto max-w-lg py-8 flex flex-col items-center">
      <h1 className="text-2xl text-center font-bold">
        Бронирование парковочного места
      </h1>
      <p className="text-xl font-semibold">{`${parkingSpot.slug.toUpperCase()}, ${
        parkingSpot.location
      }`}</p>

      <Card className="mt-5 p-3">
        <ParkingCalendar dates={monthInfo} />
      </Card>
      <Button asChild className="mt-3" variant="secondary">
        <NavLink to="/">
          {' '}
          <ArrowLeft />
          Назад
        </NavLink>
      </Button>
    </div>
  );
};

export default ParkingSpotPage;
