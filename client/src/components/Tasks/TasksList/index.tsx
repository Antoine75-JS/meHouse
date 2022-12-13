/* eslint-disable no-underscore-dangle */
import React, { Suspense, lazy } from 'react';
import { editTask } from '../../../actions/tasks';
import draggableItemTypes from '../../../types/draggableItemTypes';
import DraggableItem from '../../Utils/DraggableItem';
import DroppableContainer from '../../Utils/DroppableContainer';
import Loading from '../../Utils/Loading';

const TaskListItem = lazy(() => import('../TaskListItem'));

interface Props {
  orgTasks: Itask[];
}

const TasksList: React.FC<Props> = ({ orgTasks }) => {
  return (
    <div>
      <div className='font-bold my-2 mb-4'>Tâches en cours :</div>
      <DroppableContainer accepts={draggableItemTypes.TASK_DONE} helperText='Add to list'>
        <div>
          {orgTasks &&
            orgTasks
              .filter((task) => !task.isDone)
              .map((task) => (
                <Suspense fallback={<Loading />} key={task._id}>
                  <DraggableItem
                    type={draggableItemTypes.TASK_ACTIVE}
                    id={task?._id}
                    key={task?._id}
                    action={editTask({ ...task, isDone: true })}
                  >
                    <TaskListItem task={task} />
                  </DraggableItem>
                </Suspense>
              ))}
        </div>
      </DroppableContainer>
      <div>
        <div className='font-bold my-2 mb-4'>Tâches terminées :</div>
        <DroppableContainer accepts={draggableItemTypes.TASK_ACTIVE} helperText='Set as done !'>
          <div>
            {orgTasks &&
              orgTasks
                .filter((task) => task.isDone)
                .map((task) => (
                  <Suspense fallback={<Loading />} key={task._id}>
                    <DraggableItem
                      type={draggableItemTypes.TASK_DONE}
                      id={task?._id}
                      key={task?._id}
                      action={editTask({ ...task, isDone: false })}
                    >
                      <TaskListItem task={task} />
                    </DraggableItem>
                  </Suspense>
                ))}
          </div>
        </DroppableContainer>
      </div>
    </div>
  );
};

export default TasksList;
