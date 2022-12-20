/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface ItemProps {
  orga: IOrganisation;
}

const OrgasListItem: React.FC<ItemProps> = ({ orga }) => {
  return (
    <Link to={`/orga/${orga._id}`} className='card' key={orga._id}>
      <div className='grow font-bold'>{orga.orgName}</div>
      <div>{'>'}</div>
    </Link>
  );
};

const OrgasList: React.FC = () => {
  const organisations = useSelector((state: IState) => state.user.organisations);

  const memoedOrgas = useMemo(() => {
    return organisations;
  }, [organisations]);

  return (
    <>
      <h2 className='font-bold mb-4'>Vos groupes :</h2>
      <div className='mb-8'>
        {memoedOrgas &&
          memoedOrgas?.length > 0 &&
          memoedOrgas?.map((orga: IOrganisation) => <OrgasListItem key={orga?._id} orga={orga} />)}
      </div>
    </>
  );
};

export default OrgasList;
