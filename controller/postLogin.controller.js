const Vehicle = require('../models/vehicle');
const User = require('../models/user');

exports.dashboard = async (req,res)=>{
    const vehicles = await Vehicle.find({ owner: req.session.user.id });
    res.render('postLogin/dashboard.ejs',{user:req.session.user,vehicles});
}

exports.profile = async (req,res)=>{
    const vehicles = await Vehicle.find({ owner: req.session.user.id });
    res.render('postLogin/profile.ejs',{user:req.session.user,vehicles})
}