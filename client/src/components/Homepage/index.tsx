import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import OrgasList from '../Organisations/OrgasList';

const Homepage: React.FC = () => {
  const isLogged = useSelector((state: IState) => state.user.isLogged);
  const organisations = useSelector((state: IState) => state.user.organisations);

  return (
    <div className='lg flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-bold underline mb-8'>Homepage</h2>
      {isLogged && organisations && <OrgasList organisations={organisations} />}
      <Link to='/orga/new'>Créer un groupe</Link>
    </div>
  );
};

export default Homepage;
