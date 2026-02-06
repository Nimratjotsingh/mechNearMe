const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/isAuth');
const controller = require('../controller/postLogin.controller');
const authController = require('../controller/auth.controller')


router.get('/dashboard',isAuthenticated,controller.dashboard);
router.get('/logout',isAuthenticated,authController.logout);
router.get('/jobs/history', isAuthenticated, controller.history);
router.get('/jobs/:id', isAuthenticated, controller.viewJob);



router.post('/jobs/accept/:id', isAuthenticated, controller.acceptJob);
router.post('/jobs/reject/:id', isAuthenticated, controller.rejectJob);

module.exports = router