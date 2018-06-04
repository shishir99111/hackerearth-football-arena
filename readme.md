# Gyanmatrix - Footballers Arena Frontend
> A pseudo Full Stack web app for Footballers Arena, Which lists all the best footballers.

# TechStack Requirement:
> Backend: Express, NodeJS v8.x.x
> Db: Mysql
> Frontend: Angular
** Make sure to have Node version minimum 8.x.x.


## Requirements

- Nodejs ^v8.x.x

### Setup codebase
- npm install
* cd /public && bower install
- create .env with below mentioned contents in the project root directory
- node index.js

> Sample .env file
```
# Development
NODE_ENV=development
SERVED_RESOURCE_PATH=/public
API_BASE_URL=http://127.0.0.1:5510
```



------------------------------------------------ XXXXXX ------------------------------------------------




# Gyanmatrix - Footballers Arena Backend
> A pseudo Full Stack web app for Footballers Arena, Which lists all the best footballers.

# TechStack Requirement:
> Backend: Express, NodeJS v8.x.x
> Db: Mysql
> Frontend: Angular
** Make sure to have Node version minimum 8.x.x.

### Setup codebase
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


------------------------------------------------ XXXXXX ------------------------------------------------


### API Postman Collection and Environments

> Go through https://www.getpostman.com/docs/v6/ for postman up and running.

> Import Collection "Footballers Arena.postman_collection.json".

> Import and use Environment "Footballers Arena Development Env.postman_environment.json".

> There are two different routes configured which you can access directly
	- {{host}}:{{port}}/api/v1/footballers?limit=10	(For getting paginated records of footballer)
	- {{host}}:{{port}}/api/v1/footballer/Cristiano Ronaldo (For getting full info of footballer)



------------------------------------------------ XXXXXX ------------------------------------------------

### Database Script

> Create Database named "football_area".
	# mysql -u root -p
	# Enter password:
	# CREATE DATABASE football_area;
	# use football_area

> Run the script "footballers2655c10.sql" (same script as provided with the question) in th database.
	# source footballers2655c10.sql

> Database is all set.


------------------------------------------------ XXXXXX ------------------------------------------------