# students-graphql
Web Application that allows you to filter students by the first name or last name, and see their classes and grades.
## Tech
### Server
- Docker
- Prisma
- MYSQL
- Graphql-yoga
- Nodemon
### Client
- Angular 8
- Bootstrap CSS
- Apollo Client
## Requirements
- Docker and docker-compose
- Node >= 12.0

## How to Install
### Server

1. Go to the server folder, launch Prisma and the connected dabase
    ```
    $ cd server
    $ docker-componse up -d
    ```
2. Install, deploy, populate the database and run server
    ```
    $ npm install
    $ npm run deploy
    $ npm run start
    ```
3. Explore the data in the server
 ```
    http://localhost:4466/_admin
    http://localhost:4466/graphql
```
4. Explore the endpoint that the client side can reach
```
    http://localhost:4000/
```
### Client
1. Go to the client folder, install the dependecies
```
$ cd client
$ npm install
```
2. Run the client application
```
$ npm start
```
