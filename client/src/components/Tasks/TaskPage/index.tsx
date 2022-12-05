import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TaskPage: React.FC = () => {
  const [details, setDetails] = useState<Itask>();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const location = useLocation();
  const { task } = location.state;

  useEffect(() => {
    setDetails(task);
  }, [task]);

  useEffect(() => {
    setDate(details?.creationDate);
  }, [details]);

  return (
    <div>
      {details && (
        <div>
          <h2>{details.taskName}</h2>
          <div>
            Date : <span>{date?.toDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
