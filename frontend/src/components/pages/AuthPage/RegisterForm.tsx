import type { AuthFormData } from '@/validators/authSchema';
import AuthForm from './AuthForm';

const RegisterForm = () => {
  const handleRegister = (data: AuthFormData) => {
    console.log('Регистрация с данными:', data);
  };

  return <AuthForm onSubmit={handleRegister} submitLabel="Войти" />;
};

export default RegisterForm;
