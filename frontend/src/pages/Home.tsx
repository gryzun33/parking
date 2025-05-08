import { ParkingSpotsTable } from '@/components/pages/Home/ParkingSpotsTable';

const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Список парковочных мест</h1>
      <ParkingSpotsTable />
    </div>
  );
};

export default Home;
