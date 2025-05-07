import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { authSchema, type AuthFormData } from '@/validators/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  onSubmit: (data: { email: string; password: string }) => void;
  submitLabel: string;
};

const AuthForm = ({ onSubmit, submitLabel }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" {...register('email')} />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Пароль</Label>
        <Input type="password" id="password" {...register('password')} />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
};

export default AuthForm;
