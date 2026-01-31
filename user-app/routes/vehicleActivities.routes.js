const express = require('express');
const router = express.Router();
const controller = require('../controller/vehicleActivities.controller')

const { isLoggedIn } = require("../middleware/auth");



router.post('/add-vehicle',isLoggedIn, controller.addVehicle );

router.get('/delete/:id',isLoggedIn,controller.deleteVehicle);
router.get('/repair/:id',isLoggedIn,controller.repair)
router.get('/service/:id',isLoggedIn,controller.service)
module.exports = router;