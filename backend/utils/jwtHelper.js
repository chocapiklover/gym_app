import jwt from 'jsonwebtoken';

//Generates a JWT for a given user
const generateToken = (user) => {

    // Sign a new token with user's ID and email
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '3h'
    });
};

//Verifies the validity of a given JWT.
const verifyToken = (token) => {

    //Verify the token using the same secret key used for signing
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

// Export the generateToken and verifyToken functions to be used in other parts of the application

module.exports = { generateToken, verifyToken };