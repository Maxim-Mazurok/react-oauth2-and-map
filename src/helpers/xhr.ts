export const makeRequest = (
  url: string,
  method: string,
  headers: { [key: string]: string } = {},
  body = '',
): Promise<XMLHttpRequest> => {
  // Create the XHR request
  const request = new XMLHttpRequest();

  // Setup our HTTP request
  request.open(method || 'GET', url, true);

  // Set headers
  for (const property in headers) {
    if (headers.hasOwnProperty(property)) {
      request.setRequestHeader(property, headers[property]);
    }
  }

  // Return it as a Promise
  return new Promise((resolve, reject) => {
    // Setup our listener to process completed requests
    request.onreadystatechange = () => {
      // Only run if the request is complete
      if (request.readyState !== 4) return;

      // Process the response
      if (request.status >= 200 && request.status < 300) {
        // If successful
        resolve(request);
      } else {
        // If failed
        reject(request);
      }
    };

    // Send the request
    request.send(body);
  });
};
