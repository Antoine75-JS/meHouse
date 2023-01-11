import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrganisationDetails, joinOrganisationWithInvite } from '../../../actions/organisation';

const JoinOrganisationComponent: React.FC = () => {
  const organisation = useSelector((state: IState) => state.organisation);
  const user = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(getOrganisationDetails(id));
  }, [id, dispatch]);

  const handleJoinOrganisation = () => {
    const { email, notifications } = user;
    const notification = notifications?.find((notif: INotification) => notif?.orgaId === id);
    if (notification) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { orgaId, _id } = notification;
      if (user) dispatch(joinOrganisationWithInvite({ orgaId, email, notificationId: _id }));
    }
  };

  return (
    <div>
      <div>Vous êtes invité à rejoindre {organisation?.orgName}</div>
      <button type='button' onClick={handleJoinOrganisation}>
        Rejoindre
      </button>
    </div>
  );
};

export default JoinOrganisationComponent;
