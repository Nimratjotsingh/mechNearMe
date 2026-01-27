const express = require('express');
const router = express.Router();
const postLogin = require('../controller/postLogin.controller');
const { isLoggedIn } = require("../middleware/auth");

router.get('/dashboard',isLoggedIn,(req,res)=>{
    res.render('postLogin/dashboard.ejs',{user:req.session.user});
})

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('postLogin/profile.ejs',{user:req.session.user});
});

router.get('/add-vehicle',isLoggedIn,(req,res)=>{
    res.render('postLogin/addVehicle.ejs',{user:req.session.user});
});

router.post('/add-vehicle',isLoggedIn, postLogin.addVehicle )


module.exports = router;