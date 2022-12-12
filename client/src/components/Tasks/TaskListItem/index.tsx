/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/outline';

// Dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

import PercentBar from '../../Utils/PercentBar';
import { deleteTask, repeatTask } from '../../../actions/tasks';
import CategoryChip from '../../Utils/CategoryChip';

// Config dayjs
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale('fr');

interface PropsT {
  task: Itask;
}

// TODO
// Handle passed dates
// Handle repeat / done / delete task
const TaskListItem: React.FC<PropsT> = ({ task }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleOpenDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleDeleteTask = (id: string) => {
    console.log('delete task', id);
    setIsDropDownOpen(false);
    dispatch(deleteTask(id));
  };

  const handleTaskDone = (id: string) => {
    console.log('task is done', id);
    setIsDropDownOpen(false);
  };

  const handleRepeatTask = (id: string) => {
    console.log('repeating task', id);
    dispatch(repeatTask(id));
    setIsDropDownOpen(false);
  };

  return (
    <div
      className='flex w-600 mb-4 border-2 p-4 rounded-3xl items-center'
      style={
        task?.isDone
          ? {
              borderColor: '#aaa',
              color: '#aaa',
            }
          : {}
      }
    >
      <div className='grow '>
        {task && (
          <div className='flex gap-2 items-center'>
            <Link className='font-bold' to={`/task/${task._id}`} state={{ task }}>
              {task.taskName}
            </Link>
            {task?.category && <CategoryChip catName={task.category?.catName} />}
          </div>
        )}
      </div>
      {task?.expireDate ? (
        <span>{dayjs(task?.expireDate).from(dayjs())}</span>
      ) : task?.isDone ? (
        <CheckCircleIcon className='h-6 w-6' />
      ) : (
        <PercentBar
          creationDate={task?.creationDate}
          repeatFrequency={task?.repeatFrequency}
          expireDate={task?.expireDate}
        />
      )}
      <div>
        <button
          id='dropdownMenuIconButton'
          onClick={handleOpenDropdown}
          className='ml-4 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500'
          type='button'
        >
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
          </svg>
        </button>

        {isDropDownOpen && (
          <div
            id='dropdownDots'
            className='w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute z-20 right-5'
          >
            <ul
              className='py-1 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdownMenuIconButton'
            >
              <li>
                {task?.isDone ? (
                  <button
                    type='button'
                    onClick={() => handleTaskDone(task?._id)}
                    className='flex w-full items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Cancel undone <CheckCircleIcon className='h-6 w-6' />
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={() => handleTaskDone(task?._id)}
                    className='flex w-full items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Mark as done ! <CheckCircleIcon className='h-6 w-6' />
                  </button>
                )}
                <button
                  type='button'
                  onClick={() => handleRepeatTask(task?._id)}
                  className='flex w-full items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Repeat <ArrowPathRoundedSquareIcon className='h-6 w-6' />
                </button>
              </li>
              <li>
                <Link
                  to={`/task/${task._id}/edit`}
                  className='flex items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Edit <PencilIcon className='h-5 w-5' />
                </Link>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => handleDeleteTask(task?._id)}
                  className='flex w-full items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-700'
                >
                  Delete <TrashIcon className='h-5 w-5' />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListItem;
