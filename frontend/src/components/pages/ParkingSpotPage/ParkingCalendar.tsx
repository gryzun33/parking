import { Calendar } from '@/components/ui/calendar';
import type { AvailibiltyStatus, DateInfo } from '@/types/parking-spot';
import clsx from 'clsx';
import { DayDetailsPopup } from './DayDetailsPopup';
import { ru } from 'date-fns/locale';

type Props = {
  dates: DateInfo[];
};

export const ParkingCalendar = ({ dates }: Props) => {
  return (
    <Calendar
      showOutsideDays={false}
      locale={ru}
      mode="single"
      selected={undefined}
      onSelect={() => {}}
      className="rounded-md border p-4"
      components={{
        Day: (props) => {
          const dateStr = props.date.toLocaleDateString('sv-SE', {
            timeZone: 'Europe/Minsk',
          });
          const matched = dates.find((d) => d.date === dateStr);
          const status = matched?.status || 'past';

          const { displayMonth, ...dayProps } = props;

          const isOutside =
            props.date.getMonth() !== props.displayMonth.getMonth();

          return (
            <CustomDay {...dayProps} status={status} isOutside={isOutside} />
          );
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
  isOutside: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CustomDay = ({
  date,
  status,
  isOutside,
  ...props
}: CustomDayProps) => {
  if (isOutside) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }
  const getStatusStyle = (status: DayStatus) => {
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

  const isDisabled = status === 'unavailable' || status === 'past';

  const dayButton = (
    <button
      {...props}
      disabled={isDisabled}
      className={clsx(
        'w-9 h-9 flex items-center justify-center rounded-md text-sm transition-colors',
        getStatusStyle(status),
        isDisabled && 'cursor-not-allowed opacity-50'
      )}
    >
      {date.getDate()}
    </button>
  );

  return isDisabled ? (
    dayButton
  ) : (
    <DayDetailsPopup date={date}>{dayButton}</DayDetailsPopup>
  );
};
