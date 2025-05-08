import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import AuthPage from './pages/AuthPage';
import Reservations from './pages/Reservations';
import RedirectRoute from './components/shared/RedirectRoute';
import ProtectedRoute from './components/shared/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import ParkingSpotPage from './pages/ParkingSpotPage';
import ParkingSpotsPage from './pages/ParkingSpotsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <ParkingSpotsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="auth"
            element={
              <RedirectRoute>
                <AuthPage />
              </RedirectRoute>
            }
          />
          <Route
            path="parking-spot/:slug"
            element={
              <ProtectedRoute>
                <ParkingSpotPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="reservations"
            element={
              <ProtectedRoute>
                <Reservations />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
