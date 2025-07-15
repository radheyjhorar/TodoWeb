const express = require('express');
const { registerUser, loginUser, refresh } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refresh);

module.exports = router;