const express = require('express');
const router = express.Router();
const normalpage = require('../controller/normalpage.controller');

router.get('/', normalpage.homepage);
router.get('/howitworks', normalpage.howItWorks);

module.exports = router;