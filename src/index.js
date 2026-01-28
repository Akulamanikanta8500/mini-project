import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './sign-in/login';
import StatusPage from './sign-in/submit';
import SignIn from './app-sign/login';
import ApplicationForm from './app-sign/applicationform';
import AdminDashboard from './app-sign/admin/Admdashboard';
import { Apps } from './apps';
import { Routes } from 'react-router-dom';
import Routepage from './route/route-page';
import About from './about/about';
import History from './about/history';
import Header from './home/header';
import HomePage from './home/header';
import { Nav } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AdminDashboard /> */}
    <Routepage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
