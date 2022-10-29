function request(method, endpoint, body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  return fetch(endpoint, options);
}

export function get(endpoint) {
  return request("GET", endpoint);
}

export function post(endpoint, body) {
  return request("POST", endpoint, body);
}

export function patch(endpoint, body) {
  return request("PATCH", endpoint, body);
}

export function _delete(endpoint, body) {
  return request("DELETE", endpoint, body);
}
