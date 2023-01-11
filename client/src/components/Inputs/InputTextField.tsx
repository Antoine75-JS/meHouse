import React, { InputHTMLAttributes } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

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
}

const InputTextField: React.FC<Props> = (props) => {
  const { label, type, required, placeholder, registerLabel, register, errors } = props;

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
      </div>
      {errors && <p className='mt-2 font-thin text-red-600'>{errors.message}</p>}
    </label>
  );
};

export default InputTextField;
