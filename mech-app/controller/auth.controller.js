const mech = require('../models/mech');
const bcrypt = require('bcrypt');

exports.login = (req,res)=>{
    res.render('login.ejs')
}

exports.register = (req,res)=>{
    res.render('authPages/register.ejs')
}

exports.registerReq = async (req,res)=>{
    const {name,email,phone,workshopName,shopType,experience,aadhaar,area,city,state,password} = req.body;
    try{
        const isExsisting = await mech.findOne({$or:[
            {email:email},
            {phone:phone}
        ]});
        if(isExsisting){
            return res.send('Mechanic with given email or phone number already exsists');
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const mechanic = new mech({
            name,
            email,
            phone,
            workshopName,
            shopType,
            experience,
            location: `${area}, ${city}, ${state}`,
            password: hashedPassword,
            aadhaar
        });
        const savedMechanic = mechanic.save();
        req.session.user = {
            id: savedMechanic._id,
            name: savedMechanic.name,
            email: savedMechanic.email,
            phone: savedMechanic.phone
        }
        res.send('User created successfull')
    }catch(e){
        res.send(e);
        console.log(e);
    }
}

exports.loginReq = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const mechanic = await mech.findOne({email:email});
        if(!mechanic){
            return res.send('No mechanic found with given email');
        }
        const passwordCheck = await bcrypt.compare(password,mechanic.password);
        if(!passwordCheck){
            return res.send('Incorrect password');
        }
        req.session.user = {
            id: mechanic._id,
            name: mechanic.name,
            email: mechanic.email,
            phone: mechanic.phone
        }
        res.send('User logged in Successfully!');
    }catch(e){
        res.send(e);
        console.log(e)
    }
}