import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required: true,
        unique: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password:{
        type: 'string',
        required: true,
        minlength: 10,
    },
    gender:{
        type: 'string',
        required: true,
        enum: ['male', 'female'],
    },
    height: {
        type: 'number', // Consider specifying units (cm, inches) in the field name or documentation.
        required: false
    },
    age: {
        type: 'number',
        required: false
    },
    weight: {
        type: 'number', // Similarly, specify units (kg, lbs).
        required: false
    }

})

const User = mongoose.model('User', userSchema);

export default User