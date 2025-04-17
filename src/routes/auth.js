const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/auth');

router.use(express.json());

// All http://localhost:3000/api/auth/login

router.post('/login', loginUser);
// router.post('/register', );

module.exports = router;
