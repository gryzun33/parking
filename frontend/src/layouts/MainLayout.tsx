import Header from '@/components/layouts/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 bg-slate-200 flex flex-col items-center">
        <Outlet />
      </main>
      {/* <Toaster /> */}
    </div>
  );
};

export default MainLayout;
