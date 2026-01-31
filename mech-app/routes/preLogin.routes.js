const express = require('express');
const router = express.Router();
const controller = require('../controller/preLogin.controller')


router.get('/',controller.home)

module.exports = router;