import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from './reducers';

export const configureMiddleWares = (env = process.env.NODE_ENV) => {
  let middlewares = [thunk];
  if ( env === 'development') { // add logger only when in 'development' mode
    middlewares.push(createLogger());
  }
  return middlewares;
};

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...configureMiddleWares()),
  )
}
