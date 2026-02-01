const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/isAuth');
const controller = require('../controller/postLogin.controller');
const authController = require('../controller/auth.controller')


router.get('/dashboard',isAuthenticated,controller.dasboard);
router.get('/logout',isAuthenticated,authController.logout);

module.exports = router