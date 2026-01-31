exports.login = (req,res)=>{
    res.render('login.ejs')
}

exports.register = (req,res)=>{
    res.render('authPages/register.ejs')
}