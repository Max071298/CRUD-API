import http from 'http';
import dotenv from 'dotenv';
import { deleteUser, getUser, getUsers, postUser, updateUser } from './users';
import { endPointRegExp } from './utils';

dotenv.config();

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  const method = req.method;
  const serverEndpoint = ['/api/users/', '/api/users'];
  const requestedEndpoint = req.url || 'bad url';

  switch (method) {
    case 'GET': {
      if (serverEndpoint.find((item) => item === requestedEndpoint)) {
        res.writeHead(200);
        res.write(getUsers());
        res.end();
      } else if (endPointRegExp.test(requestedEndpoint)) {
        getUser(req, res);
      } else {
        res.statusCode = 404;
        res.end('Not found. Current endpoint does not exists');
      }
      break;
    }

    case 'POST': {
      if (serverEndpoint.find((item) => item === requestedEndpoint)) {
        postUser(req, res);
      } else {
        res.statusCode = 404;
        res.end('Not found. Current endpoint does not exists');
      }
      break;
    }

    case 'DELETE': {
      if (serverEndpoint.find((item) => item === requestedEndpoint)) {
        res.statusCode = 400;
        res.end('Bad request. Need to enter user id in your endpoint');
      } else if (endPointRegExp.test(requestedEndpoint)) {
        deleteUser(req, res);
      } else {
        res.statusCode = 404;
        res.end('Not found. Current endpoint does not exists');
      }
      break;
    }

    case 'PUT': {
      if (serverEndpoint.find((item) => item === requestedEndpoint)) {
        res.statusCode = 400;
        res.end('Bad request. Need to enter user id in your endpoint');
      } else if (endPointRegExp.test(requestedEndpoint)) {
        updateUser(req, res);
      } else {
        res.statusCode = 404;
        res.end('Not found. Current endpoint does not exists');
      }
      break;
    }

    default: {
      res.statusCode = 405;
      res.end('Method not allowed');
    }
  }
});

server.listen(port);
