import { Calendar } from '@/components/ui/calendar';
import type { DateInfo, DayStatus } from '@/types/parking-spot';
import clsx from 'clsx';
import { DayDetailsPopup } from './DayDetailsPopup';
import { ru } from 'date-fns/locale';
import { getStatusStyle } from '@/utils/getStatusStyle';

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

          const isOutside = props.date.getMonth() !== displayMonth.getMonth();

          return (
            <CustomDay {...dayProps} status={status} isOutside={isOutside} />
          );
        },
      }}
    />
  );
};

export default ParkingCalendar;

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
