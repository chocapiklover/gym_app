import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../DB/models/user.models.js'
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtHelper.js'



//STILL IN DEVELOPMENT

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
            weight,
            gender,
            height,
            age,
        });

        if (user) {
            //Generate JWT here
            generateToken(user._id, res);

            await user.save();

            res.status(201).json({
                _id: user._id,
                username: user.username,
                weight: user.weight,
                height: user.height,
                age: user.age,
            })
        } 
        else {
            res.status(400).json({error: 'Invalid user data'})
        }
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function login(req, res) {
    console.log("loginUser")
    
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.send({ token });
        
    } catch (error) {
        console.log("error in signup controller ",error.message);
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