import { Form } from '@app/shared/ui/form';
import { Input } from '@app/shared/ui/input';
import { LoginDto, type LoginInput } from '@dto';

export const Login = () => {
  const login = async (values: LoginInput) => {
    console.log(values);
  };

  return (
    <Form onSubmit={login} schema={LoginDto} submitText='Log In' className='w-full'>
      <Input name='email' type='email' label='Email' />
      <Input name='password' type='password' label='Password' />
    </Form>
  );
};
