exports.homepage = (req, res) => {
    res.render('home.ejs');
}

exports.howItWorks= (req,res)=>{
    res.render('howitworks.ejs');
}
exports.aboutPage = (req, res) => {
    res.render('about.ejs');
}