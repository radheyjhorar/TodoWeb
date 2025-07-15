const jwt = require('jsonwebtoken');

exports.generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign({id: userId}, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};