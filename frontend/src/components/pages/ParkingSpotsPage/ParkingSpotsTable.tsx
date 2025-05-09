import { useGetParkingSpotsQuery } from '@/api/parkingSpotApiSlice';
import { AlertDestructive } from '@/components/shared/AlertDestructive';
import Loader from '@/components/shared/Loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { setSelectedSpotId } from '@/store/slices/parkingSpotSlice';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router';

export const ParkingSpotsTable = () => {
  const dispatch = useDispatch();
  const { data: spots, error, isLoading } = useGetParkingSpotsQuery();

  if (isLoading) return <Loader />;

  if (error) return <AlertDestructive message={getErrorMessage(error)} />;

  return (
    <div className="w-full shadow-md rounded-md bg-slate-50 overflow-hidden">
      <div className="grid grid-cols-[1fr_1.5fr] sm:grid-cols-2 font-semibold text-slate-100 bg-slate-700 border-b p-2 sm:p-3 text-sm sm:text-base items-center gap-2">
        <div>Парковочное место</div>
        <div>Адрес</div>
      </div>
      <ScrollArea className="w-full h-96">
        <ul>
          {spots?.map((spot) => (
            <li key={spot.id}>
              <Link
                to={`/parking-spot/${spot.slug.toLowerCase()}`}
                onClick={() => dispatch(setSelectedSpotId(spot.id))}
                className="grid grid-cols-[1fr_1.5fr] sm:grid-cols-2 p-2 sm:p-3  hover:bg-slate-100  cursor-pointer gap-2"
              >
                <div className="font-medium">{spot.slug}</div>
                <div className="text-sm">{spot.location}</div>
              </Link>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <div className="w-full p-3 border-t border-slate-300">
        Всего мест: {spots?.length}
      </div>
    </div>
  );
};
