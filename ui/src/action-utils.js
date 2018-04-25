// common async action creator
export const fetchAsync = (requestURL,
                           requestSettings,
                           state,
                           env=process.env.NODE_ENV) => {
  const init = Object.assign({}, requestSettings);

  // do not do real fetch in test environment
  if (env === 'test') {
    return new Promise(() => {});
  }
  return fetch(requestURL, init)
    .then(response => {
      if (!response.ok) {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    });
};

export const fetchAsyncWithAction = (requestURL,
                                     requestSettings,
                                     asyncAction,
                                     initPayload,
                                     env = process.env.NODE_ENV
                                     ) => {
  return (dispatch, getState) => {
    initPayload ? dispatch(asyncAction(initPayload)) : dispatch(asyncAction());
    let status = null;
    let statusText = null;
    return fetchAsync(requestURL, requestSettings, getState(), env)
      .then(response => {
        status = response.status;
        statusText = response.statusText;
        return (response.status === 204) ? null : response.json();
      })
      .then(json => {
        const data = {status: 'OK', statusCode:status, statusText: statusText, json: json, requestPayload: initPayload};
        dispatch(asyncAction(data));
      })
      .catch(error => {
        const action = asyncAction(error);
        action.initPayload = initPayload;
        return error.response.json().then(errorPayload => {
          action.errorPayload = errorPayload;
          dispatch(action);
        }).catch((error) => dispatch(action));
      })
  }
};
