/* eslint-disable max-len */
import React from 'react';
import { useForm, SubmitHandler, UseFormRegister, FieldError } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { submitLogin } from '../../actions/auth';

// Ts
interface FormInputs {
  email: string;
  password: string;
}

interface InputProps {
  label: string;
  errors?: FieldError;
  type: 'email' | 'password';
  required: boolean;
  placeholder: string;
  register: UseFormRegister<FormInputs>;
}

// Yup schema validation
const loginSchema = yup.object().shape({
  email: yup.string().email('Une adresse mail au format valide est requise').required(),
  password: yup.string().required('Merci de renseigner votre mot de passe'),
});

const InputField: React.FC<InputProps> = (props: InputProps) => {
  const { label, type, required, placeholder, register, errors } = props;

  return (
    <label htmlFor={label} className='block mb-4 text-sm font-medium text-gray-900 dark:text-white'>
      {label}
      <input
        type={type}
        id={label}
        // Find how to improve register
        {...register(type)}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2'
        placeholder={placeholder}
        required={required}
      />
      {errors && <p className='mt-2 font-thin text-red-600'>{errors.message}</p>}
    </label>
  );
};

// TODO
// setup yup validation
const LoginPage: React.FC = () => {
  const isLogged = useSelector((state: IState) => state.user.isLogged);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<FormInputs> = (data: FormInputs) => {
    dispatch(submitLogin(data));
  };

  return (
    <div className='page sm:pt-24'>
      {isLogged && <Navigate to='/' />}
      <h1>Se connecter</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='flex flex-col justify-center items-center gap-4 mw-600 w-full p-4'
      >
        <div className='w-full'>
          <InputField
            errors={errors.email}
            label='email'
            type='email'
            placeholder='your@email.com'
            required
            register={register}
          />
          <InputField
            errors={errors.password}
            label='password'
            type='password'
            required
            register={register}
            placeholder=''
          />
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
