# Installation and running server


###### 1. clone repo
`git clone https://github.com/Max071298/CRUD-API.git`
###### 2. Install all dependencies
npm install
###### 3.In root folder create file .env and add port parameter.
PORT=4000
###### 4.To activate development mode write command
npm run start:dev
###### 5.To activate production mode write command
npm run start:prod

# Methods

1.Get users
method: get
address: 127.0.0.1:4000/api/users
2.Get user
method: get
address: 127.0.0.1:4000/api/users/{userID}
3.Add user
method: post
address: 127.0.0.1:4000/api/users
body: {
    "username": "Test name",
    "age": 20,
    "hobbies": ["books", "films", "football"]
}
4. Update user information
method: put
address: 127.0.0.1:4000/api/users/{userID}
body: {
    "username": "New test name",
    "age": 23,
    "hobbies": ["flights"]
}
5.remove user
method: delete
address: 127.0.0.1:4000/api/users/{userID}

Note: my server works only with JSON-formatted data.