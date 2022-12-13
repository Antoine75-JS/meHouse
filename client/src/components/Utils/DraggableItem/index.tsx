import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import DraggableItemTypes from '../../../types/draggableItemTypes';

interface Props {
  id: string;
  children: JSX.Element;
}

const DraggableItem: React.FC<Props> = ({ id, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DraggableItemTypes.CATEGORY,
    item: {
      type: DraggableItemTypes.CATEGORY,
      id: id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    console.log('isDraggin', isDragging);
  }, [isDragging]);

  return <span ref={drag}>{children}</span>;
};

export default DraggableItem;
