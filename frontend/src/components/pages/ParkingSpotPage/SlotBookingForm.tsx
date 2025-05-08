import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import type { SlotInfo } from '@/types/parking-spot';

type FormData = {
  selectedSlots: string[];
};

type Props = {
  slots: SlotInfo[];
  date: string;
};

const SlotBookingForm = ({ slots, date }: Props) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: { selectedSlots: [] },
  });

  const selectedSlots = watch('selectedSlots');

  const toggleSlot = (slotLabel: string) => {
    const isSelected = selectedSlots.includes(slotLabel);
    const newSelected = isSelected
      ? selectedSlots.filter((s) => s !== slotLabel)
      : [...selectedSlots, slotLabel];
    setValue('selectedSlots', newSelected);
  };

  const handleFormSubmit = (data: FormData) => {
    console.log('выбранные слоты:', data);
  };

  console.log('slots=', slots);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full flex flex-col items-center space-y-4"
    >
      <ul className="w-full">
        {slots.map((slot) => {
          const isSelected = selectedSlots.includes(slot.slotLabel);

          if (slot.status === 'booked') {
            return (
              <li
                key={slot.slotLabel}
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
                  <span className="font-mono text-sm sm:text-base sm:ml-5">
                    {slot.slotLabel}
                  </span>
                </div>

                <span className="text-gray-500">
                  {slot.isMine ? 'моя бронь' : 'занято'}
                </span>
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
