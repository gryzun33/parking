import type { DayStatus } from '@/types/parking-spot';

export const getStatusStyle = (status: DayStatus) => {
  switch (status) {
    case 'available':
      return 'bg-slate-100 text-green-800';
    case 'unavailable':
      return 'bg-red-100 text-red-800';
    case 'booked-by-me':
      return 'bg-green-100 text-green-800';
    case 'past':
      return 'text-gray-400';
    default:
      return '';
  }
};
