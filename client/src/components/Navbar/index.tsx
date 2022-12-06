import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './styles.css';

const Navbar = () => {
  const isLogged = useSelector((state: IState) => state.user.isLogged);

  return (
    <div className='flex gap-2 text-end p-4'>
      <NavLink to='/'>Home</NavLink>
      {isLogged ? (
        <>
          <NavLink to='/orga'>Organisation</NavLink>
          <NavLink to='/tasks'>Tasks</NavLink>
          <NavLink to='/logout' className='grow'>
            Logout
          </NavLink>
        </>
      ) : (
        <NavLink to='/login'>Login</NavLink>
      )}
    </div>
  );
};

export default Navbar;
