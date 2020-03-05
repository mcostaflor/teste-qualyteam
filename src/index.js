import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { Router } from 'react-router-dom';
import { history } from './helpers/history';

ReactDOM.render(<Router history={history}><SnackbarProvider preventDuplicate><App /></SnackbarProvider></Router>, document.getElementById('root'));