const mongoose = require('mongoose');

const mech = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required : true,
        unique: true
    },
    workshopName: {
        type: String,
        required: true
    },
    shopType: {
        type: String,
        required: true,
        enum: ['car','bike','both']
    },
    experience: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    aadhaar: {
        type: String,
        required: true,
        unique: true,
    },
    history:{
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Mechanic',mech);