import React from 'react';

interface Props {
  catName: string;
  style?: object;
}

const CategoryChip: React.FC<Props> = ({ catName, style }) => {
  return (
    <div style={style} className='chip'>
      {catName}
    </div>
  );
};

export default CategoryChip;
