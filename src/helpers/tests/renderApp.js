import React from 'react';

import { createMemoryHistory } from 'history';

import { SnackbarProvider } from 'notistack';
import { Router, Route, Switch } from 'react-router-dom';

export default (Component, path, route, props) => {
    const history = createMemoryHistory({ initialEntries: [route] });
    return (
        <Router history={history}>
            <SnackbarProvider preventDuplicate>
                <Switch>
                    <Route path={path} component={Component} {...props} />
                </Switch>
            </SnackbarProvider>
        </Router>
    );
}