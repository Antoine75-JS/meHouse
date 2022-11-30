import { useEffect, useMemo } from 'react';
import { useFetch, TApiResponse } from '../../hooks/useFetch';

import TasksList from '../Tasks/TasksList';

const Homepage: React.FC = () => {
  const { data, loading, error } = useFetch(`${process.env.REACT_APP_API_URL}/tasks`);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='lg flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-bold underline mb-8'>Homepage</h2>
      {loading && <div>Loading...</div>}
      <TasksList tasks={data?.tasksFound} />
    </div>
  );
};

export default Homepage;
