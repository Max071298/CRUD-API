import http from 'http';

function getRequestBody(req: http.IncomingMessage) {
  // try {
  let data = '';
  req.on('data', (chunk: String) => {
    data = chunk.toString();
  });

  req.on('end', () => {
    JSON.parse(data);
  });

  return data;
  // } catch (e) {
  //   return e;
  // }
}

export default getRequestBody;
