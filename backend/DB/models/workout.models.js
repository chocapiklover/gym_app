import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referenziert das Benutzer-Modell
        required: true,
    },
    weekday: {
        type: String,
        required: true, // Der Wochentag, für den das Workout gespeichert wird
    },
    workoutName: {
        type: String,
        required: true, // Name des Workouts
    },
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
