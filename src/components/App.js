import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { APP_LOAD } from '../constants/actionTypes';

const commonSelect = state => state.common;

const appNameSelect = createSelector(
  commonSelect,
  common => common.appName
);

const appLoadedSelect = createSelector(
  commonSelect,
  common => common.appLoaded
);

const App = () => {
  const appName = useSelector(appNameSelect);
  const appLoaded = useSelector(appLoadedSelect);
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
  return appLoaded ? (<div className="App">
    <h1> Hello, React World! </h1>
  </div>) : (<div>APP NOT LOADED {appName}</div>);
}

export default App;