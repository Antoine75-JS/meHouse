/* eslint-disable no-underscore-dangle */
import React from 'react';

import TaskItem from '../TaskItem';

interface PropsT {
  tasks: Itask[];
}

const TasksList: React.FC<PropsT> = ({ tasks }) => {
  console.log('tasks', tasks);
  return (
    <div>
      <div>{tasks && tasks.map((task) => <TaskItem key={task._id} task={task} />)}</div>
    </div>
  );
};

export default TasksList;
