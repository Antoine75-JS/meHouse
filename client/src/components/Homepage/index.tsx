import { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getAllTasks } from '../../actions/tasks';

import TasksList from '../Tasks/TasksList';

const Homepage: React.FC = () => {
  const tasksList = useSelector((state: IState) => state.tasks.tasksList);
  const isLogged = useSelector((state: IState) => state.user.isLogged);
  const dispatch = useDispatch();

  const tasks = useMemo(() => {
    return tasksList;
  }, [tasksList]);

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <div className='lg flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-bold underline mb-8'>Homepage</h2>
      {tasksList && isLogged && <TasksList tasks={tasks} />}
    </div>
  );
};

export default Homepage;
