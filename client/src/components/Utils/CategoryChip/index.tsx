import React from 'react';

interface Props {
  catName: string;
  style?: object;
}

const CategoryChip: React.FC<Props> = ({ catName, style }) => {
  return (
    <button
      style={style}
      type='button'
      className='ml-4 py-2 px-4 bg-slate-500 text-white rounded-full text-xs align-text-top font-semibold'
    >
      {catName}
    </button>
  );
};

export default CategoryChip;
