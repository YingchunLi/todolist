import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import configureStore from './store';

import {Provider} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// wrapper for store and material ui
export const withStoreAndMaterialUI = (WrappedComponent, state = {}) => (props) => {
  const store = configureStore(state);
  window.store = store;       // allow using window.store.getState() directly without connect/mapStateToProps()
  return (
    <Router>
      <MuiThemeProvider>
        <Provider store={store}>
          <WrappedComponent {...props} />
        </Provider>
      </MuiThemeProvider>
    </Router>
  );
};

