# P6-Full-Stack-reseau-dev

## Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Libraris

The app uses components & theming from Angular Material and css styles provided by Bootstrap 5.

In addition, @auth0/angular-jwt is used to implement authentication via Json Web Token.

## Back

This project is based on Spring Boot and uses almost exclusively libraries from the Spring ecosystem like Spring Data JPA, Spring Web MVC & Spring Security.
In addition, com.auth0.java-jwt is used to implement authentication via Json Web Token.

### Run the app

From the root directory, execute the command : 
```
mvn spring-boot:run
```