import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path='' component={() => <h1>Teste</h1>} />
      <Redirect to='' />
    </Switch>
  );
}

export default App;
