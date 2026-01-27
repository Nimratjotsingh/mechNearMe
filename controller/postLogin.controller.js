const Vehicle = require('../models/vehicle');
const User = require('../models/user');

exports.addVehicle = async (req, res) => {
    const { vehicleNumber, vehicleType, brand, model, year, fuelType, nickname} = req.body;
    try{
        const vehicle = await Vehicle.create({
            owner: req.session.id,
            vehicleNumber,
            vehicleType,
            brand,
            model,
            year,
            fuelType,
            nickname
        });
        await User.findByIdAndUpdate(req.user.id,{
            $push: {vehicles: vehicle._id }
        })
        }catch(e){
            res.send(e);
            console.log(e);
        }

}