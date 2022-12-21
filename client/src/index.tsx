import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

// Check device for react dnd
import { isMobile } from 'react-device-detect';

// DnD
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <App />
        </DndProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
);
