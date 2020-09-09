import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import shoppingListReducer from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import './fresca.css';

import App from './components/App'

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
};

const middlewares = [logger];

const store = createStore(
  shoppingListReducer,
  applyMiddleware(...middlewares)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);