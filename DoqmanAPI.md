FORMAT: 1A
HOST: https://doqman.herokuapp.com/

# Doqman
Provides services for the Doqman Document Management System

# Group Users
Resources related to users account access

## User Login [/users/login]

### Logs A User In [POST]

+ Response 202 (application/json)
    {

    }

## User Logout [/users/logout]

### Logs A User Out [POST]

+ Response 200 (application/json)
    {

    }

## Create User [/users/]

### Creates a New User [POST]

+ Response 201 (application/json)
    {

    }

## Instances of User [/users/]

### Find Matching Instances of User [GET]

+ Response 200 
    {

    }

## Users Pagination [/users/?limit={integer}&offset={integer}]

### Pagination For Users [GET]

+ Response 200
    {

    }

## Find User [/users/{user_id}]

### Finds A User With The Specified ID [GET]

+ Response 200 (application/json)
    {

    }

## Update User [/users/{user_id}]

### Updates A User's Attributes [PUT]

+ Response 200 (application/json)
    {

    }

## Delete User [/users/{user_id}]

### Deletes A User [DELETE]

+ Response 200 
    {

    }

# Group Documents
Resources related to documents attached to users accounts

## Create Document [/documents/]

### Creates A New Document Instance [POST]

+ Response 200 
    {

    }

## Get Document [/documents/]

### Find Matching Instances Of Document [GET]

+ Response 200 
    {

    }

## Document Pagination [/documents/?limit={integer}&offset={integer}]

### Pagination For Document List [GET]

+ Response 200 
    {

    }

## Find Document [/documents/{document_id}]

### Finds A Document [GET]

+ Response 200
    {

    }

## Update Document Attributes [/documents/{document_id}]

### Updates A Document's Attribute [PUT]

+ Response 200 
    {

    }

## Delete Document [/documents/{document_id}]

### Deletes A Document [DELETE]

+ Response 200

## Find All Documents For User [/users/{user_id}/documents]

### Find All Documents Belonging To A User [GET]

+ Response 200 (application/json)
    {

    }

# Group Search

## Search For A User [/search/users/?q={username}]

### Search For A User [GET]

+ Response 200 (application/json)
    {

    }

## Search For A Document [/search/documents/?q={doctitle}]

### Search For A Document [GET]




