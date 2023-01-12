/* eslint-disable max-len */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { submitSignup } from '../../actions/auth';
import { openSnackbar } from '../../actions/snackbar';

// Components
import InputTextField from '../Inputs/InputTextField';

import InputPasswordField from '../Inputs/InputPasswordField';

// Ts
interface FormInputs {
  username: string;
  email: string;
  repeat_password: string;
  password: string;
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

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
          <InputTextField
            errors={errors.username}
            label="Nom d'utilisateur"
            registerLabel='username'
            type='text'
            placeholder='Username'
            required
            register={register}
          />
          <InputTextField
            errors={errors.email}
            label='Adresse email'
            registerLabel='email'
            type='email'
            placeholder='your@email.com'
            required
            register={register}
          />
          <InputPasswordField
            errors={errors.password}
            label='Mot de passe'
            registerLabel='password'
            type={!showPassword ? 'password' : 'text'}
            required
            register={register}
            placeholder=''
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <InputPasswordField
            errors={errors.repeat_password}
            label='Répétez le mot de passe'
            registerLabel='repeat_password'
            type={!showPassword ? 'password' : 'text'}
            required
            register={register}
            placeholder=''
            showPassword={showPassword}
            setShowPassword={setShowPassword}
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
