import http from 'http';
import dotenv from 'dotenv';
import { getUser, getUsers, postUser } from './users';
// import getRequestBody from './utils';

dotenv.config();

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  const method = req.method;
  const serverEndpoint = ['/api/users/', '/api/users'];
  const requestedEndpoint = req.url || 'bad url';

  switch (method) {
    case 'GET': {
      if (serverEndpoint.find((item) => item === requestedEndpoint)) {
        res.writeHead(200);
        res.write(getUsers());
        res.end();
      } else if (requestedEndpoint.match(/\/api\/users\/[a-zA-Z0-9-]+/)) {
        getUser(req, res);
      }
    }

    case 'POST': {
      if (serverEndpoint.find((item) => item === requestedEndpoint)) {
        postUser(req, res);
      }
    }
  }
  // if (req.method === 'GET') {
  //   res.write(req.url);
  //   res.end();
  // }
});

server.listen(port);
