/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import DatePicker from 'react-datepicker';

import { editTask } from '../../../actions/tasks';

import 'react-datepicker/dist/react-datepicker.css';
import Loading from '../../Utils/Loading';

interface FormInputs {
  taskName: string;
  taskRepeat: boolean;
  repeatFrequency: number;
}

const editTaskSchema = yup.object().shape({
  taskName: yup.string().required('Merci de renseigner un nom pour la tâche'),
  repeat: yup.boolean(),
  repeatFrequency: yup.number(),
  expireDate: yup.date(),
});

const EditTaskForm: React.FC = () => {
  const [expireDate, setExpire] = useState<Date>();
  const isLogged = useSelector((state: IState) => state.user.isLogged);
  const dispatch = useDispatch();

  const location = useLocation();
  const { task } = location.state;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(editTaskSchema),
  });

  const watchRepeat = watch('taskRepeat');

  const details: Itask = useMemo(() => {
    return task;
  }, [task]);

  useEffect(() => {
    const selected = details?.expireDate;
    if (selected) {
      const d = new Date(selected);
      setExpire(d);
    }
  }, [details]);

  // TODO
  // Handle redirect when task created
  // yup validation
  // Handle errors on form
  const handleSubmitEditedTask: SubmitHandler<FormInputs> = (formData: FormInputs) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, creationDate, repeat, isDone, category, orgaId } = details;

    const data = {
      ...formData,
      expireDate: expireDate,
      orgaId,
      _id,
      creationDate,
      repeat,
      isDone,
      category,
    };
    dispatch(editTask(data));
  };

  return (
    <div className='page'>
      {!isLogged && <Navigate to='/' />}
      Modifier la tâche
      {details ? (
        <form
          onSubmit={handleSubmit(handleSubmitEditedTask)}
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
                placeholder='Task name'
                defaultValue={details?.taskName}
                required
              />
            </label>
            {/* REPEAT */}
            <div className='flex content-center gap-4 mb-4 '>
              <span className='text-sm font-medium text-gray-900 dark:text-gray-300'>Repeat :</span>
              <label
                className='inline-flex relative items-center cursor-pointer'
                htmlFor='taskRepeat'
              >
                <input
                  type='checkbox'
                  value=''
                  className='sr-only peer'
                  id='taskRepeat'
                  defaultChecked={details?.repeat}
                  {...register('taskRepeat')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              </label>
            </div>
            {/* REPEAT FREQUENCY */}
            {watchRepeat && details?.repeat && (
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
                  placeholder='7'
                  defaultValue={details?.repeatFrequency}
                  required
                />
              </label>
            )}
            {/* EXPIRATION */}
            {!watchRepeat && (
              <>
                <div className='mb-2'>Expiration date :</div>
                <DatePicker
                  selected={expireDate}
                  onChange={(date: Date) => setExpire(date)}
                  placeholderText='Select a date'
                  minDate={new Date()}
                  className='px-4 py-2 bg-gray-700 rounded-lg font-bold text-sm text-gray-400'
                />
              </>
            )}
          </div>
          {/* {errors && <span>This field is required</span>} */}
          <button
            type='submit'
            className='text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
          >
            Submit
          </button>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EditTaskForm;
