const Vehicle = require('../models/vehicle');
const User = require('../models/user');

exports.dashboard = async (req,res)=>{
    const vehicles = await Vehicle.find({ owner: req.session.user.id });
    res.render('postLogin/dashboard.ejs',{user:req.session.user,vehicles});
}

exports.addVehicle = async (req, res) => {
    const { vehicleNumber, vehicleType, brand, model, year, fuelType, nickname} = req.body;
    try{
        console.log(req.session.user.id)
        const vehicle = await Vehicle.create({
            owner: req.session.user.id,
            vehicleNumber,
            vehicleType,
            brand,
            model,
            year,
            fuelType,
            nickname
        });
        await User.findByIdAndUpdate(req.session.user.id,{
            $push: {vehicles: vehicle._id }
        });
        res.redirect('/dashboard');
        }catch(e){
            res.send(e);
            console.log(e);
        }

}