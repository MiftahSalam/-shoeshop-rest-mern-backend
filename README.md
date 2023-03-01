# Simple Shoe Shop

A small and simple online shoe shop service developed with Express and MongoDB ([check also Go+Graphql version](https://github.com/MiftahSalam/shoeshop-go-backend)).

Developed based on [this](https://www.youtube.com/watch?v=1NWBO8L81J8&list=PLE_Uj9ql8q9_MVzY0bMQPERz4Yulo3We4&index=1) youtube tutorial video

# Feature

- Product browsing and searching
- Review product (rating, comment)
- Cart product
- Order product
- Order payment (paypal)
- Order shipping
- User management (Register, Login, Profile)
- Authentication (JWT)
- Pagination

# Demo

Not available yet

# Stacks

- Nodejs (Express)
- MongoDB
- ORM (Mongoose)
- jsonwebtoken
- dotenv
  <br /><br />

# Getting started

## Install Nodejs

https://nodejs.org/en/download/
<br /><br />

## Clone/download project <br /><br />

## Install Dependencies

From the project root, run (using npm):

```
npm install --save
```

## Run Project

From the project root, run (using npm):

```
npm start
```

## Application Environment Config

- Make sure you have mongodb cluster ready ([create here(https://www.mongodb.com/cloud/atlas/register)])
- create .env file in projectroot
- create and fill this env var in .env file

```
PORT =
NODE_ENV =

MONGO_URL =

JWT_SECRET=

PAYPAL_CLIENT_ID=
```

## Testing

Not available yet

## Todo

- Create testing
- Admin API
