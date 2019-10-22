
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history } from './store';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './components/App';

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
        </Router>
    </Provider>
), document.getElementById('root'));