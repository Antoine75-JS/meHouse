/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import TasksList from '../../Tasks/TasksList';

const OrganisationDetailsPage: React.FC = () => {
  const [organisation, setOrganisation] = useState<IOrganisation>();
  const location = useLocation();
  const { orga } = location.state;

  useEffect(() => {
    setOrganisation(orga);
  }, [orga]);

  return (
    <div className='p-4 flex flex-col gap-4'>
      <h2 className='text-4xl font-bold pb-4'>{organisation?.orgName} :</h2>
      <div>
        <div className='flex flex-col font-bold mb-2'>Members :</div>
        {organisation?.orgUsers?.map((user: IUser, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className='pl-4' key={i}>
            User
          </div>
        ))}
      </div>
      <TasksList tasks={organisation?.orgTasks || []} />
      <Link
        to={`/task/new/${organisation?._id}`}
        className='self-center border w-32 px-4 py-2 text-center rounded-md'
      >
        New task
      </Link>
    </div>
  );
};

export default OrganisationDetailsPage;
