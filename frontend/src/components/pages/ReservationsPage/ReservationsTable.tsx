import { useGetUserReservationsQuery } from '@/api/reservationApiSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import { parseReservationDateTime } from '@/utils/getParseDateTime';
import { Trash2 } from 'lucide-react';
import CancelReservationModal from './CancelReservationModal';

const ReservationsTable = () => {
  const { data: reservations } = useGetUserReservationsQuery();

  console.log('reservations=', reservations);
  return (
    <div className="w-full shadow-md rounded-md bg-slate-50 overflow-hidden">
      <div className="flex font-semibold text-slate-100 bg-slate-700 border-b p-2 sm:p-3 text-sm sm:text-base items-center">
        <div className="w-8/12 sm:w-5/12">Парковочное место</div>
        <div className="hidden sm:block sm:w-5/12">Дата и время</div>
        <div className="w-4/12 sm:w-2/12">Статус</div>
      </div>

      <ScrollArea className="w-full h-[500px]">
        <ul>
          {reservations?.map((res) => {
            const { isPast, formattedDate } = parseReservationDateTime(
              res.reservedDate,
              res.reservedTime
            );

            return (
              <li
                key={res.id}
                className="flex w-full p-2 sm:p-3 border-b-1 border-slate-200"
              >
                <div className="w-8/12 sm:w-10/12 flex flex-col sm:flex-row">
                  <div className="sm:w-6/12">
                    <div>{res.spotSlug}</div>
                    <div className="text-sm">{res.location}</div>
                  </div>
                  <div className="sm:w-6/12 text-sm sm:text-base">
                    <div>{formattedDate}</div>
                    <div>{res.reservedTime}</div>
                  </div>
                </div>

                <div className="w-4/12 sm:w-2/12 flex gap-3 items-center">
                  {res.status === 'cancelled' && (
                    <span className="text-slate-400">Отмена</span>
                  )}
                  {res.status === 'booked' && isPast && (
                    <span className="text-slate-400">Бронь</span>
                  )}

                  {res.status === 'booked' && !isPast && (
                    <>
                      <span className="text-green-600">Бронь</span>
                      <CancelReservationModal id={res.id}>
                        <Trash2 className="text-slate-600 w-5 h-5" />
                      </CancelReservationModal>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      <div className="w-full h-4 border-t-1"></div>
    </div>
  );
};

export default ReservationsTable;
