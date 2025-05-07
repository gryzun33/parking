import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

export type AuthFormData = z.infer<typeof authSchema>;
