import { Calendar } from '@/components/ui/calendar';
import type { AvailibiltyStatus, DateInfo } from '@/types/parking-spot';
import clsx from 'clsx';

type Props = {
  dates: DateInfo[];
};

const dateToString = (date: Date) =>
  date.toLocaleDateString('sv-SE', { timeZone: 'Europe/Minsk' });

export const ParkingCalendar = ({ dates }: Props) => {
  return (
    <Calendar
      mode="single"
      selected={undefined}
      onSelect={() => {}}
      className="rounded-md border p-4"
      components={{
        Day: (props) => {
          const dateStr = dateToString(props.date);
          const matched = dates.find((d) => d.date === dateStr);
          const status = matched?.status || 'past';

          const { displayMonth, ...dayProps } = props;

          return <CustomDay {...dayProps} status={status} />;
        },
      }}
    />
  );
};

export default ParkingCalendar;

type DayStatus = AvailibiltyStatus | 'past';

type CustomDayProps = {
  date: Date;
  status: DayStatus;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CustomDay = ({ date, status, ...props }: CustomDayProps) => {
  const getStatusStyle = (status: DayStatus) => {
    switch (status) {
      case 'available':
        return 'bg-slate-100 text-green-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      case 'booked-by-me':
        return 'bg-green-100 text-blue-800 font-semibold';
      case 'past':
        return 'text-gray-400';
      default:
        return '';
    }
  };

  return (
    <button
      {...props}
      className={clsx(
        'w-9 h-9 flex items-center justify-center rounded-md text-sm transition-colors',
        getStatusStyle(status)
      )}
    >
      {date.getDate()}
    </button>
  );
};
