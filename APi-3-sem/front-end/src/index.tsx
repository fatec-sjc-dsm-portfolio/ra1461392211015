import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/global.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);


