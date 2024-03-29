/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import DatePicker from 'react-datepicker';

import { createNewTask } from '../../../actions/tasks';

import 'react-datepicker/dist/react-datepicker.css';

interface FormInputs {
  taskName: string;
  repeat: boolean;
  repeatFrequency: number;
}

const newTaskSchema = yup.object().shape({
  taskName: yup.string().required('Merci de renseigner un nom pour la tâche'),
  repeat: yup.boolean(),
  repeatFrequency: yup.number(),
  expireDate: yup.date(),
});

const NewTaskForm = () => {
  const [expire, setExpire] = useState<Date>();
  const isLogged = useSelector((state: IState) => state.user.isLogged);
  const dispatch = useDispatch();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(newTaskSchema),
  });
  const watchRepeat = watch('repeat');

  const handleSubmitNewTask: SubmitHandler<FormInputs> = (formData: FormInputs) => {
    const data = {
      ...formData,
      expireDate: expire,
      orgaId: id,
    };
    dispatch(createNewTask(data));
  };

  return (
    <div className='page'>
      {!isLogged && <Navigate to='/' />}
      Nouvelle tâche
      <form
        onSubmit={handleSubmit(handleSubmitNewTask)}
        className='flex flex-col justify-center items-center gap-4 mw-600 w-full p-4'
      >
        <div className='w-full'>
          {/* TASK NAME */}
          <label
            htmlFor='taskName'
            className='block mb-4 text-sm font-medium text-gray-900 dark:text-white'
          >
            New task name
            <input
              type='text'
              id='taskName'
              // Find how to improve register
              {...register('taskName')}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2'
              placeholder='New task name'
              required
            />
          </label>
          {/* REPEAT */}
          <div className='flex content-center gap-4 mb-4 '>
            <span className='text-sm font-medium text-gray-900 dark:text-gray-300'>Repeat :</span>
            <label className='inline-flex relative items-center cursor-pointer' htmlFor='repeat'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                id='repeat'
                {...register('repeat')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            </label>
          </div>
          {/* REPEAT FREQUENCY */}
          {watchRepeat && (
            <label
              htmlFor='repeatFrequency'
              className='block mb-4 text-sm font-medium text-gray-900 dark:text-white'
            >
              Repeat frequency
              <input
                type='number'
                id='repeatFrequency'
                // Find how to improve register
                {...register('repeatFrequency')}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2'
                required
              />
            </label>
          )}
          {/* EXPIRATION */}
          {!watchRepeat && (
            <>
              <div className='mb-2'>Expiration date :</div>
              <DatePicker
                selected={expire}
                onChange={(date: Date) => setExpire(date)}
                placeholderText='Select a date'
                minDate={new Date()}
                className='px-4 py-2 bg-gray-700 rounded-lg font-bold text-sm text-gray-400'
              />
            </>
          )}
        </div>
        {errors && <span>This field is required</span>}
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

export default NewTaskForm;
