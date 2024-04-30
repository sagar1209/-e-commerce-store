const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Username is required.'],
        unique : [true, 'Username must be unique.'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        maxlength: [50, 'Username cannot exceed 50 characters.']
    },
    email :{
        type : String,
        required : [true, 'Email is required.'],
        unique : [true, 'Email must be unique.'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password :{
        type : String,
        required : [true, 'Password is required.'],
        minlength: [8, 'Password must be at least 8 characters long.'],
        maxlength: [128, 'Password cannot exceed 128 characters.']
    },
},{ timestamps: true })


const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;