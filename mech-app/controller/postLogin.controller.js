exports.dasboard = (req,res)=>{
    res.render('dashboard.ejs',{mechanic:req.session.user});
}