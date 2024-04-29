const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        minlength: 3,
        maxlength: 50
    },
    email :{
        type : String,
        required : true,
        unique : true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password :{
        type : String,
        required :true,
        minlength: 8,
        maxlength: 128
    },
},{ timestamps: true });


const User =  mongoose.model('User',userSchema);

module.exports = User;