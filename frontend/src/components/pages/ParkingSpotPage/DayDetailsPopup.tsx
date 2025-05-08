import { useGetParkingSpotDayInfoQuery } from '@/api/parkingSpotApiSlice';
import { AlertDestructive } from '@/components/shared/AlertDestructive';
import Loader from '@/components/shared/Loader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useParams } from 'react-router';
import SlotBookingForm from './SlotBookingForm';

type Props = {
  children: React.ReactNode;
  date: Date;
};

export const DayDetailsPopup = ({ children, date }: Props) => {
  const { slug } = useParams();

  const dateStr = date.toLocaleDateString('sv-SE', {
    timeZone: 'Europe/Minsk',
  });

  const { data, error, isLoading } = useGetParkingSpotDayInfoQuery(
    slug ? { slug, dateStr } : skipToken
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col items-center p-2 sm:p-4">
        <DialogTitle>
          {' '}
          {format(date, 'd MMMM yyyy, EEEE', { locale: ru })}
        </DialogTitle>

        {isLoading && <Loader />}

        {error && <AlertDestructive message="Ошибка при загрузке слотов" />}

        {data && (
          <>
            <DialogDescription className="text-base sm:text-lg text-slate-700">
              Доступные слоты
            </DialogDescription>
            <SlotBookingForm slots={data} date={dateStr} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
