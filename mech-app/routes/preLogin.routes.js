const express = require('express');
const router = express.Router();
const controller = require('../controller/preLogin.controller');
const authController = require('../controller/auth.controller');

router.get('/',controller.home);
router.get('/login',authController.login);
router.get('/register',authController.register);

//post request
router.post('/register',authController.registerReq);
router.post('/login',authController.loginReq);
module.exports = router;