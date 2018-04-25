import React from 'react';
import ReactDOM from 'react-dom';

// routing
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// service worker for offline-first loading
import registerServiceWorker from './registerServiceWorker';

// style
import './index.css';

// components
import App from './App';
import Todo from "./Todo";
import TodoList from "./TodoList";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/todos" component={TodoList}/>
      <Route path="/todos/:id" component={Todo}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'));

registerServiceWorker();
