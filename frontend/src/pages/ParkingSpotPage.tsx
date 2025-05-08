import { useGetParkingSpotMonthInfoQuery } from '@/api/parkingSpotApiSlice';
import { AlertDestructive } from '@/components/shared/AlertDestructive';
import Loader from '@/components/shared/Loader';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useParams } from 'react-router';

const ParkingSpotPage = () => {
  const { slug } = useParams();

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const {
    data: { parkingSpot, monthInfo } = {},
    error,
    isLoading,
  } = useGetParkingSpotMonthInfoQuery(slug ? { slug, year, month } : skipToken);

  if (isLoading) return <Loader />;

  if (error) return <AlertDestructive message={getErrorMessage(error)} />;

  return (
    <>
      <div>Парковочное место {slug}</div>
      <div>{parkingSpot?.id}</div>
      <div>{parkingSpot?.location}</div>
      <div>{monthInfo?.length}</div>
      {monthInfo?.map((day) => (
        <div>
          <div>{day.date}</div>
          <div>{day.status}</div>
        </div>
      ))}
    </>
  );
};

export default ParkingSpotPage;
