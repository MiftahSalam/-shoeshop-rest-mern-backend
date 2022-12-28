import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import auth from '../middlewares/auth.js';
import User from '../models/user.js';
import { generateToken } from '../utils/jwt.js';

const userRouter = express.Router();

userRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const findUser = await User.findOne({ email });

    console.log('user-register req email', email);
    if (findUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  })
);

userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    console.log('user-login: ', req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  })
);

userRouter.get(
  '/profile',
  auth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  })
);

userRouter.put(
  '/profile',
  auth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
    }

    const updatedUser = await user.save();
    if (user) {
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  })
);
export default userRouter;
