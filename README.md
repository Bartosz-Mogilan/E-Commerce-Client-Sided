# E-Commerce App

This is a full-stack e-commerce application that demonstrates a RESTful API built with Node.js and Express, a PostgreSQL database managed via pgAdmin 4, and a React frontend. The project includes user authentication (both local and via third-party OAuth), product management, shopping cart functionality, and checkout integration with Stripe. Swagger is used to document and test the API.

## Features

- **User Authentication:**  
  - Register and login using email/password (JWT-based)  
  - Third-party authentication with Google and Facebook OAuth

- **Product Management:**  
  - Create, update, delete, and list products

- **Shopping Cart:**  
  - Add items to the cart and view current cart contents

- **Checkout & Orders:**  
  - Process payments using Stripe  
  - Create orders and view order history

- **API Documentation:**  
  - Interactive API docs via Swagger UI

## Technology Stack

- **Backend:**  
  - Node.js, Express, PostgreSQL  
  - pg (node-postgres) for database interaction  
  - pgAdmin 4 for database management  
  - Passport (for OAuth), bcrypt, JSON Web Tokens (JWT)  
  - Stripe for payment processing  
  - Swagger (swagger-jsdoc & swagger-ui-express) for API documentation

- **Frontend:**  
  - React, React Router  
  - Fetch API for HTTP requests