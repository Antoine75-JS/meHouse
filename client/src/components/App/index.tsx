import './App.css';
import { Routes, Route } from 'react-router-dom';

import Homepage from '../Homepage';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        Welcome to Mehouse
        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;
