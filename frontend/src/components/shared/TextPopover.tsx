import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type Props = {
  message: string;
  children: React.ReactNode;
};

const TextPopover = ({ message, children }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-2 w-auto">{message}</PopoverContent>
    </Popover>
  );
};

export default TextPopover;
