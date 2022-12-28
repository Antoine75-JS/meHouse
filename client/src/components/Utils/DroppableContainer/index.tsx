import { AnyAction } from '@reduxjs/toolkit';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

interface DroppableContainerPropsT {
  accepts: string;
  helperText: string;
  action?: AnyAction;
  children: JSX.Element;
}

const DroppableContainer: React.FC<DroppableContainerPropsT> = ({
  accepts,
  helperText,
  action,
  children,
}) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: accepts,
      drop: (item: any) => {
        const dropAction = action || item.action;

        switch (dropAction.type) {
          case 'ADD_CATEGORY_TO_TASK': {
            const { id } = item;
            dropAction.payload.catId = id;

            dispatch(dropAction);
            break;
          }
          case 'EDIT_TASK': {
            dispatch(dropAction);

            break;
          }
          default:
            break;
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );

  return (
    <div ref={drop} style={{ opacity: isOver ? 0.5 : 1, minWidth: '100px' }}>
      {!isOver ? (
        children
      ) : (
        <div>
          {children && accepts !== 'category' ? (
            <>
              <div className='w-100 mb-4 text-center'>{helperText}</div>
              <div>{children}</div>
            </>
          ) : (
            <div className='ml-4'>{helperText}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DroppableContainer;
