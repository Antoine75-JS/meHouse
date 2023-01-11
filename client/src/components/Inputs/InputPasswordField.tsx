import React, { InputHTMLAttributes } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

// Components
import ShowPasswordIcon from '../Utils/Icons/showPasswordIcon';
import HidePasswordIcon from '../Utils/Icons/hidePasswordIcon';

// Ts
interface FormInputs {
  username: string;
  email: string;
  repeat_password: string;
  password: string;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: FieldError;
  type: 'email' | 'password' | 'text';
  required: boolean;
  placeholder: string;
  registerLabel: 'email' | 'password' | 'repeat_password' | 'username';
  register: UseFormRegister<FormInputs>;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  showPassword?: boolean;
}

const InputPasswordField: React.FC<Props> = (props) => {
  const {
    label,
    type,
    required,
    placeholder,
    registerLabel,
    register,
    errors,
    setShowPassword,
    showPassword,
  } = props;

  const handleShowPassword = () => {
    if (setShowPassword) setShowPassword(!showPassword);
  };

  return (
    <label htmlFor={label} className='block mb-4 text-sm font-medium text-gray-900 dark:text-white'>
      {label}
      <div className='flex items-center  mt2'>
        <input
          type={type}
          id={label}
          // Find how to improve register
          {...register(registerLabel)}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder={placeholder}
          required={required}
        />
        <button type='button' onClick={handleShowPassword} className='absolute right-8'>
          {!showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        </button>
      </div>
      {errors && <p className='mt-2 font-thin text-red-600'>{errors.message}</p>}
    </label>
  );
};

export default InputPasswordField;
