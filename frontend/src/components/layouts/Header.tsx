import { NavLink } from 'react-router';
import { Button } from '../ui/button';
import LogoutModal from './LogoutModal';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { ClipboardList, LogOut, User } from 'lucide-react';
import TextPopover from '../shared/TextPopover';

const Header = () => {
  const { isLogin, user } = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-slate-700 w-full px-4 h-[70px] flex items-center">
      <div className="flex w-full max-w-8xl mx-auto justify-between gap-2 items-center">
        <NavLink
          to="/"
          className="text-xl md:text-2xl font-bold text-slate-100"
        >
          Parking Online
        </NavLink>
        {isLogin && (
          <nav className="flex gap-2 self-end items-center">
            <TextPopover message={user.email}>
              <User className="text-slate-200" size={32} strokeWidth={1.5} />
            </TextPopover>
            <NavLink to="/reservations" className="md:hidden">
              <ClipboardList
                className="text-slate-200 h-8 w-8"
                size={32}
                strokeWidth={1.5}
              />
            </NavLink>
            <Button asChild variant="outline" className="hidden md:block">
              <NavLink to="/reservations">Мои Бронирования</NavLink>
            </Button>
            <LogoutModal>
              <div className="flex items-center">
                <button className="md:hidden text-slate-200">
                  <LogOut size={32} strokeWidth={1.5} />
                </button>
                <Button
                  className="cursor-pointer hidden md:block"
                  variant="outline"
                >
                  Выход
                </Button>
              </div>
            </LogoutModal>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
