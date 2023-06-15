# Project

Nest JS api with mongo DB crud

## Specifications

A new company needs to address these requirements:

- Create a Node API with Typescript.
- Connect the Node API to MongoDB using mongoose (desirable models in typescript).
- We need to develop three endpoints behind a basic authentication (username and password).
- Create a user with name, last name, address, and profile picture (this should be a file).
- Retrieve users.
- Update user.
- Star point: Dockerize MongoDB and the Node API, solved with Nest.js

## Instructions

1 -  Create an .env file with 2 variables

``` text
BASIC_USERNAME=INSERT_YOUR_USER
BASIC_PASSWORD=INSERT_YOUR_PASSWORD
```

2 - Run command the next in the console (make sure you have installed docker and docker compose)

``` bash
compose-up --build
```

3 - Endpoints and documentation is available at: <http://localhost:3000/docs>
