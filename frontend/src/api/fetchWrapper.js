function request(method, endpoint, body = {}) {
  const options = {
    method,
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  return fetch(endpoint, options);
}

export function get(endpoint, body) {
  return request("GET", endpoint, body);
}

export function post(endpoint, body) {
  return request("POST", endpoint, body);
}

export function patch(endpoint, body) {
  return request("DELETE", endpoint, body);
}

export function _delete(endpoint, body) {
  return request("DELETE", endpoint, body);
}
