import { Routes, Route } from 'react-router-dom';

import Homepage from '../Homepage';
import TaskEditPage from '../TaskEditPage';
import TaskPage from '../Tasks/TaskPage';

const App = () => {
  return (
    <div className='bg-main text-white min-h-screen'>
      <header className='p-4'>Welcome to Mehouse</header>
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
