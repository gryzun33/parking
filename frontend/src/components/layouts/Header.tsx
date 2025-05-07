import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="bg-slate-700 w-full p-4">
      <div className="flex max-w-8xl mx-auto justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-slate-100">
          Парковка Онлайн
        </Link>
      </div>
    </header>
  );
};

export default Header;
