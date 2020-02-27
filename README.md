# RideshareFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21. 
Click here for [Documentation with Compodoc](http://rideshare-frontend-compodoc.s3-website-us-east-1.amazonaws.com/) on the frontend.
Click here for [Documentation with JavaDoc](http://user-service-javadoc.s3-website-us-east-1.amazonaws.com/) on the backend.


## Development server

Run `ng serve` for a dev server. Navigate to `http://http://54.174.82.153:4200/`. The app will automatically reload if you change any of the source files. 

## Connect with the backend

Clone the [User Service Backend](https://github.com/revaturelabs/rideshare-user-service). Set the env variables `${pass_word}` and ```${user_name}``` and  ```${db_url}```. Database must be Postgres. Run the java program as a Spring Boot Application. It will be served on port 8080.  Once served, documentation for the api can be found here [User Service API](http://http://54.174.82.153:8080/swagger-ui.html#/).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Generate Documentation for Angular using Compodoc

Run `npm run compodoc`. The build artifacts will be stored in the `documentation/` directory. Use the `-s --port [port]` to serve the documentation locally.

## Generate Documentation for User Service using JavaDocs

Run the command `maven javadoc:javadoc`. The build artifacts will be stored in the `target/` directory.

## About Rideshare

The Rideshare application was designed/developed to connect Revature employees to drivers closest to them for carpooling purposes. As a user of the application, you can change your profile information (address,city,state,driver status(on/off),etc...), search for drivers based on a specified address, view top 5 drivers nearest you, and basic functionalities such as login/register. 