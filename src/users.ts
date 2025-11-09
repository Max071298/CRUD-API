import { randomUUID } from 'crypto';

import http from 'http';

interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: String[];
}

const users: IUser[] = [];

function generateUUID(): string {
  return randomUUID();
}

function checkUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

function createUser(username: string, age: number, hobbies: String[]): IUser {
  return { id: generateUUID(), username, age, hobbies };
}

export function getUsers(): string {
  return JSON.stringify(users);
}

export function postUser(req: http.IncomingMessage, res: http.ServerResponse): void {
  let data = '';

  req.on('data', (chunk: String): void => {
    data += chunk.toString();
  });

  req.on('end', () => {
    const userInfo = JSON.parse(data);
    if (!userInfo.username || !userInfo.age || !userInfo.hobbies) {
      res.statusCode = 400;
      res.end('Request body does not contain * required* fields');
    } else if (
      typeof userInfo.username !== 'string' ||
      typeof userInfo.age !== 'number' ||
      !Array.isArray(userInfo.hobbies)
    ) {
      res.statusCode = 400;
      res.end('Request body fields contain incorrect types of values');
    } else if (!userInfo.hobbies.every((item: any) => typeof item === 'string')) {
      res.statusCode = 400;
      res.end('Request body fields contain incorrect types of falues');
    } else {
      const user = createUser(userInfo.name, userInfo.age, userInfo.hobbies);
      users.push(user);
      res.statusCode = 201;
      res.end('User successfully created');
    }
  });
}

export function getUser(req: http.IncomingMessage, res: http.ServerResponse) {
  const userId = req.url?.split('/').at(-1);

  if (userId) {
    const userData = users.find((user) => user.id === userId);

    if (!checkUUID(userId)) {
      res.statusCode = 400;
      res.end('Invalid user id (not uuid)');
    }
    if (!userData) {
      res.statusCode = 404;
      res.end(`User with id ${userId} doesn't exist`);
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(userData));
    }
  }
}
