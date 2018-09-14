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
import registerServiceWorker from './registerServiceWorker';

import { loadState, saveState } from './modules/LocalStorage';
import Routes from './routes';
import reducers from './reducers';

const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(ReduxPromise),
);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

ReactDOM.render(
  // TODO use jsx extension for this file, will require to eject the create-react-app
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
