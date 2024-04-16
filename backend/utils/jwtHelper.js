import jwt from 'jsonwebtoken';

//Generates a JWT for a given user
export const generateToken = (userId, res) => {

    //assiging the user with a token
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: '3h'
    })
    
    res.cookie("jwt", token, {
        maxAge: 3 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true 
    });
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
