import { ParkingSpotsTable } from '@/components/pages/ParkingSpotsPage/ParkingSpotsTable';

const ParkingSpotPage = () => {
  return (
    <div className="container mx-auto max-w-lg py-8">
      <h1 className="text-2xl text-center font-bold mb-6">
        Список парковочных мест
      </h1>
      <ParkingSpotsTable />
    </div>
  );
};

export default ParkingSpotPage;
