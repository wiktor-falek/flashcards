function request(method, url, body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options);
}

export function get(url) {
  return request("GET", url);
}

export function post(url, body) {
  return request("POST", url, body);
}

export function patch(url, body) {
  return request("PATCH", url, body);
}

export function _delete(url, body) {
  return request("DELETE", url, body);
}
