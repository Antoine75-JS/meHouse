/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { getOrganisationDetails } from '../../../actions/organisation';
import TasksList from '../../Tasks/TasksList';
import CategoryChip from '../../Utils/CategoryChip';

const OrganisationDetailsPage: React.FC = () => {
  const { id } = useParams();
  const organisation = useSelector((state: IState) => state.organisation);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(getOrganisationDetails(id));
  }, [id]);

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
          {organisation?.orgTasks?.length > 0 ? (
            <TasksList orgTasks={organisation?.orgTasks} />
          ) : (
            <p className='text-center'>Pas de tâches pour le moment</p>
          )}
          <Link
            to={`/task/new/${organisation?._id}`}
            className='self-center border w-32 px-4 py-2 text-center rounded-full'
          >
            New task
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrganisationDetailsPage;
