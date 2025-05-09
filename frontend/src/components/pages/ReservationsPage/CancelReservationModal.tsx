import { useCancelReservationMutation } from '@/api/reservationApiSlice';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { showErrorToast, showSuccessToast } from '@/utils/showToast';

type Props = {
  children: React.ReactNode;
  id: string;
};

const CancelReservationModal = ({ children, id }: Props) => {
  const [cancelReservation] = useCancelReservationMutation();

  const handleCancel = async () => {
    try {
      await cancelReservation({ reservationId: id }).unwrap();
      showSuccessToast('Бронирование отменено!');
    } catch (error) {
      console.error('Ошибка при отмене:', error);
      showErrorToast('Произошла ошибка при отмене бронирования');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="z-[1000]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-800">
            Вы уверены что хотите отменить бронь?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Назад</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancel}>
            Подтвердить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelReservationModal;
