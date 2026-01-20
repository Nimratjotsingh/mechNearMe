const express = require('express');
const router = express.Router();
const auth = require('../controller/auth.controller');

router.get('/login',auth.loginPage);

module.exports = router;