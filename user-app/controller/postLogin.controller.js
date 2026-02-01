const Vehicle = require('../models/vehicle');
const User = require('../models/user');
const ServiceRequest = require('../models/serviceRequest');

exports.dashboard = async (req,res)=>{
    const vehicles = await Vehicle.find({ owner: req.session.user.id });
    res.render('postLogin/dashboard.ejs',{user:req.session.user,vehicles});
}

exports.profile = async (req,res)=>{
    const vehicles = await Vehicle.find({ owner: req.session.user.id });
    res.render('postLogin/profile.ejs',{user:req.session.user,vehicles})
}

exports.service = async (req,res)=>{
    const vehicles = await Vehicle.find({ owner: req.session.user.id });
    res.render('service/request.ejs',{vehicles});
}

exports.requestHistory = async (req, res) => {
    try {
        const requests = await ServiceRequest.find({
            user: req.session.user.id
        })
        .populate('vehicle')
        .sort({ createdAt: -1 });

        res.render('service/history.ejs', {
            user: req.session.user,
            requests
        });

    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
};