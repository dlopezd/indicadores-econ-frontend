import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import { keys } from '../utils/util'

import Historic from './Historic/Historic'
import Home from './Home/Home'
import NavBar from './NavBar'
import Error from './Error'

const App = _ => {

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/:frecuency/:indicador' render={
          ({ match }) => {
            const indicador = match.params.indicador;
            if (keys.some(k => k === indicador)) {
              return (
                <Historic
                  indicador={indicador}
                  frecuency={match.params.frecuency} />);
            }
            return <Error msg="Contenido solicitado no detectado." />;
          }} />
        <Route exact path='/' component={Home} />
        <Route exact path='/*' render={ () => {
          return (<Error msg="Contenido solicitado no detectado." />)
          }} />
      </Switch>
    </>
  );
}

export default withRouter(App);
