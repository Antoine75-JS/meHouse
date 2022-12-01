/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';

interface PropsT {
  task: Itask;
}

const TaskItem: React.FC<PropsT> = ({ task }) => {
  return (
    <Link to={`/${task?._id}`} state={{ task }}>
      <div className='w-600 mb-4 border p-4 rounded-xl'>{task && <div>{task.taskName}</div>}</div>
    </Link>
  );
};

export default TaskItem;
