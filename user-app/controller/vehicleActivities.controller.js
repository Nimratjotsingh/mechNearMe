const Vehicle = require('../models/vehicle');
const User = require('../models/user');

exports.deleteVehicle = async (req,res)=>{
    const vehicleId = req.params.id;
    try{
        await Vehicle.findByIdAndDelete(vehicleId);
        await User.findByIdAndUpdate(req.session.user.id,{
            $pull: { vehicles: vehicleId }
        });
        res.redirect('/dashboard');
    }catch(e){
        res.send(e);
        console.log(e);
    }
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

exports.repair = async(req,res)=>{
    const vehicleId = req.params.id;
    res.send('Currently under development');
}
exports.service = async(req,res)=>{
    const vehicleId = req.params.id;
    res.send('Currently under development');
}