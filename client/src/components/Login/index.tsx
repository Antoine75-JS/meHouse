/* eslint-disable max-len */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { submitLogin } from '../../actions/auth';
// Ts
interface FormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const handleLogin: SubmitHandler<FormInputs> = (data: FormInputs) => {
    console.log('data', data);
    dispatch(submitLogin(data));
  };

  return (
    <div className='flex-col flex justify-center items-center'>
      LoginPage
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='flex flex-col justify-center items-center gap-4'
      >
        <div className='w-600 '>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Email
            <input
              type='text'
              id='email'
              {...register('email')}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='your@email.com'
              required
            />
          </label>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Password :
            <input
              type='password'
              id='password'
              {...register('password')}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            />
          </label>
        </div>
        {/* {errors && <span>This field is required</span>} */}
        <button
          type='submit'
          className='text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
