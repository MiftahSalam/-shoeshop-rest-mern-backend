import express from 'express';
import asyncHandler from 'express-async-handler';

import auth from '../middlewares/auth.js';
import Order from '../models/order.js';

const orderRoute = express.Router();

orderRoute.post(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.lenght === 0) {
      res.status(400);
      throw new Error('No items order');
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      console.log('orderRoute order created');

      res.status(201);
      res.json(createdOrder);
    }
  })
);

orderRoute.get(
  '/:id',
  auth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  })
);

orderRoute.get(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id });
    res.json(order);
  })
);

orderRoute.put(
  '/:id/pay',
  auth,
  asyncHandler(async (req, res) => {
    const order = Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updateOrder = order.save();

      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  })
);

export default orderRoute;
