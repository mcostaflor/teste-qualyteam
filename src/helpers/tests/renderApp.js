import React from 'react';

import { SnackbarProvider } from 'notistack';
import { Router } from 'react-router-dom';
import { history } from '../history';

export const renderApp = (Component) =>
    <Router history={history}><SnackbarProvider preventDuplicate><Component/></SnackbarProvider></Router>
