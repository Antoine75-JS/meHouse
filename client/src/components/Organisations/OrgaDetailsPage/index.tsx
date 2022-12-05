/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import TaskItem from '../../Tasks/TaskItem';

const OrganisationDetailsPage: React.FC = () => {
  const [organisation, setOrganisation] = useState<IOrganisation>();
  const location = useLocation();
  const { orga } = location.state;

  useEffect(() => {
    setOrganisation(orga);
    console.log('organisation', orga);
  }, [orga]);

  return (
    <div className='m-4 flex flex-col gap-4'>
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
      <div>
        <div className='flex flex-col font-bold mb-2'>Tasks :</div>
        {organisation?.orgTasks?.map((task: Itask) => (
          <TaskItem key={task?._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default OrganisationDetailsPage;
