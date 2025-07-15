// const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');

const refreshTokens = [];

// const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return (
        res.status(400)
          .json({ message: 'An account with that email already exists. Please try a different email or log in.' })
      )
    };
    const user = await User.create({ name, email, password });
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    refreshTokens.push(refreshToken);
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      // token: generateToken(user._id),
      accessToken, refreshToken,
      message: "User registered successfully!"
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.refresh = (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) {
    return res.status(403).json({ message: 'Refresh token not valid!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = generateAccessToken(decoded.id);
    return res.json({ accessToken: newAccessToken });
  } catch {
    return res.status(403).json({ message: 'Token expired!' });
  }
}


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    refreshTokens.push(refreshToken);
    if (user && (await user.matchPassword(password))) {
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken, refreshToken,
        message: "Login successful!"
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials. Please check your email and password.' });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error. Please try again later." })
  }
};