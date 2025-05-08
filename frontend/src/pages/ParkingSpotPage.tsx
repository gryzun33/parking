import { useParams } from 'react-router';

const ParkingSpotPage = () => {
  const { slug } = useParams();
  return <div>Парковочное место {slug}</div>;
};

export default ParkingSpotPage;
