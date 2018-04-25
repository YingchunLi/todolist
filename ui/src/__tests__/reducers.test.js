import {asyncFetchHandler, asyncFetchByIdHandler} from '../reducers';

it('asyncFetchHandler handles success result', () => {
  const entityName = 'todos';
  const reducer = asyncFetchHandler(entityName);

  const apiJson = {
    "_embedded": {
      "todos": [
        {
          "_links": {
            "self": {
              "href": "http://localhost:8080/api/todos/9c61dc44-7edb-46b8-8b06-311e0215bb92"
            },
            "todo": {
              "href": "http://localhost:8080/api/todos/9c61dc44-7edb-46b8-8b06-311e0215bb92"
            }
          },
          "description": "remember the milk",
          "dueDate": "2018-05-01T00:00:00.000+0000",
          "name": "milk",
          "status": "Pending"
        }
      ]
    },
    "_links": {
      "profile": {
        "href": "http://localhost:8080/api/profile/todos"
      },
      "self": {
        "href": "http://localhost:8080/api/todos"
      }
    }
  };
  const action = {
    payload: {
      status: 'OK',
      statusCode: 200,
      statusText: 'OK',
      json: apiJson,
      requestPayload: null
    }
  };

  const state = {
    error: false,
    fetching: false,
    posting: false,
    byId: {},
  };
  const newState = reducer(state, action);
  expect(Object.keys(newState.byId)).toEqual(['9c61dc44-7edb-46b8-8b06-311e0215bb92']);
  expect(newState.byId['9c61dc44-7edb-46b8-8b06-311e0215bb92'].name).toBe('milk');
});

it('asyncFetchHandler handles error result', () => {
  const entityName = 'todos';
  const reducer = asyncFetchHandler(entityName);

  const action = {
    error: {
      errorPayload: {status: 'failure', statusCode: 500},
    }
  };

  const state = {
    error: false,
    fetching: false,
    posting: false,
    byId: {},
  };
  const newState = reducer(state, action);
  expect(Object.keys(newState.byId)).toEqual([]);
  expect(newState.error).toEqual(action.error.errorPayload);
});

it('asyncFetchByIdHandler handles success result', () => {
  const apiJson = {
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/todos/9c61dc44-7edb-46b8-8b06-311e0215bb92"
      },
      "todo": {
        "href": "http://localhost:8080/api/todos/9c61dc44-7edb-46b8-8b06-311e0215bb92"
      }
    },
    "description": "remember the milk",
    "dueDate": "2018-05-01T00:00:00.000+0000",
    "name": "milk",
    "status": "Pending"
  };

  const action = {
    payload: {
      status: 'OK',
      statusCode: 200,
      statusText: 'OK',
      json: apiJson,
      requestPayload: null
    }
  };

  const state = {
    error: false,
    fetching: false,
    posting: false,
    byId: {},
  };
  const newState = asyncFetchByIdHandler(state, action);
  expect(Object.keys(newState.byId)).toEqual(['9c61dc44-7edb-46b8-8b06-311e0215bb92']);
  expect(newState.byId['9c61dc44-7edb-46b8-8b06-311e0215bb92'].name).toBe('milk');
});

it('asyncFetchByIdHandler handles error result', () => {
  const action = {
    error: {
      errorPayload: {status: 'failure', statusCode: 500},
    }
  };

  const state = {
    error: false,
    fetching: false,
    posting: false,
    byId: {},
  };
  const newState = asyncFetchByIdHandler(state, action);
  expect(Object.keys(newState.byId)).toEqual([]);
  expect(newState.error).toEqual(action.error.errorPayload);
});
