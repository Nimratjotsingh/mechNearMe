const Vehicle = require('../models/vehicle');
const User = require('../models/user');
const ServiceRequest = require('../models/serviceRequest');

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

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
        return res.redirect('/dashboard');
    }

    res.render('service/vehicle-request.ejs', {
        user: req.session.user,
        vehicle
    });
}
exports.service = async(req,res)=>{
    const vehicleId = req.params.id;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
        return res.redirect('/dashboard');
    }

    res.render('service/vehicle-request.ejs', {
        user: req.session.user,
        vehicle
    });
}

exports.createServiceRequest = async (req,res)=>{
    try {
        const { vehicleId, requestType, issueDescription } = req.body;

        if (!vehicleId || !requestType) {
            return res.status(400).send("Missing required fields");
        }

        await ServiceRequest.create({
            user: req.session.user.id,
            vehicle: vehicleId,
            requestType,
            issueDescription
        });

        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to create service request");
    }
}