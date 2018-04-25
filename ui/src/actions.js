import { createAction } from 'redux-actions';

import {fetchAsyncWithAction} from './action-utils';

export const getTodos = createAction('GET_TODOS');
export const getTodosAsync = () => {
  return fetchAsyncWithAction('/api/todos', null, getTodos);
};

export const getTodo = createAction('GET_TODO');
export const getTodoAsync = (id) => {
  return fetchAsyncWithAction(`/api/todos/${id}`, null, getTodo);
};

export const editTodo = createAction('EDIT_TODO');
export const editTodoAsync = (todo) => {
  delete todo._links;
  const todoJson = JSON.stringify(todo);
  const requestSettings =
    {
      method: 'PUT',
      body: todoJson,
      headers: {
        // 'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      }
    };
  if (todo.id) {
    return fetchAsyncWithAction(`/api/todos/${todo.id}`, requestSettings, editTodo);
  } else {
    return fetchAsyncWithAction(`/api/todos`, {...requestSettings, method: 'POST'}, editTodo);
  }
};
