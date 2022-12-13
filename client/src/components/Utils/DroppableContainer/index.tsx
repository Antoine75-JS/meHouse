import { AnyAction } from '@reduxjs/toolkit';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import DraggableItemTypes from '../../../types/draggableItemTypes';

interface DroppableContainerPropsT {
  helperText: string;
  action: AnyAction;
  children: JSX.Element;
}

const DroppableContainer: React.FC<DroppableContainerPropsT> = ({
  helperText,
  action,
  children,
}) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.CATEGORY,
      drop: (item: any) => {
        const { id } = item;
        action.payload.catId = id;

        dispatch(action);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );

  return (
    <div ref={drop} style={{ opacity: isOver ? 0.5 : 1 }}>
      {!isOver ? children : <span>{helperText}</span>}
    </div>
  );
};

export default DroppableContainer;
