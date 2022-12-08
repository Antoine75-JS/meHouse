/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import TasksList from '../../Tasks/TasksList';
import CategoryChip from '../../Utils/CategoryChip';

const OrganisationDetailsPage: React.FC = () => {
  const [organisation, setOrganisation] = useState<IOrganisation>();
  const location = useLocation();
  const { orga } = location.state;

  useEffect(() => {
    setOrganisation(orga);
  }, [orga]);

  return (
    <div>
      {organisation && (
        <div className='p-4 flex flex-col gap-4'>
          <h2 className='text-4xl font-bold pb-4'>{organisation?.orgName} :</h2>
          <div>
            {/* MEMBERS */}
            <div className='font-bold my-2'>Members :</div>
            {organisation?.orgUsers?.map((user: IUser, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className='pl-4' key={i}>
                User
              </div>
            ))}
            {/* CATEGORIES */}
            <div className='font-bold my-2 pb-1'>Categories :</div>
            {organisation?.categories &&
              organisation?.categories?.length > 0 &&
              organisation?.categories?.map((category: ICategory, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <CategoryChip key={category._id} catName={category?.catName} />
              ))}
          </div>
          <TasksList orgaId={organisation?._id} />
          <Link
            to={`/task/new/${organisation?._id}`}
            className='self-center border w-32 px-4 py-2 text-center rounded-md'
          >
            New task
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrganisationDetailsPage;
