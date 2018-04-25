import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import _ from 'lodash';

import * as Actions from './actions';

// reducer for fetch a list of values
export const asyncFetchHandler = entityName =>
  (state, action) => {
    // error
    if (action.error) {
      return Object.assign({}, state, {fetching: false, error: _.get(action.error, 'errorPayload', true)});
    }

    // requested
    if (!action.payload || !action.payload.status || !action.payload.json) {
      return Object.assign({}, state, {fetching: true, error: false});
    }

    // success
    const entities = action.payload.json._embedded[entityName];
    const byId = _.reduce(entities, (result, el) => {
      // get id field from link
      const id = el._links.self.href.split('/').pop();
      el.id = id;
      result[id] = el;
      return result;
    }, {});

    return Object.assign({}, state, {fetching: false, byId, error: false});
  };

export const asyncFetchByIdHandler =
  (state, action) => {
    // error
    if (action.error) {
      return Object.assign({}, state, {fetching: false, error: _.get(action.error, 'errorPayload', true)});
    }

    // requested
    if (!action.payload || !action.payload.status || !action.payload.json) {
      return Object.assign({}, state, {fetching: true, error: false});
    }

    // success
    const entity = action.payload.json;
    const id = entity._links.self.href.split('/').pop();
    const byId = Object.assign({}, state.byId, {[id]: {...entity, id}});

    return Object.assign({}, state, {fetching: false, byId, error: false});
  };

const todos = handleActions({
  [Actions.getTodos]: asyncFetchHandler('todos'),
  [Actions.getTodo]: asyncFetchByIdHandler,
  [Actions.editTodo]: asyncFetchByIdHandler,

  },
  {
    error: false,
    fetching: false,
    posting: false,
    byId: {},
  }
);


const rootReducer = combineReducers({
  entities: combineReducers({todos})
});

export default rootReducer;
