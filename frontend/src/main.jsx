import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '/context/AuthContext.jsx';

//mount everything into <div id="root">, so react can be injected into the DOM and loads 
ReactDOM.createRoot(document.getElementById('root')).render(  
  <React.StrictMode>    {/* React safety checks and warnings */}
    <BrowserRouter>     {/* enables routing, necessary for navigate() and redirects */}
      <AuthProvider>    {/* holds token state, login: save token -> localStorage, logout: removes token => clear access, makes token available everywhere */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);