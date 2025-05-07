import type { AuthFormData } from '@/validators/authSchema';
import AuthForm from './AuthForm';

const LoginForm = () => {
  const handleLogin = (data: AuthFormData) => {
    console.log('Вход с данными:', data);
  };

  return <AuthForm onSubmit={handleLogin} submitLabel="Войти" />;
};

export default LoginForm;
