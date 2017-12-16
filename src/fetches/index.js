const handleHttpStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  throw res;
};

const createErrorHandler = defaultValue => res => {
  console.error('request failed', res);
  return defaultValue;
};

export const postRequest = (request) => {
  return fetch('/api/v1/request', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(request),
  }).then(handleHttpStatus).catch(createErrorHandler({}));
}

export const getRequests = (status) => {
  return fetch(`/api/v1/requests/${status}`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleHttpStatus).catch(createErrorHandler([]));
}

export const getRequestById = (requestId) => {
  return fetch(`/api/v1/request/info/${requestId}`, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(handleHttpStatus).catch(createErrorHandler({}));
}

export const updateRequest = (requestId) => {
  return fetch(`/api/v1/request/status/${requestId}`, {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(handleHttpStatus).catch(createErrorHandler({}));
}

export const postPro = (pro) => {
  return fetch('/api/v1/pro', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(pro),
  }).then(handleHttpStatus).catch(createErrorHandler({}));
}

export const getRequestsByProId = (proId) => {
  return fetch(`/api/v1/pro/requests/${proId}`, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(handleHttpStatus).catch(createErrorHandler([]));
}

export const getCreditsByProId = (proId) => {
  return fetch(`/api/v1/pro/credits/${proId}`, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(handleHttpStatus).catch(createErrorHandler({}));
}

export const postProLogin = (login) => {
  return fetch('/api/v1/pro/login', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(login),
  }).then(handleHttpStatus).catch(createErrorHandler({}));
}

export const bidService = (proId, requestId) => {
  return fetch(`/api/v1/pro/bid/${proId}/${requestId}`, {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(handleHttpStatus).catch(createErrorHandler({}));
}

export const getRequestsBid = (proId) => {
  return fetch(`/api/v1/pro/bid/${proId}`, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(handleHttpStatus).catch(createErrorHandler([]));
}
