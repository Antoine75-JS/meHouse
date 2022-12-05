import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

// Config dayjs
dayjs.locale('fr');

const TaskPage: React.FC = () => {
  const [details, setDetails] = useState<Itask>();
  const location = useLocation();
  const { task } = location.state;

  useEffect(() => {
    setDetails(task);
  }, [task]);

  useEffect(() => {}, [details]);

  return (
    <div>
      {details && (
        <div>
          <h2>{details.taskName}</h2>
          <div>
            Créée le : <span>{dayjs(details?.creationDate).format('DD/MM/YYYY')}</span>
          </div>
          {details?.expireDate && <span>Expire dans {dayjs(task?.expireDate).from(dayjs())}</span>}
          {details?.repeat && details?.repeatFrequency && (
            <>
              <div>Répété tous les {details.repeatFrequency} jours</div>
              <span>
                Prochaine échéance :{' '}
                {dayjs(task.creationDate).add(task.repeatFrequency, 'days').format('DD/MM/YYYY')}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPage;
