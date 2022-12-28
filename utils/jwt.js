import jsonWebToken from 'jsonwebtoken';

export const generateToken = (id) => {
  return jsonWebToken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};
