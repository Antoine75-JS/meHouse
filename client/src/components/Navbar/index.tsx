import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import { submitLogout } from '../../actions/auth';

import NotificationsComponent from '../Utils/NotificationsComponent';

import './styles.css';

const Navbar = () => {
  const isLogged = useSelector((state: IState) => state.user.isLogged);
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('logging out user');
    dispatch(submitLogout());
  };

  useEffect(() => {
    if (!isLogged) redirect('/login');
  }, [isLogged]);

  return (
    <div className='flex gap-2 text-end p-4 items-center'>
      <NavLink to='/' className='grow text-start'>
        Home
      </NavLink>
      {isLogged ? (
        <div className='text-right flex items-center gap-4'>
          <NotificationsComponent />
          <button type='button' onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/signup'>Signup</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
