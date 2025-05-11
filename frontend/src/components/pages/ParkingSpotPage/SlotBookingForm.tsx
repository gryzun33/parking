import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import type { SlotInfo } from '@/types/parking-spot';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useCreateReservationMutation } from '@/api/reservationApiSlice';
import clsx from 'clsx';
import { showSuccessToast } from '@/utils/showToast';
import Loader from '@/components/shared/Loader';
import { AlertDestructive } from '@/components/shared/AlertDestructive';
import { parseReservationDateTime } from '@/utils/getParseDateTime';
import { getErrorMessage } from '@/utils/getErrorMessage';

type FormData = {
  selectedSlots: string[];
};

type Props = {
  slots: SlotInfo[];
  date: string;
  onClose: () => void;
};

const SlotBookingForm = ({ slots, date, onClose }: Props) => {
  const selectedSpotId = useSelector(
    (state: RootState) => state.parkingSpot.selectedSpotId
  );
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: { selectedSlots: [] },
  });

  const [createReservation, { isLoading, error }] =
    useCreateReservationMutation();

  const selectedSlots = watch('selectedSlots');

  const toggleSlot = (slotLabel: string) => {
    const isSelected = selectedSlots.includes(slotLabel);
    const newSelected = isSelected
      ? selectedSlots.filter((s) => s !== slotLabel)
      : [...selectedSlots, slotLabel];
    setValue('selectedSlots', newSelected);
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      const body = {
        parkingSpotId: selectedSpotId,
        reservedDate: date,
        reservedTimes: data.selectedSlots,
      };
      await createReservation(body).unwrap();
      showSuccessToast('Вы успешно забронировали место!');
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;

  if (error) return <AlertDestructive message={getErrorMessage(error)} />;

  const lastSlot = slots[slots.length - 1];
  const isLastSlotPast = parseReservationDateTime(
    date,
    lastSlot.slotLabel
  ).isPast;

  if (isLastSlotPast) {
    return <div className="pb-4">На сегодня свободных слотов уже нет </div>;
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full flex flex-col items-center space-y-4"
    >
      <ul className="w-full">
        {slots.map((slot) => {
          const { isPast } = parseReservationDateTime(date, slot.slotLabel);

          if (isPast) {
            return null;
          }

          const isSelected = selectedSlots.includes(slot.slotLabel);

          if (slot.status === 'booked') {
            return (
              <li
                key={slot.slotLabel}
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
                  <span
                    className={clsx(
                      'font-mono text-sm sm:text-base sm:ml-5',
                      slot.isMine ? 'text-green-600' : 'text-slate-500'
                    )}
                  >
                    {slot.slotLabel}
                  </span>
                </div>

                <div
                  className={clsx(
                    ' w-[100px] sm:w-[130px] text-center',
                    slot.isMine ? 'text-slate-800' : 'text-slate-500'
                  )}
                >
                  {slot.isMine ? 'Моя бронь' : 'Занято'}
                </div>
              </li>
            );
          }

          return (
            <li
              key={slot.slotLabel}
              className="flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center">
                  {isSelected && <Check size={16} className="text-green-500" />}
                </div>
                <span
                  className={`font-mono text-sm sm:text-base sm:ml-5 ${
                    isSelected ? 'text-green-600' : ''
                  }`}
                >
                  {slot.slotLabel}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleSlot(slot.slotLabel)}
                className="px-3 py-1 w-[100px] sm:w-[130px] text-center rounded-md text-xs sm:text-sm font-medium border bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              >
                {isSelected ? 'Отменить' : 'Выбрать'}
              </button>
            </li>
          );
        })}
      </ul>

      <Button
        type="submit"
        className="w-full bg-green-700 hover:bg-green-500 mb-0"
        disabled={selectedSlots.length === 0}
      >
        Забронировать выбранные{' '}
        {selectedSlots.length > 0 && `(${selectedSlots.length})`}
      </Button>

      {slots.map(
        (slot) =>
          slot.status === 'available' && (
            <input
              key={slot.slotLabel}
              type="hidden"
              value={slot.slotLabel}
              {...register('selectedSlots')}
            />
          )
      )}
    </form>
  );
};

export default SlotBookingForm;
