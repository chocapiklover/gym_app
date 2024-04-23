import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../DB/models/user.models.js'
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtHelper.js'
import dotenv from 'dotenv';

//STILL IN DEVELOPMENT

dotenv.config({ path: '../../.env' });


// Function to handle user registration
async function register(req, res) {
    console.log('signup') // REMOVE FOR PRODUCTION
    try {
        const { username, password, confirmPassword, email, gender, weight, height, age } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        //if username exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists." });
        }
        
        //generates a secure password for the user for backend
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        const user = new User({
            username,
            password: hashedPassword,
            email,
            gender,
            weight,
            height,
            age,
            tokens: [] // Initialize the tokens array
        });

        const token = generateToken(user._id); // Generate token
        user.tokens.push({ token }); // Add token to the tokens array

        await user.save(); // Save the user with the token

        res.status(201).json({
            _id: user._id,
            username: user.username,
            weight: user.weight,
            height: user.height,
            age: user.age,
            token // Optionally send the token in response if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function login(req, res) {
    console.log("loginUser")
    
    try {
        const { username, password } = req.body;
        console.log(username, password)
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');
        console.log('password', password, 'backendpassword',  user?.password )
        console.log(user, isPasswordCorrect)

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "invalid credentials" });
        }
       
        console.log('JWT_SECRET:', process.env.JWT_SECRET_KEY);

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);

        //send token and user info to the client
        res.send({ token, user: { username: user.username, id: user.id } });

        
    } catch (error) {
        console.log("error in login controller ",error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function logout (req, res) {
    console.log("logout")

    try {
        // Overwrite the token cookie with an expired token or empty value
        res.cookie('token', '', { expires: new Date(0) });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const router = express.Router();

// Authentication endpoint
router.post('/register', register);
router.post('/loginuser', login);
router.post('/logoutuser', logout);

export default router;