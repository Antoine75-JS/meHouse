import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { TaskT } from '../../../types/tasksT';

const TaskPage: React.FC = () => {
  const [details, setDetails] = useState<TaskT>();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const location = useLocation();
  const { task } = location.state;

  useEffect(() => {
    setDetails(task);
  }, [task]);

  useEffect(() => {
    console.log('task from page', details);
    setDate(details?.creationDate);
    console.log('date', date);
  }, [details]);

  return (
    <div>
      {details && (
        <div>
          <h2>{details.taskName}</h2>
          <div>Date :</div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
