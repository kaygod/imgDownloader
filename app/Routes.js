import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import DetailPage from './containers/Detailpage';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/detail/:id" component={DetailPage} />
    </Switch>
  </App>
);
