import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import { submitLogout } from '../../actions/auth';

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
    <div className='flex gap-2 text-end p-4'>
      <NavLink to='/'>Home</NavLink>
      {isLogged ? (
        <button type='button' className='grow text-right' onClick={handleLogout}>
          Logout
        </button>
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
