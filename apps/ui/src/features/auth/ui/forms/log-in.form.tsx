import { BaseError } from '@api-types/errors/base';
import { authModel } from '@app/features/auth';
import { Form } from '@app/shared/ui/form';
import { Input } from '@app/shared/ui/input';
import { LoginSchema } from '@dto/auth/schemas/login.schema';
import { useNavigate } from 'react-router';
import { z } from 'zod';

export const Login = () => {
  const navigate = useNavigate();
  const [login, res] = authModel.api.login.useLazyQuery();

  const handleLogin = async (credentials: z.infer<typeof LoginSchema>) => {
    await login(credentials).then((query) => (query.isSuccess ? navigate('/') : null));
  };

  return (
    <Form
      onSubmit={handleLogin}
      schema={LoginSchema}
      submitText='Log In'
      className='w-full'
      errorMessage={(res?.error as BaseError)?.data?.message}
    >
      <Input name='email' type='email' label='Email' />
      <Input name='password' type='password' label='Password' />
    </Form>
  );
};
