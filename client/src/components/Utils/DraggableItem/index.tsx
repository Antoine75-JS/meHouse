import { AnyAction } from '@reduxjs/toolkit';
import React from 'react';
import { useDrag } from 'react-dnd';

interface Props {
  action?: AnyAction;
  type: string;
  id: string;
  children: JSX.Element;
}

const DraggableItem: React.FC<Props> = ({ type, id, children, action }) => {
  const [, drag] = useDrag(() => ({
    type: type,
    item: {
      type: type,
      id: id,
      action: action,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <span ref={drag} className='hover:cursor-grab active:cursor-grabbing'>
      {children}
    </span>
  );
};

export default DraggableItem;
