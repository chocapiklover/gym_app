import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required: true,
        unique: true,
        trim: true,
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
    },
    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
    ],

})


/**
 * Asynchronously compares the provided password with the user's stored hashed password.
 * @param {string} password - The password to verify.
 * @returns {Promise<boolean>} True if the password matches the stored hash, false otherwise.
 */

userSchema.methods.verifyPassword = async function (password) {
    const user = this;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
};

const User = mongoose.model('User', userSchema);

export default User