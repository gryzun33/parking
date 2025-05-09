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
import { useState } from 'react';
import { DEFAULT_LOCALE, DEFAULT_TIME_ZONE } from '@/utils/constants/locale';

type Props = {
  children: React.ReactNode;
  date: Date;
};

export const DayDetailsPopup = ({ children, date }: Props) => {
  const [open, setOpen] = useState(false);

  const { slug } = useParams();

  const dateStr = date.toLocaleDateString(DEFAULT_LOCALE, {
    timeZone: DEFAULT_TIME_ZONE,
  });

  const { data, error, isLoading } = useGetParkingSpotDayInfoQuery(
    open && slug ? { slug, dateStr } : skipToken
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {open && (
        <DialogContent className="sm:max-w-md flex flex-col items-center p-2 sm:p-4">
          <DialogTitle>
            {format(date, 'd MMMM yyyy, EEEE', { locale: ru })}
          </DialogTitle>

          {isLoading && <Loader />}

          {error && <AlertDestructive message="Ошибка при загрузке слотов" />}

          {data && (
            <>
              <DialogDescription className="text-base sm:text-lg text-slate-700">
                Доступные слоты
              </DialogDescription>
              <SlotBookingForm
                slots={data}
                date={dateStr}
                onClose={() => setOpen(false)}
              />
            </>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};
