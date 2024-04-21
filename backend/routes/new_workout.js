import express from 'express';
import User from '../DB/models/user.models.js';
import Workout from '../DB/models/workout.models.js';

const router = express.Router();

router.post('/api/workouts', async(req, res) => 
{
    const { userId, weekday, workoutName } = req.body;

    try
    {
        const user = await User.findById(userId);
        if(user)
        {
            const newWorkout = new Workout({ userId, weekday, workoutName });
            await newWorkout.save();
            res.status(201).json({workout: newWorkout});
        }
        else if(!user)
        {
            return res.status(404).json({error: 'User not found'});
        }
    }
    catch(error)
    {
        console.error('Error saving workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/api/workouts/:userId', async (req, res) => 
{
    const { userID } = req.params;

    try
    {
        const workouts = await Workout.find({ userId })
        res.status(200).json(workouts);
    }
    catch(error)
    {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;