import express from 'express';
import asyncHandler from 'express-async-handler';

import products from './data/Products.js';
import users from './data/Users.js';
import Product from './models/product.js';
import User from './models/user.js';

const seedAPI = express.Router();

seedAPI.post(
  '/user',
  asyncHandler(async (req, res) => {
    await User.deleteMany({});
    const userSeed = await User.insertMany(users);

    res.send({ userSeed });
  })
);

seedAPI.post(
  '/product',
  asyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const productSeed = await Product.insertMany(products);

    res.send({ productSeed });
  })
);

export default seedAPI;
