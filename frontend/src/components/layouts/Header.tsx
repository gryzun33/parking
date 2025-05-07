import { NavLink } from 'react-router';
import { Button } from '../ui/button';
import LogoutModal from './LogoutModal';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { ClipboardList, LogOut } from 'lucide-react';

const Header = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  return (
    <header className="bg-slate-700 w-full p-4 h-[70px] flex items-center">
      <div className="flex w-full max-w-8xl mx-auto justify-between items-center">
        <NavLink
          to="/"
          className="text-xl md:text-2xl font-bold text-slate-100"
        >
          Parking Online
        </NavLink>
        {isLogin && (
          <nav className="flex gap-2">
            <Button asChild variant="outline">
              <NavLink to="/reservations">
                <ClipboardList className="md:hidden" />
                <span className="hidden md:block">Мои Бронирования</span>
              </NavLink>
            </Button>
            <LogoutModal>
              <Button className="cursor-pointer" variant="outline">
                <LogOut className="md:hidden" size={32} />
                <span className="hidden md:block">Выход</span>
              </Button>
            </LogoutModal>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
