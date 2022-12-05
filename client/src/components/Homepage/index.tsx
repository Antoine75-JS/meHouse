import { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getAllTasks } from '../../actions/tasks';
import OrgasList from '../Organisations/OrgasList';

import TasksList from '../Tasks/TasksList';

const Homepage: React.FC = () => {
  const isLogged = useSelector((state: IState) => state.user.isLogged);
  const organisations = useSelector((state: IState) => state.user.organisations);
  const dispatch = useDispatch();

  return (
    <div className='lg flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-bold underline mb-8'>Homepage</h2>

      {isLogged && organisations && <OrgasList organisations={organisations} />}
    </div>
  );
};

export default Homepage;
