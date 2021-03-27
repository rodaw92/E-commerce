import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};
const isAuth = (req, res, next) => { // it is like a middleware for express
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length); // to access only token part
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode; // check if the token is correct
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) { // if the user exists and he is an admin
    return next();// means accept this request
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

export { getToken, isAuth, isAdmin };