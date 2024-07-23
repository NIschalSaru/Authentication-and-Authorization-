const mongoose = require('mongoose');


// Define the User schema

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    designation: { 
        type: String,
        enum: ['Chef', 'Teacher', 'Driver', 'Developer'],
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    address: {
        type: String
     },
    salary: { 
        type: Number,
        required: true 
    },
});

//Create User model\
const User = mongoose.model('User', userSchema);
module.exports = User;