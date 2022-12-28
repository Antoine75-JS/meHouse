/* eslint-disable no-underscore-dangle */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { getOrganisationDetails } from '../../../actions/organisation';
import CategoriesList from '../../Categories/CategoriesList';
import TasksList from '../../Tasks/TasksList';
import InviteUserForm from '../../User/InviteUserForm';

const OrganisationHomepage: React.FC = () => {
  const [isInviteUserFormOpen, setIsInviteUserFormOpen] = useState<boolean>(false);
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

  const handleInviteUser = () => {
    setIsInviteUserFormOpen(!isInviteUserFormOpen);
  };

  // TODO
  // Refacto form for invite user + add category
  // FormComponent Util
  return (
    <div className='page'>
      {organisation && (
        <div className='p-4 flex flex-col gap-4'>
          <h1 className='text-4xl font-bold pb-4'>{organisation?.orgName} :</h1>
          <div>
            {/* MEMBERS */}
            <div>
              <div className='font-bold my-2 text-secondary '>Membres :</div>
              <div className='flex gap-4 items-center ml-4'>
                {organisation?.orgUsers?.map((user: IUser, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={i}>{user?.username}</div>
                ))}
                <button
                  className='button-add'
                  type='button'
                  style={{ rotate: `${isInviteUserFormOpen ? '45deg' : '0deg'}` }}
                  onClick={handleInviteUser}
                >
                  +
                </button>
              </div>
              {isInviteUserFormOpen && (
                <InviteUserForm
                  setIsInviteUserFormOpen={setIsInviteUserFormOpen}
                  orgaId={organisation?._id}
                />
              )}
            </div>
            {/* CATEGORIES */}
            <CategoriesList categories={organisation?.categories} />
          </div>
          {filteredTasks?.length > 0 ? (
            <TasksList orgTasks={filteredTasks} />
          ) : (
            <p className='text-center'>Pas de tâches pour le moment</p>
          )}
          <Link to={`/task/new/${organisation?._id}`} className='button-link'>
            New task
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrganisationHomepage;
