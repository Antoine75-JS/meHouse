import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Utils/Loading';

const OrgasList = lazy(() => import('../Organisations/OrgasList'));

const Homepage: React.FC = () => {
  const isLogged = useSelector((state: IState) => state.user.isLogged);

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
