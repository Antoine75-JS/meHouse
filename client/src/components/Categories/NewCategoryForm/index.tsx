/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createNewCategory } from '../../../actions/category';

// Ts
interface Props {
  orgaId: string;
}

interface FormInputs {
  catName: string;
}

// Yup schema validation
const newCategorySchema = yup.object().shape({
  catName: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Z0-9]{3,30}$/,
      'Le nom de la catégorie doit contenir entre 3 et 30 caractères',
    ),
});

const NewCategoryForm: React.FC<Props> = ({ orgaId }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(newCategorySchema),
  });

  const handleCreateNewTask: SubmitHandler<FormInputs> = (data: FormInputs) => {
    const payload = { orgaId, ...data };
    dispatch(createNewCategory(payload));
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewTask)}
      className='flex flex-col sm:flex-row justify-start items-center sm:gap-4 sm:m-4 mt-4'
    >
      <div className='w-full'>
        <label
          htmlFor='catName'
          className='block mb-4 text-sm font-medium text-gray-900 dark:text-white'
        >
          Nouvelle catégorie
          <input
            type='text'
            id='category'
            // Find how to improve register
            {...register('catName')}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2'
            placeholder='Nouvelle catégorie'
            required
          />
          {errors && <p className='mt-2 font-thin text-red-600'>{errors.catName?.message}</p>}
        </label>
      </div>
      {/* {errors && <span>This field is required</span>} */}
      <button
        type='submit'
        className='mt-3 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
      >
        Submit
      </button>
    </form>
  );
};

export default NewCategoryForm;
