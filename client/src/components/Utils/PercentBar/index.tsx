import React from 'react';

// Dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

// Config dayjs
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale('fr');

interface Props {
  creationDate: Date | undefined;
  repeatFrequency: number;
  expireDate: Date | undefined;
}

const PercentBar: React.FC<Props> = (props) => {
  const { creationDate, repeatFrequency = 0, expireDate } = props;
  console.log(creationDate, repeatFrequency, expireDate);

  const today = dayjs();
  const created = dayjs(creationDate);

  // If no expire date, set date from repeat frequency
  const repeat = dayjs(created).add(repeatFrequency, 'day');

  // Use expireDate if provided, repeat if not
  const expire = dayjs(expireDate || repeat);

  const total = expire.diff(created);
  const progress = today.diff(created);

  console.log(expire);

  const percent = Math.round((progress / total) * 100);
  console.log('percent', percent);

  return (
    <div className='w-12 h-2 bg-white rounded-xl overflow-hidden'>
      <div className='h-2 bg-gray-500 rounded-xl' style={{ width: `${percent}%` }} />
    </div>
  );
};

export default PercentBar;
