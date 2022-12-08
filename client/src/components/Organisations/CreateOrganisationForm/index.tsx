/* eslint-disable max-len */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm, UseFormRegister, FieldError } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormInputs {
  orgName: string;
}

interface InputProps {
  label: string;
  errors?: FieldError;
  type: 'text';
  registerLabel: 'orgName';
  required: boolean;
  placeholder: string;
  register: UseFormRegister<FormInputs>;
}

const newOrgaSchema = yup.object().shape({
  orgName: yup
    .string()
    .required('Merci de renseigner ce champ')
    .matches(/^[a-zA-Z0-9]{5,30}$/, 'Le nom du groupe doit contenir entre 5 et 30 caractères'),
});

const InputField: React.FC<InputProps> = (props: InputProps) => {
  const { label, type, required, placeholder, register, errors, registerLabel } = props;

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

const CreateOrganisationForm: React.FC = () => {
  const user = useSelector((state: IState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(newOrgaSchema),
  });

  const { id, isLogged } = user;

  const handleNewOrga = (data: FormInputs) => {
    console.log(data, id);
  };

  if (!user) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex-col flex justify-center items-center pt-24'>
      {!isLogged && <Navigate to='/login' />}
      Créer un groupe
      <form
        onSubmit={handleSubmit(handleNewOrga)}
        className='flex flex-col justify-center items-center gap-4'
      >
        <div className='w-600'>
          <InputField
            errors={errors.orgName}
            label='Name'
            type='text'
            placeholder='Group name'
            required
            registerLabel='orgName'
            register={register}
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

export default CreateOrganisationForm;
