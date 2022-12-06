/* eslint-disable no-underscore-dangle */
import React from 'react';

import TaskItem from '../TaskItem';

interface PropsT {
  tasks: Itask[];
}

// TODO ?
// Remove props + manage organisations state from component
const TasksList: React.FC<PropsT> = ({ tasks }) => {
  return (
    <div>
      <div>{tasks && tasks.map((task) => <TaskItem key={task._id} task={task} />)}</div>
    </div>
  );
};

export default TasksList;
