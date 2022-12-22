import { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Utils/Loading';

const OrgasList = lazy(() => import('../Organisations/OrgasList'));

const Homepage: React.FC = () => {
  const user = useSelector((state: IState) => state.user);
  const { isLogged, id, username } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      // dispatch(getUserNotifications(id));
    }
  }, [dispatch, id, isLogged]);

  return (
    <div className='page'>
      {isLogged ? (
        <>
          <h1 className='mb-8'>Welcome {username}</h1>
          <Suspense fallback={<Loading />}>
            <OrgasList />
          </Suspense>
        </>
      ) : (
        <>
          <h2>Welcome to</h2>
          <h1 className='mb-8'>meHouse !</h1>
        </>
      )}
      {isLogged && (
        <Link to='/orga/new' className='button-link'>
          Créer un groupe
        </Link>
      )}
    </div>
  );
};

export default Homepage;
