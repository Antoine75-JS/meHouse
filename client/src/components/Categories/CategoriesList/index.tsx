/* eslint-disable no-underscore-dangle */
import React, { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setSelectedCategory } from '../../../actions/category';
import draggableItemTypes from '../../../types/draggableItemTypes';

import CategoryChip from '../../Utils/CategoryChip';
import NewCategoryForm from '../NewCategoryForm';

const DraggableItem = lazy(() => import('../../Utils/DraggableItem'));

interface Props {
  categories: ICategory[];
}

interface CategoryProps {
  category: ICategory;
}

const CategoryItem: React.FC<CategoryProps> = ({ category }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: IState) => state.categories.selectedCategory);
  const handleSelecteCategory = (selectedId: string) => {
    dispatch(setSelectedCategory(selectedId));
  };
  return (
    <button type='button' onClick={() => handleSelecteCategory(category?._id)}>
      <CategoryChip
        catName={category?.catName}
        style={{
          border: `${category?._id === selectedCategory ? '2px solid #10dd99' : 'none'}`,
          boxSizing: 'content-box',
        }}
      />
    </button>
  );
};

const CategoriesList: React.FC<Props> = ({ categories }) => {
  const [isNewCategoryFormOpen, setIsNewCategoryFormOpen] = useState<boolean>(false);

  const { id } = useParams();

  const handleAddcategory = () => {
    setIsNewCategoryFormOpen(!isNewCategoryFormOpen);
  };

  return (
    <div>
      <div className='font-bold my-2 pb-1 text-secondary'>Categories :</div>
      <div className='flex flex-wrap gap-4 ml-4'>
        {categories &&
          categories?.map((category: ICategory) => (
            <DraggableItem
              type={draggableItemTypes.CATEGORY}
              id={category?._id}
              key={category?._id}
            >
              <CategoryItem key={category?._id} category={category} />
            </DraggableItem>
          ))}
        <button
          className='button-add'
          type='button'
          style={{ rotate: `${isNewCategoryFormOpen ? '45deg' : '0deg'}` }}
          onClick={handleAddcategory}
        >
          +
        </button>
      </div>
      {isNewCategoryFormOpen && id && <NewCategoryForm orgaId={id} />}
    </div>
  );
};

export default CategoriesList;
