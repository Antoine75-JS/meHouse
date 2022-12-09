/* eslint-disable max-len */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SuccessIcon from './Icons/SuccessIcon';
import ErrorIcon from './Icons/ErrorIcon';
import WarningIcon from './Icons/WarningIcon';
import { closeSnackbar } from '../../../actions/snackbar';

const Snackbar: React.FC<ISnackbar> = () => {
  const message = useSelector((state: IState) => state.snackbar.message);
  const type = useSelector((state: IState) => state.snackbar.type);
  const dispatch = useDispatch();

  const handleCloseSnackbar = () => {
    dispatch(closeSnackbar());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSnackbar();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderIcon = (err: string) => {
    switch (err) {
      case 'success':
        return <SuccessIcon />;

      case 'warning':
        return <WarningIcon />;

      default:
        return <ErrorIcon />;
    }
  };

  return (
    <div
      className='flex fixed bottom-4 left-4 items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800'
      role='alert'
    >
      {renderIcon(type || 'error')}
      <div className='ml-3 text-sm font-normal'>{message || 'Error'}</div>
      <button
        type='button'
        onClick={handleCloseSnackbar}
        className='grid content-center ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
        aria-label='Close'
      >
        <span className='sr-only'>Close</span>
        <span className='rotate-45 origin-center'>+</span>
      </button>
    </div>
  );
};

export default Snackbar;
