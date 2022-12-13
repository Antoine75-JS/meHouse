import { useDrop } from 'react-dnd';
import DraggableItemTypes from '../../../types/draggableItemTypes';

interface DroppableContainerPropsT {
  targetId: string;
  helperText: string;
  children: JSX.Element;
}

const DroppableContainer: React.FC<DroppableContainerPropsT> = ({
  targetId,
  children,
  helperText,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.CATEGORY,
      drop: (_item: unknown, monitor) => {
        const dropped = monitor.didDrop();

        console.log('dropped', dropped, 'item', _item, 'target', targetId);
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
