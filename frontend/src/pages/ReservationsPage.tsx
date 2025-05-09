import ReservationsTable from '@/components/pages/ReservationsPage/ReservationsTable';

const ReservationsPage = () => {
  return (
    <div className="container mx-auto max-w-3xl py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl text-center font-bold mb-4 sm:mb-6">
        Мои бронирования
      </h1>
      <ReservationsTable />
    </div>
  );
};

export default ReservationsPage;
