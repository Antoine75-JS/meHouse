/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import BellIcon from '../Icons/BellIcon';

const NotificationsComponent: React.FC = () => {
  const userNofitications = useSelector((state: IState) => state.user.notifications);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const location = useLocation();

  const handleOpenNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  useEffect(() => {
    setNotificationsOpen(false);
  }, [location]);

  return (
    <div>
      <button type='button' onClick={handleOpenNotifications}>
        {userNofitications && userNofitications.length > 0 && (
          <div className='w-2 h-2 rounded-full bg-greenMain z-10 absolute' />
        )}
        <BellIcon />
      </button>
      {notificationsOpen && (
        <div className='absolute right-4 top-16 flex flex-col gap-2'>
          {userNofitications &&
            userNofitications.length > 0 &&
            userNofitications.map((notification: INotification) => (
              <Link
                to={notification?.actionUrl || ''}
                key={notification?._id}
                className='relative rounded-xl border-2 border-gray-400 bg-slate-700 bg-opacity-90 w-80 text-start p-4'
              >
                {notification?.content}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsComponent;
