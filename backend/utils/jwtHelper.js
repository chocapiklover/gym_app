import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });


//Generates a JWT for a given user
export const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '3h'
    });
    return token;
};

//Verifies the validity of a given JWT.
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        // handle error appropriately
        console.error("Token verification failed:", error);
        return null;
    }
};
