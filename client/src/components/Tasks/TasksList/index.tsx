/* eslint-disable no-underscore-dangle */
import React, { Suspense, lazy } from 'react';
import Loading from '../../Utils/Loading';

const TaskListItem = lazy(() => import('../TaskListItem'));

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
            .map((task) => (
              <Suspense fallback={<Loading />} key={task._id}>
                <TaskListItem task={task} />
              </Suspense>
            ))}
      </div>
      <div>
        <div className='font-bold my-2'>Tâches terminées :</div>
        {orgTasks &&
          orgTasks
            .filter((task) => task.isDone)
            .map((task) => (
              <Suspense fallback={<Loading />} key={task._id}>
                <TaskListItem task={task} />
              </Suspense>
            ))}
      </div>
    </div>
  );
};

export default TasksList;
