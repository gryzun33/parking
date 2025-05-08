import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

type Props = {
  children: React.ReactNode;
  date: Date;
};

export const DayDetailsPopup = ({ children, date }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col items-center">
        <DialogTitle>
          {' '}
          {format(date, 'd MMMM yyyy, EEEE', { locale: ru })}
        </DialogTitle>
        <DialogDescription className="text-lg text-slate-700">
          Доступные слоты
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
