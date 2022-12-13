/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface ItemProps {
  orga: IOrganisation;
}

const OrgasListItem: React.FC<ItemProps> = ({ orga }) => {
  return (
    <Link
      to={`/orga/${orga._id}`}
      state={{ orga }}
      className='w-600 mb-4 border p-4 rounded-xl flex'
      key={orga._id}
    >
      <div className='grow'>{orga.orgName}</div>
      <div>{'>'}</div>
    </Link>
  );
};

const OrgasList: React.FC = () => {
  const organisations = useSelector((state: IState) => state.user.organisations);

  const memoedOrgas = useMemo(() => {
    console.log('organisations changed', organisations);
    return organisations;
  }, [organisations]);

  return (
    <>
      <h2 className='font-bold mb-4'>Organisations :</h2>
      {memoedOrgas &&
        memoedOrgas?.length > 0 &&
        memoedOrgas?.map((orga: IOrganisation) => <OrgasListItem key={orga?._id} orga={orga} />)}
    </>
  );
};

export default OrgasList;
