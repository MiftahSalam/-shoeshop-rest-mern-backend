import express from 'express';
import dotenv from 'dotenv';

import connectDatabase from './config/mongo.js';
import seedAPI from './seed_api.js';
import productRouter from './routers/product.js';
import { notFound, errorHandler } from './middlewares/error_handler.js';
import userRouter from './routers/user.js';
import orderRoute from './routers/order.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/seed', seedAPI);
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(notFound);
app.use(errorHandler);

connectDatabase()
  .then(() => {
    app.listen(port, console.log(`server running on ${port}...`));
  })
  .catch((error) => {
    console.error('connect mongo error: ', error);
    process.exit(1);
  });
