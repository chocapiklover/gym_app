import express from 'express';
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

router.post('/newworkoutname', (req, res) => {
    // Extracting the workout name from the request body
    const { name } = req.body;

    // Here you might want to add logic to save the name to your database
    //model save to user dates
    //workout: name, user, date= one to many
    //save the day of week tot workout as well

    


    console.log('Received workout name:', name);

    // Sending a response back to the client
    if (name) {
        res.status(200).json({ message: 'Workout name saved successfully!', name });
    } else {
        res.status(400).json({ message: 'Workout name is required!' });
    }
});

export default router;
