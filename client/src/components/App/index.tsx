import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import Homepage from '../Homepage';
import TaskEditPage from '../TaskEditPage';
import TaskPage from '../Tasks/TaskPage';
import LoginPage from '../Login';
// Redux components
// import LoadingComponent from '../../containers/loadingContainer';
import Loading from '../Utils/Loading';

const App: React.FC = () => {
  const isLoading = useSelector((state: IState) => state.loading.isLoading);
  return (
    <div className='bg-main text-white min-h-screen'>
      <header className='p-4'>Welcome to Mehouse</header>
      {isLoading && <Loading />}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user/:id'>
          <Route index element={<TaskPage />} />
          <Route index path='edit' element={<TaskEditPage />} />
        </Route>
        <Route path='*' element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
