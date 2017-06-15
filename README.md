# Doqman Document Management System
[![Build Status](https://travis-ci.org/andela-oakinwa/document-management-system.svg?branch=master)](https://travis-ci.org/andela-oakinwa/document-management-system)
[![codecov](https://codecov.io/gh/andela-oakinwa/document-management-system/branch/master/graph/badge.svg)](https://codecov.io/gh/andela-oakinwa/document-management-system)
[![Coverage Status](https://coveralls.io/repos/github/andela-oakinwa/document-management-system/badge.svg?branch=staging)](https://coveralls.io/github/andela-oakinwa/document-management-system?branch=staging)

## About doqMan
- A simple Document Management System complete with roles and privileges. Each document defines access rights and the document defines which roles can access it.

### Features/Functionalities
#### Privileges
- Admin
  Supercedes all other users. Manages all data and account. An admin have the privilege to update a user information. This is important in case of a forgotten password and to increase/decrease privilege of a user.
- Regular
  These are registered users with read write access. A regular user has a profile page, and a dashboard to manage their documents.
  These documents can be edited and deleted by the regular user.

### Installation
#### Running Locally
 - Clone the repo `https://github.com/andela-oakinwa/document-management-system.git`
 - Change to the root folder 
 - Start app:
 ```
  npm start
 ```

#### Testing
##### Server
  - Unit Test:
    ```
     npm run test:server
    ```
##### Client
  - End to end test:
    ```
      npm run test:e2e
    ```
##### Full test
  ```
     npm run test
  ```

## Technology Stack
- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [MaterializeCSS](http://materializecss.com/)
- [NodeJS](https://nodejs.org/en/)
- [JWT](https://jwt.io/)
- [Postgresql](https://www.postgresql.org/)
- [Sequelize ORM](http://docs.sequelizejs.com/)

## API Documentation
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

### API Link
[API Documentation](https://dms-doqman.herokuapp.com/api)

### Features

The following features make up the doqMan Document Management System API:

#### Authentication

- It uses JSON Web Token (JWT) for authentication
- It generates a token on successful login or account creation and returns it to the user
- It verifies the token to ensure a user is authenticated to access every endpoints

#### Users

- It allows users to create account
- It allows users to login and obtain a unique token
- It allows authenticated users to retrieve and update their information
- It allows the admin to manage users

#### Roles

- It ensures roles can be created by an admin user
- A non-admin cannot access this endpoint
- A non-admin user cannot create, retrieve, modify, or delete roles  
- It allows assignment of roles to users

#### Documents

- It allows authenticated users to create document
- It ensures all documents are accessible based on the permission/priviledges
- It allows admin users to create, retrieve, modify, and delete documents
- It ensures users can retrieve, edit and delete documents that they own  
- It allows users to retrieve all documents they own as well as public documents
- It allows users to retrieve all public documents
- It allows users on the same role to retrieve role-based documents

#### Search

- It allows admin to retrieve all documents that matches search term
- It allows admin to search users based on a specified search term
- It allows users to search public documents for a specified search term
- It allows users to search for users through name or email address
- It allows users on the same role to search through role-based documents

## Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/37ef46b88cd1286341d4)

## Limitations:
The limitations to the Document Management System API are as follows:

* Users can only create textual documents and retrieve same when needed.
* Users cannot share documents with people, but can make document `public` to make it available to other users.
* Spreadsheet is not supported
* Other file formats not supported

### Contributing
Contributors are welcome to further enhance the features of this API by contributing to its development.

## Author
- _Oluwafemi Akinwa_
