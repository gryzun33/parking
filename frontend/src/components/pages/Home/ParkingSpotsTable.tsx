import { useGetParkingSpotsQuery } from '@/api/parkingSpotApiSlice';
import { AlertDestructive } from '@/components/shared/AlertDestructive';
import Loader from '@/components/shared/Loader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getErrorMessage } from '@/utils/getErrorMessage';

import { Link } from 'react-router';

export const ParkingSpotsTable = () => {
  const { data: spots, error, isLoading } = useGetParkingSpotsQuery();

  if (isLoading) return <Loader />;

  if (error) return <AlertDestructive message={getErrorMessage(error)} />;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Парковочное место</TableHead>
            <TableHead>Адрес</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spots?.map((spot) => (
            <TableRow key={spot.id}>
              <Link
                to={`/parking-spots/${spot.id}`}
                className="hover:bg-gray-50 cursor-pointer"
                style={{ display: 'table-row' }}
              >
                <TableCell className="font-medium">{spot.slug}</TableCell>
                <TableCell>{spot.location}</TableCell>
              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
