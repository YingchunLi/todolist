import React from 'react';
import ReactDOM from 'react-dom';

// routing
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Redux
import configureStore from './store';
import { Provider } from 'react-redux';

// service worker for offline-first loading
import registerServiceWorker from './registerServiceWorker';

// style
import './index.css';

// components
import App from './App';
import Todo from "./Todo";
import TodoList from "./TodoList";

const store = configureStore();
console.log('Store configured with initial state: ', store.getState());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/todos" component={TodoList}/>
        <Route path="/todos/:id" component={Todo}/>
      </Switch>
    </Provider>

  </BrowserRouter>,
  document.getElementById('root'));

registerServiceWorker();
