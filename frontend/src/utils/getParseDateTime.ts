import { format, isBefore } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { ru } from 'date-fns/locale';
import { DEFAULT_TIME_ZONE } from './constants/locale';

export const parseReservationDateTime = (
  reservedDate: string,
  reservedTime: string
) => {
  const reservationDate = new Date(reservedDate);

  const startHour = parseInt(reservedTime.split('.')[0]);

  const reservationDateTime = new Date(reservationDate);
  reservationDateTime.setHours(startHour, 0, 0, 0);

  const now = toZonedTime(new Date(), DEFAULT_TIME_ZONE);

  const formattedDate = format(reservationDate, 'd MMMM yyyy, EEEE', {
    locale: ru,
  });

  return {
    isPast: isBefore(reservationDateTime, now),
    formattedDate,
  };
};
