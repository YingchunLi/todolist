import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import configureStore from './store';

import {Provider} from 'react-redux';

// wrapper for store
export const withStore = (WrappedComponent, state = {}) => (props) => {
  const store = configureStore(state);
  return (
    <Router>
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    </Router>
  );
};

