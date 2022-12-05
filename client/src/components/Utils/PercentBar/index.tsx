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
  // console.log(creationDate, repeatFrequency, expireDate);

  const today = dayjs().valueOf();
  const created = dayjs(creationDate).valueOf();
  const repeat = dayjs(created).add(repeatFrequency, 'day').valueOf();
  const expire = dayjs('2022-12-24').valueOf();

  const total = expire - created;
  const progress = today - created;

  // console.log(total, progress);

  const percent = Math.round((progress / total) * 10000);
  // console.log('percent', percent);

  return (
    <div className='w-12 h-2 bg-white rounded-xl'>
      <div className='h-2 bg-gray-500 rounded-xl' style={{ width: `${percent}%` }} />
    </div>
  );
};

export default PercentBar;
