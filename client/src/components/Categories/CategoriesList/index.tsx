/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedCategory } from '../../../actions/category';

import CategoryChip from '../../Utils/CategoryChip';
import NewCategoryForm from '../NewCategoryForm';

interface Props {
  categories: ICategory[];
}

const CategoriesList: React.FC<Props> = ({ categories }) => {
  const [isNewCategoryFormOpen, setIsNewCategoryFormOpen] = useState<boolean>(false);

  const { id } = useParams();

  const selectedCategory = useSelector((state: IState) => state.categories.selectedCategory);
  const dispatch = useDispatch();

  const handleSelecteCategory = (selectedId: string) => {
    dispatch(setSelectedCategory(selectedId));
  };

  const handleAddcategory = () => {
    setIsNewCategoryFormOpen(!isNewCategoryFormOpen);
  };

  return (
    <div>
      <div className='font-bold my-2 pb-1 '>Categories :</div>

      {categories?.map((category: ICategory) => (
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
      {isNewCategoryFormOpen && id && <NewCategoryForm orgaId={id} />}
    </div>
  );
};

export default CategoriesList;
