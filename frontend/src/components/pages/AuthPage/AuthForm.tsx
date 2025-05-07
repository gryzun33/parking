import { useForm } from 'react-hook-form';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { authSchema, type AuthFormData } from '@/validators/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { AlertDestructive } from '@/components/shared/AlertDestructive';
import { Loader2 } from 'lucide-react';

type Props = {
  onSubmit: (data: AuthFormData) => void;
  submitLabel: string;
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
};

const AuthForm = ({ onSubmit, submitLabel, isLoading, error }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <AlertDestructive message={getErrorMessage(error)} />}
      <div className="grid w-full items-center gap-1.5 relative">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register('email')}
          className="w-full"
        />
        {errors.email && (
          <p className="absolute top-[100%] text-red-500 text-xs font-light">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="grid w-full items-center gap-1.5 relative">
        <Label htmlFor="password">Пароль</Label>
        <Input
          type="password"
          id="password"
          {...register('password')}
          className="w-full"
        />
        {errors.password && (
          <p className="absolute top-[100%] text-red-500 text-xs font-light">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full mt-2" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : submitLabel}
      </Button>
    </form>
  );
};

export default AuthForm;
