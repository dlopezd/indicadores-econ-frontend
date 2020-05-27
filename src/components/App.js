import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import { keys } from '../utils/util'

import Historic from './Historic'
import Home from './Home'
import NavBar from './NavBar'
import NotFound from './NotFound'

const App = _ => {

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/:key' render={
          ({ match }) => {
            const key = match.params.key;
            if (keys.some(k => k === key)) {
              return <Historic key={key} />;
            }
            return <NotFound />;
          }} />
        <Route exact path='/' component={Home} />
        <Route exact path='/*' component={NotFound} />
      </Switch>
    </>
  );
}

export default withRouter(App);
