import { useAppDispatch } from '@app/app/store/hooks';
import { authModel } from '@app/features/auth';
import { Form } from '@app/shared/ui/form';
import { Input } from '@app/shared/ui/input';
import { LoginSchema } from '@dto/auth/schemas/login.schema';
import { useNavigate } from 'react-router';
import { z } from 'zod';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const error = authModel.useLoginErrorMessage();

  const handleLogin = async (credentials: z.infer<typeof LoginSchema>) => {
    await dispatch(authModel.effects.login(credentials))
      .unwrap()
      .then(({ isLoggedIn }) => isLoggedIn && navigate('/'));
  };

  return (
    <Form onSubmit={handleLogin} schema={LoginSchema} submitText='Log In' className='w-full' errorMessage={error}>
      <Input name='email' type='email' label='Email' />
      <Input name='password' type='password' label='Password' />
    </Form>
  );
};
