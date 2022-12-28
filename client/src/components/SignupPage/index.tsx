/* eslint-disable max-len */
import React, { InputHTMLAttributes } from 'react';
import { useForm, SubmitHandler, UseFormRegister, FieldError } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { submitSignup } from '../../actions/auth';
import { openSnackbar } from '../../actions/snackbar';

// Ts
interface FormInputs {
  username: string;
  email: string;
  repeat_password: string;
  password: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: FieldError;
  type: 'email' | 'password' | 'text';
  required: boolean;
  placeholder: string;
  registerLabel: 'email' | 'password' | 'repeat_password' | 'username';
  register: UseFormRegister<FormInputs>;
}

// Yup schema validation
const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9]{5,30}$/, "Le nom d'utilisateur doit contenir entre 5 et 30 caractères"),
  email: yup.string().email('Une adresse email au format correcte est requise').required(),
  password: yup
    .string()
    .required()
    .min(8)
    .max(30)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
      'Le mot de passe doit contenir entre 8 et 30 caractères, contenir une lettre Majuscule et un chiffre',
    ),
  repeat_password: yup
    .string()
    .min(8)
    .max(30)
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
      'Le mot de passe doit contenir entre 8 et 30 caractères, contenir une lettre Majuscule et un chiffre',
    ),
});

const InputField: React.FC<InputProps> = (props: InputProps) => {
  const { label, type, required, placeholder, registerLabel, register, errors } = props;

  return (
    <label htmlFor={label} className='block mb-4 text-sm font-medium text-gray-900 dark:text-white'>
      {label}
      <input
        type={type}
        id={label}
        // Find how to improve register
        {...register(registerLabel)}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2'
        placeholder={placeholder}
        required={required}
      />
      {errors && <p className='mt-2 font-thin text-red-600'>{errors.message}</p>}
    </label>
  );
};

// TODO
// Handle showPassword to check password
const SignupPage: React.FC = () => {
  const isLogged = useSelector((state: IState) => state.user.isLogged);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(signupSchema),
  });

  const handleSignup: SubmitHandler<FormInputs> = (data: FormInputs) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { password, repeat_password } = data;

    if (
      password !== repeat_password
    ) {
      dispatch(openSnackbar({type: 'error', message: 'Les mots de passe ne concordent pas'}));
    }
    // prettier-ignore
    else {
      dispatch(submitSignup(data));
    }
  };

  return (
    <div className='page sm:pt-24'>
      {isLogged && <Navigate to='/' />}
      <h1>Vous inscrire</h1>
      <form
        onSubmit={handleSubmit(handleSignup)}
        className='flex flex-col justify-center items-center gap-4 w-full p-4'
      >
        <div className='w-full'>
          <InputField
            errors={errors.username}
            label="Nom d'utilisateur"
            registerLabel='username'
            type='text'
            placeholder='Username'
            required
            register={register}
          />
          <InputField
            errors={errors.email}
            label='Adresse email'
            registerLabel='email'
            type='email'
            placeholder='your@email.com'
            required
            register={register}
          />
          <InputField
            errors={errors.password}
            label='Mot de passe'
            registerLabel='password'
            type='password'
            required
            register={register}
            placeholder=''
          />
          <InputField
            errors={errors.repeat_password}
            label='Répétez le mot de passe'
            registerLabel='repeat_password'
            type='password'
            required
            register={register}
            placeholder=''
          />
          {errors && <p>{}</p>}
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

export default SignupPage;
