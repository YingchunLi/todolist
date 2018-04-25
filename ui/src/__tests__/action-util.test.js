import {fetchAsync, fetchAsyncWithAction} from '../action-utils';
import _ from 'lodash';

import fetchMock from 'fetch-mock';

describe('action-utils.js', () => {
  it('fetch async does nothing in test env', () => {
    const requestUrl = 'someurl';
    fetchMock.once(requestUrl, {hello: 'world'});
    fetchAsync('someurl').then(response => {
      expect(response).toBe(undefined);
    });
  });

  it('fetch async does something in non-test env', () => {
    const requestUrl = 'someOtherurl';
    fetchMock.once(requestUrl, {hello: 'world'});
    fetchAsync('someOtherurl', null, {}, 'development').then(response => {
      expect(response.status).toEqual(200);
    });
  });

  it('fetchAsyncWithAction works with good result', () => {
    const requestUrl = 'http://goodurl.com';
    fetchMock.once(requestUrl, {hello: 'world'});

    const mockAction = jest.fn(payload => payload);
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    const middlewareFunc = fetchAsyncWithAction(requestUrl, null, mockAction, null, 'development');

    middlewareFunc(mockDispatch, mockGetState)
      .then(() => {
        expect(mockAction.mock.calls.length).toBe(2);
        expect(mockAction.mock.calls[0].length).toBe(0);
        expect(mockAction.mock.calls[1][0].json).toEqual({hello: 'world'});
        expect(mockDispatch.mock.calls.length).toBe(2);
        expect(mockGetState.mock.calls.length).toBe(1);
      });
  });

  it('fetchAsyncWithAction works with 204', () => {
    const requestUrl = 'http://204.com';
    fetchMock.once(requestUrl, {status: 204});

    const mockAction = jest.fn(payload => payload);
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    const middlewareFunc = fetchAsyncWithAction(requestUrl, null, mockAction, null, 'development');

    middlewareFunc(mockDispatch, mockGetState)
      .then(() => {
        expect(mockAction.mock.calls.length).toBe(2);
        expect(mockAction.mock.calls[0].length).toBe(0);
        expect(mockAction.mock.calls[1][0].json).toEqual(null);
        expect(mockDispatch.mock.calls.length).toBe(2);
        expect(mockGetState.mock.calls.length).toBe(1);
      });
  });

  it('fetchAsyncWithAction with error', () => {
    const requestUrl = 'http://badurl.com';
    fetchMock.once(requestUrl, {status:500, body:{status: 'error'}});

    const mockAction = jest.fn(payload => payload);
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    const middlewareFunc = fetchAsyncWithAction(requestUrl, null, mockAction, null, 'development');

    middlewareFunc(mockDispatch, mockGetState)
      .then(() => {
        expect(mockAction.mock.calls.length).toBe(2);
        expect(mockAction.mock.calls[0].length).toBe(0);
        expect(_.isError(mockAction.mock.calls[1][0])).toBe(true);
        expect(mockAction.mock.calls[1][0].errorPayload).toEqual({status: 'error'});
        expect(mockDispatch.mock.calls.length).toBe(2);
        expect(mockGetState.mock.calls.length).toBe(1);
      });
  });

  it('fetchAsyncWithAction with error not json', () => {
    const requestUrl = 'http://badurlwithnoresponse.com';
    fetchMock.once(requestUrl, {status:500, body: ''});

    const mockAction = jest.fn(payload => payload);
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    const middlewareFunc = fetchAsyncWithAction(requestUrl, null, mockAction, {}, 'development');

    middlewareFunc(mockDispatch, mockGetState)
      .then(() => {
        expect(mockAction.mock.calls.length).toBe(2);
        expect(mockAction.mock.calls[0].length).toBe(1);
        expect(_.isError(mockAction.mock.calls[1][0])).toBe(true);
        expect(mockDispatch.mock.calls.length).toBe(2);
        expect(mockGetState.mock.calls.length).toBe(1);
      });
  });

  it('fetchAsyncWithAction does nothing in test env', () => {
    const requestUrl = 'http://anything.com';
    fetchMock.once(requestUrl, {hello: 'world1'});

    const mockAction = jest.fn(payload => payload);
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    const middlewareFunc = fetchAsyncWithAction(requestUrl, null, mockAction);

    middlewareFunc(mockDispatch, mockGetState)
      .then(() => {
        expect(mockAction.mock.calls.length).toBe(2);
        expect(mockAction.mock.calls[0].length).toBe(0);
        expect(mockAction.mock.calls[1][0].json).toEqual(undefined);
        expect(mockDispatch.mock.calls.length).toBe(2);
        expect(mockGetState.mock.calls.length).toBe(1);
      });
  });
});
