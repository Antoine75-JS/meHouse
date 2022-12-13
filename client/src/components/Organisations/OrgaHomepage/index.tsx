/* eslint-disable no-underscore-dangle */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { getOrganisationDetails } from '../../../actions/organisation';
import CategoriesList from '../../Categories/CategoriesList';
import TasksList from '../../Tasks/TasksList';

const OrganisationHomepage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const selectedCategory = useSelector((state: IState) => state.categories.selectedCategory);
  const organisation = useSelector((state: IState) => state.organisation);

  const filteredTasks = useMemo(() => {
    if (organisation?.orgTasks?.length > 0 && selectedCategory !== null)
      return organisation?.orgTasks?.filter((task: Itask) => {
        return task?.category?._id === selectedCategory;
      });
    return organisation?.orgTasks;
  }, [organisation, selectedCategory]);

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
                {user?.username}
              </div>
            ))}
            {/* CATEGORIES */}
            {organisation?.categories && organisation?.categories?.length > 0 && (
              <CategoriesList categories={organisation?.categories} />
            )}
          </div>
          {filteredTasks?.length > 0 ? (
            <TasksList orgTasks={filteredTasks} />
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

export default OrganisationHomepage;
