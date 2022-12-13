import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import DraggableItemTypes from '../../../types/draggableItemTypes';

interface Props {
  id: string;
  children: JSX.Element;
}

const DraggableItem: React.FC<Props> = ({ id, children }) => {
  const [, drag] = useDrag(() => ({
    type: DraggableItemTypes.CATEGORY,
    item: {
      type: DraggableItemTypes.CATEGORY,
      id: id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return <span ref={drag}>{children}</span>;
};

export default DraggableItem;
