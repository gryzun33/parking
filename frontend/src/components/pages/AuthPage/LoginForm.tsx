import type { AuthFormData } from '@/validators/authSchema';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router';
import { useLoginMutation } from '@/api/authApiSlice';

const LoginForm = () => {
  const navigate = useNavigate();

  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();
  const handleLogin = async (data: AuthFormData) => {
    try {
      await login({ email: data.email, password: data.password }).unwrap();
      // showSuccessToast('You have successfully logged in!');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <AuthForm
      onSubmit={handleLogin}
      submitLabel="Войти"
      isLoading={isLoginLoading}
      error={loginError}
    />
  );
};

export default LoginForm;
