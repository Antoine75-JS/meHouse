/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasksFromOrganisation } from '../../../actions/tasks';

import TaskItem from '../TaskItem';

interface Props {
  orgaId: string;
}

const TasksList: React.FC<Props> = ({ orgaId }) => {
  const taskList = useSelector((state: IState) => state.tasks.tasksList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksFromOrganisation(orgaId));
  }, [orgaId, dispatch]);

  return (
    <div>
      <div>{taskList && taskList.map((task) => <TaskItem key={task._id} task={task} />)}</div>
    </div>
  );
};

export default TasksList;
