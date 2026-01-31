const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
    if(req.session.user){
        return res.redirect('/dashboard');
    }
    res.render('preLogin/login.ejs');
}
exports.signupPage = (req,res)=>{
    if(req.session.user){
        return res.redirect('/dashboard');
    }
    res.render('preLogin/register.ejs');
}

exports.registerUser = async (req,res)=>{
    try{
        const {name, email, password, phone} = req.body;
        const exsistingUser = await User.findOne({email});
        if(exsistingUser){
            return res.status(400).send("User with this email already exsists");
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });
        const savedUSer = await user.save();
        req.session.user = {
            id : savedUSer._id,
            name: savedUSer.name,
            email: savedUSer.email,
            phone: savedUSer.phone
        }
        res.render('postLogin/welcome.ejs',{user:req.session.user});
    }catch(err){
        console.error("Error registering user:", err);
        res.status(500).send("Internal Server Error");
    }
}

exports.loginUser = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send("Invalid email or password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).send("Invalid email or password");
        }
        req.session.user ={
            id : user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        }
        res.redirect("/dashboard");
    }catch(err){
        console.error("Error logging in user:", err);
        res.status(500).send("Internal Server Error");
    }
}

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};