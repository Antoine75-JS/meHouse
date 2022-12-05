/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';

// Dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

import PercentBar from '../../Utils/PercentBar';

// Config dayjs
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale('fr');

interface PropsT {
  task: Itask;
}

const TaskItem: React.FC<PropsT> = ({ task }) => {
  return (
    <Link
      className='flex w-600 mb-4 border p-4 rounded-xl items-center'
      to={`/task/${task?._id}`}
      state={{ task }}
    >
      <div className='grow '>{task && <div>{task.taskName}</div>}</div>
      {task?.expireDate ? (
        <span>Expire dans {dayjs(task?.expireDate).from(dayjs())}</span>
      ) : (
        <PercentBar
          creationDate={task?.creationDate}
          repeatFrequency={task?.repeatFrequency}
          expireDate={task?.expireDate}
        />
      )}
    </Link>
  );
};

export default TaskItem;
