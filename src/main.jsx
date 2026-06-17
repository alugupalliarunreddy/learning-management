import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { StudentProvider } from './context/StudentContext';
import './index.css';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HashRouter>
      <StudentProvider>
        <App />
      </StudentProvider>
    </HashRouter>
  </React.StrictMode>,
);