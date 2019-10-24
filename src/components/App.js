import React, { useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {
  appLoadedSelect,
  appNameSelect,
  currentUserSelect
} from '../selectors'

import Header from './Header';
import Home from './Home';

import { APP_LOAD } from '../constants/actionTypes';

const App = () => {
  const appName = useSelector(appNameSelect);
  const appLoaded = useSelector(appLoadedSelect);
  const currentUser = useSelector(currentUserSelect);
  const dispatch = useDispatch();
  const onLoad = (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true });

  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    onLoad(token ? agent.Auth.current() : null, token);
  });

  if (appLoaded) {
    return (<>
      <Header
        appName={appName}
        currentUser={currentUser}
      />
      <Route exact path='/' component={Home}/>
      
    </>);
  }

  return (<Header appName={appName} currentUser={currentUser} />);
}

export default App;