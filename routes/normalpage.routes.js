const express = require('express');
const router = express.Router();
const normalpage = require('../controller/normalpage.controller');

router.get('/', normalpage.homepage);

module.exports = router;