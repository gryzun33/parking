import { toast } from 'sonner';

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    style: {
      background: '#D1F7D1',
      color: '#006400',
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 3000,
  });
};
