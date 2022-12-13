import React from 'react';

interface Props {
  catName: string;
  style?: object;
}

const CategoryChip: React.FC<Props> = ({ catName, style }) => {
  return (
    <div
      style={style}
      className='ml-4 max-w-fit py-2 px-4 bg-slate-500 text-white rounded-full text-xs align-text-top font-semibold'
    >
      {catName}
    </div>
  );
};

export default CategoryChip;
