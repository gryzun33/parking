import { BrowserRouter, Route, Routes } from 'react-router';
import ParkingSpot from './pages/ParkingSpot';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Reservations from './pages/Reservations';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="parking-spot" element={<ParkingSpot />} />
          <Route path="reservations" element={<Reservations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
