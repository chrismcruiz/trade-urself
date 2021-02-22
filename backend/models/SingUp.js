const mongoose = require('mongoose')

const signUpTemplate =  new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    birthday:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    career:{
        type: String,
        required: true
    },
    photo:{
        type: String
    },
    password:{
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    Date:{
        type: Date,
        default: Date.now
    }
})

const users =  mongoose.model('users', signUpTemplate)

module.exports = users