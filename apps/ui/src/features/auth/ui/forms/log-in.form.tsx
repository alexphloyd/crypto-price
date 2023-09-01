import { Form } from '@app/shared/ui/form';
import { Input } from '@app/shared/ui/input';
import { LoginSchema } from '@dto/auth/schemas/login.schema';
import { z } from 'zod';

export const Login = () => {
  const login = async (credentials: z.infer<typeof LoginSchema>) => {
    console.log(credentials);
  };

  return (
    <Form onSubmit={login} schema={LoginSchema} submitText='Log In' className='w-full'>
      <Input name='email' type='email' label='Email' />
      <Input name='password' type='password' label='Password' />
    </Form>
  );
};
