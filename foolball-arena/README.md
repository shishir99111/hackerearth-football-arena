# Gyanmatrix - Footballers Arena Backend
> A pseudo Full Stack web app for Footballers Arena, Which lists all the best footballers.

# TechStack Requirement:
> Backend: Express, NodeJS v8.x.x
> Db: Mysql
> Frontend: Angular
** Make sure to have Node version minimum 8.x.x.

### Setup codebase
- Create Mysql Database named football_arena and run script 'footballers2655c10.sql' (same script provided in the test)
- npm install
- npm install --save-dev eslint-config-airbnb-base eslint eslint-plugin-import
- create .env with below mentioned contents in the project root directory.
- node index.js

> Sample .env file
```
# Development
NODE_ENV=test
PORT=5510

### Mysql Configuration ######
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLMAXCONNECTION=10
MYSQLDATABASE=footballers_arena
MYSQLPASSWORD=<Your Password>
```