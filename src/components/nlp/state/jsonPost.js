const jsonPost = (url, body, optionalHeaders) => {
  let headers = {
    "Content-Type": "application/json",
  }
  if (optionalHeaders) {
    headers = {
      ...headers,
      ...optionalHeaders,
    }
  }
  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    credentials: "include",
  })
}

export default jsonPost
