import expressAsyncHandler from 'express-async-handler';
import jsonWebToken from 'jsonwebtoken';
import User from '../models/user.js';

const auth = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodedToken = jsonWebToken.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      console.error('Unauthorized. Token Not found');
      res.status(401);
      throw new Error('Unauthorized. Token Not found');
    }
    console.log('token found');
  }

  if (!token) {
    res.status(401);
    throw new Error('Unauthorized. Token Not found');
  }
});

export default auth;
