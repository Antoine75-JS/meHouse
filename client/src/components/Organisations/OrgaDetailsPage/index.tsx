/* eslint-disable no-underscore-dangle */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { getOrganisationDetails } from '../../../actions/organisation';
import NewCategoryForm from '../../Categories/NewCategoryForm';
import TasksList from '../../Tasks/TasksList';
import CategoryChip from '../../Utils/CategoryChip';

const OrganisationDetailsPage: React.FC = () => {
  const [isNewCategoryFormOpen, setIsNewCategoryFormOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const { id } = useParams();
  const organisation = useSelector((state: IState) => state.organisation);
  const dispatch = useDispatch();

  const filteredTasks = useMemo(() => {
    if (organisation?.orgTasks?.length > 0 && selectedCategory)
      return organisation?.orgTasks?.filter((task: Itask) => {
        return task?.category?._id === selectedCategory;
      });

    return organisation?.orgTasks;
  }, [selectedCategory, organisation]);

  const handleSelecteCategory = (category: string) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
    // prettier-ignore
    else {
      setSelectedCategory('');
    }
  };

  const handleAddcategory = () => {
    console.log('adding category');
    setIsNewCategoryFormOpen(!isNewCategoryFormOpen);
  };

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
            <div className='font-bold my-2 pb-1 '>Categories :</div>
            {organisation?.categories &&
              organisation?.categories?.length > 0 &&
              organisation?.categories?.map((category: ICategory) => (
                <button
                  key={category._id}
                  type='button'
                  onClick={() => handleSelecteCategory(category?._id)}
                >
                  <CategoryChip
                    catName={category?.catName}
                    style={{
                      border: `${category?._id === selectedCategory ? '2px solid white' : 'none'}`,
                    }}
                  />
                </button>
              ))}
            <button
              className='ml-4 h-8 w-8 rounded-full bg-slate-400 font-white text-center pb-0.5'
              type='button'
              style={{ rotate: `${isNewCategoryFormOpen ? '45deg' : '0deg'}` }}
              onClick={handleAddcategory}
            >
              +
            </button>
            {isNewCategoryFormOpen && <NewCategoryForm />}
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

export default OrganisationDetailsPage;
