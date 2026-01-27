const express = require('express');
const router = express.Router();
const auth = require('../controller/auth.controller');

router.get('/login',auth.loginPage);
router.get('/register',auth.signupPage)

router.post('/register',auth.registerUser);
router.post('/login',auth.loginUser);

module.exports = router;