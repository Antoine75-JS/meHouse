/* eslint-disable no-underscore-dangle */
import React from 'react';
import TaskItem from '../TaskItem';

import type { TaskT } from '../../../types/components/tasksT';

interface PropsT {
  tasks: TaskT[];
}

const TasksList: React.FC<PropsT> = ({ tasks }) => {
  console.log('tasks', tasks);
  return <div>{tasks && tasks.map((task) => <TaskItem key={task._id} task={task} />)}</div>;
};

export default TasksList;
