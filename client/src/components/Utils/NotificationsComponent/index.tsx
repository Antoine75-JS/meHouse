import React, { useState } from 'react';

import BellIcon from '../Icons/BellIcon';

const NotificationsComponent: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleOpenNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <div>
      <button type='button' onClick={handleOpenNotifications}>
        <div className='w-2 h-2 rounded-full bg-red-700 z-10 absolute' />
        <BellIcon />
      </button>
      {notificationsOpen && (
        <div className='absolute right-4 top-16 flex flex-col gap-2'>
          <div className='relative rounded-xl border-2 border-gray-400 bg-slate-700 bg-opacity-90 w-80 text-start p-4'>
            Notification
          </div>
          <div className='relative rounded-xl border-2 border-gray-400 bg-slate-700 bg-opacity-90 w-80 text-start p-4'>
            Notification
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsComponent;
