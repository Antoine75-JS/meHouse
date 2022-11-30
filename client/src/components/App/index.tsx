import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import Homepage from '../Homepage';
import TaskEditPage from '../TaskEditPage';
import TaskPage from '../Tasks/TaskPage';

// Redux components
import LoadingComponent from '../../containers/loadingContainer';

const App: React.FC = () => {
  const isLoading = useSelector((state: IState) => state.loading.isLoading);
  return (
    <div className='bg-main text-white min-h-screen'>
      <header className='p-4'>Welcome to Mehouse</header>
      {isLoading && <LoadingComponent />}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/:id'>
          <Route index element={<TaskPage />} />
          <Route index path='edit' element={<TaskEditPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
