import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

// Global css for this layout
// TODO refactor with JSS
import 'bulma/css/bulma.css';
// Import styles order: https://github.com/facebook/create-react-app/issues/3621
import './vendor/bulmaswatch.css';

import Routes from './routes';
import reducers from './reducers';

import registerServiceWorker from './registerServiceWorker';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  // TODO use jsx extension for this file, will require to eject the create-react-app
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
