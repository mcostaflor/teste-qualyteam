import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NonConfirmities from './views/NonConformities';
import NewNonConfirmity from './views/NonConformities/NewNonConformity';
import NonConfirmity from './views/NonConformities/DetailNonConformity';

function App() {
  return (
    <Switch>
      <Route exact path='/nonconformities/new' component={NewNonConfirmity} />
      <Route path='/nonconformities/:id' component={NonConfirmity} />
      <Route path='/nonconformities' component={NonConfirmities} />
      <Redirect to='/nonconformities' />
    </Switch>
  );
}

export default App;
