const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/auth');
const { authenticate } = require('../middlewares/auth');

router.use(express.json());

// All http://localhost:3000/api/auth/login
// All http://localhost:3000/api/auth/register

router.post('/login', authenticate, loginUser);
// router.post('/register', );

module.exports = router;
