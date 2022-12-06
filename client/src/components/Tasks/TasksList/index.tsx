/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import TaskItem from '../TaskItem';

const TasksList: React.FC = () => {
  const taskList = useSelector((state: IState) => state.tasks.tasksList);

  return (
    <div>
      <div>{taskList && taskList.map((task) => <TaskItem key={task._id} task={task} />)}</div>
    </div>
  );
};

export default TasksList;
