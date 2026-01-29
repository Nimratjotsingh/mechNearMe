const express = require('express');
const router = express.Router();
const postLogin = require('../controller/postLogin.controller');
const { isLoggedIn } = require("../middleware/auth");
const Vehicle = require('../models/vehicle')

router.get('/dashboard',isLoggedIn,postLogin.dashboard)

router.get('/profile',isLoggedIn,async (req,res)=>{
    const vehicles = await Vehicle.find({ owner: req.session.user.id });
    res.render('postLogin/profile.ejs',{user:req.session.user,vehicles});
});

router.get('/add-vehicle',isLoggedIn,(req,res)=>{
    res.render('postLogin/addVehicle.ejs',{user:req.session.user});
});

router.post('/add-vehicle',isLoggedIn, postLogin.addVehicle )


module.exports = router;