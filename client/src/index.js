import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import './assets/css/NavBar.css';
import './assets/css/Login.css';
import './assets/css/Signup.css';
import './assets/css/Dashboard.css';
import './assets/css/Forgot.css';
import './assets/css/Board.css';
import "primereact/resources/themes/soho-light/theme.css"; 
import "primereact/resources/primereact.min.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

