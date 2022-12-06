import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Homepage from '../Homepage';
import TaskEditPage from '../Tasks/EditTaskForm';
import TaskPage from '../Tasks/TaskPage';
import LoginPage from '../LoginPage';
// Redux components
// import LoadingComponent from '../../containers/loadingContainer';
import Loading from '../Utils/Loading';
import { checkUserLogged } from '../../actions/auth';
import Snackbar from '../Utils/Snackbar';
import Navbar from '../Navbar';
import OrganisationDetailsPage from '../Organisations/OrgaDetailsPage';
import NewTaskForm from '../Tasks/NewTaskForm';

const App: React.FC = () => {
  const isLogged = useSelector((state: IState) => state.user.isLogged);
  const isLoading = useSelector((state: IState) => state.loading.isLoading);
  const isSnackbarOpen = useSelector((state: IState) => state.snackbar.isSnackbarOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserLogged());
  }, []);

  return (
    <div className='bg-main text-white min-h-screen h-full'>
      <header>
        <Navbar />
      </header>
      {isLoading && <Loading />}
      {isSnackbarOpen && <Snackbar />}
      <Routes>
        {isLogged && (
          <>
            <Route path='/task'>
              <Route index element={<TaskPage />} />
              <Route path=':id' element={<TaskPage />} />
              <Route path=':id/edit' element={<TaskEditPage />} />
              <Route path='new/:id' element={<NewTaskForm />} />
            </Route>
            <Route path='/orga'>
              <Route path=':id' element={<OrganisationDetailsPage />} />
            </Route>
          </>
        )}
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
