/**
 * 
 * @param {string} method 
 * @param {string} url 
 * @param {string | null} body 
 */
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

/**
 * 
 * @param {string} url 
 */
export function get(url) {
  return request("GET", url);
}

/**
 * 
 * @param {string} url 
 * @param {object} body 
 */
export function post(url, body) {
  return request("POST", url, body);
}

/**
 * 
 * @param {string} url 
 * @param {object} body 
 */
export function patch(url, body) {
  return request("PATCH", url, body);
}

/**
 * 
 * @param {string} url 
 * @param {object} body 
 */
export function _delete(url, body) {
  return request("DELETE", url, body);
}
