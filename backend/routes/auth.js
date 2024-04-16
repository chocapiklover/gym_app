import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../DB/models/user.models.js'
import bcrypt from 'bcrypt';

const router = express.Router();

//STILL IN DEVELOPMENT

// Function to handle user registration
async function register(req, res) {
    console.log('signup') // REMOVE FOR PRODUCTION
    try {
        const { username, password, confirmPassword, email, gender, weight, height, age } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        
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
            height,
            age,
        });
  
        const savedUser = await user.save();
        res.json({
            message: "User registered successfully",
            userId: savedUser._id,
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

// Authentication endpoint
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;