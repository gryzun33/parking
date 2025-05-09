import type { AuthFormData } from '@/validators/authSchema';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router';
import { useLoginMutation, useRegisterMutation } from '@/api/authApiSlice';
import { showSuccessToast } from '@/utils/showToast';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [register, { isLoading: isRegisterLoading, error: registerError }] =
    useRegisterMutation();
  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();

  const handleRegister = async (data: AuthFormData) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    try {
      await register(body).unwrap();
      await login({ email: data.email, password: data.password }).unwrap();
      showSuccessToast('Вы успешно зарегистрировались вошли в аккаунт!');
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const error = registerError || loginError;

  const isLoading = isRegisterLoading || isLoginLoading;

  return (
    <AuthForm
      onSubmit={handleRegister}
      submitLabel="Войти"
      isLoading={isLoading}
      error={error}
    />
  );
};

export default RegisterForm;
