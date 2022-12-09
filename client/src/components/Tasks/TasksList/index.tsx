/* eslint-disable no-underscore-dangle */
import React from 'react';

import TaskListItem from '../TaskListItem';

interface Props {
  orgTasks: Itask[];
}

const TasksList: React.FC<Props> = ({ orgTasks }) => {
  return (
    <div>
      <div>
        <div className='font-bold my-2'>Tâches en cours :</div>
        {orgTasks &&
          orgTasks
            .filter((task) => !task.isDone)
            .map((task) => <TaskListItem key={task._id} task={task} />)}
      </div>
      <div>
        <div className='font-bold my-2'>Tâches terminées :</div>
        {orgTasks &&
          orgTasks
            .filter((task) => task.isDone)
            .map((task) => <TaskListItem key={task._id} task={task} />)}
      </div>
    </div>
  );
};

export default TasksList;
