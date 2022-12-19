import { lazy, Suspense, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Utils/Loading';

import { getUserNotifications } from '../../actions/notification';

const OrgasList = lazy(() => import('../Organisations/OrgasList'));

const Homepage: React.FC = () => {
  const isLogged = useSelector((state: IState) => state.user.isLogged);
  const id = useSelector((state: IState) => state.user.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      console.log('dispatching getUserNOtifs');
      dispatch(getUserNotifications(id));
    }
  }, [dispatch, id, isLogged]);

  return (
    <div className='lg flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-bold underline mb-8'>Homepage</h2>
      {isLogged && (
        <Suspense fallback={<Loading />}>
          <OrgasList />
        </Suspense>
      )}
      {isLogged && <Link to='/orga/new'>Créer un groupe</Link>}
    </div>
  );
};

export default Homepage;
