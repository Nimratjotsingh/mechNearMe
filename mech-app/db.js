const mongoose = require('mongoose');

const connectDB = mongoose.connect('mongodb://127.0.0.1:27017/mechNearMe')
.then(()=>{
    console.log('DB has been connected successfully');
}).catch((e)=>{
    console.log('DB connection failed', e);
});

module.exports = connectDB;