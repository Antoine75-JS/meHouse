/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  organisations: IOrganisation[];
}

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

const OrgasList: React.FC<Props> = ({ organisations }) => {
  return (
    <>
      <h2 className='font-bold mb-4'>Organisations :</h2>
      {organisations.length > 0 &&
        organisations.map((orga) => <OrgasListItem key={orga?._id} orga={orga} />)}
    </>
  );
};

export default OrgasList;
