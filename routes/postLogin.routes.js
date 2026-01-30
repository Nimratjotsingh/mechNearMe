const express = require('express');
const router = express.Router();
const postLogin = require('../controller/postLogin.controller');
const { isLoggedIn } = require("../middleware/auth");
const Vehicle = require('../models/vehicle')

router.get('/dashboard',isLoggedIn,postLogin.dashboard)

router.get('/profile',isLoggedIn,postLogin.profile);

router.get('/add-vehicle',isLoggedIn,(req,res)=>{
    res.render('postLogin/addVehicle.ejs',{user:req.session.user});
});




module.exports = router;