import { createAction } from 'redux-actions';

import {fetchAsyncWithAction} from './action-utils';

export const getTodos = createAction('GET_TODOS');
export const getTodosAsync = () => {
  return fetchAsyncWithAction('/api/todos', null, getTodos);
};

// export const getTodo = createAction('GET_TODO');
// export const getTodoAsync = (id) => {
//   return fetchAsyncWithAction(`/api/todos/${id}`, null, getTodo);
// };
