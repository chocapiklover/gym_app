import React, { useState } from "react";
import { useAuthContext } from '../context/AuthContext.jsx';
function NewWorkout({ onWorkoutSubmit, currentDay }) {
    const [workoutName, setWorkoutName] = useState('');
    const { authUser } = useAuthContext();
    
    const handleSubmit = async(event) =>
    {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/workouts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workoutName, weekday:currentDay, userId: authUser.user.id})
        });
        console.log(workoutName, currentDay, authUser.user.userid);
        if (response.ok)
        {
            onWorkoutSubmit(workoutName);
            console.log('Workout Name saved to backend!')
        }
        else 
        {
            console.log('Did not work :(')
        }
    }
    return (
        <div className="flex justify-center items-center">
            <form className="bg-white p-6 rounded shadow-lg">
                <div className="mb-4">
                    <label htmlFor="workoutName" className="block text-gray-700 text-sm font-bold mb-2">
                        Workout Name:
                    </label>
                    <input
                        type="text"
                        id="workoutName"
                        name="workoutName"
                        value={workoutName}
                        onChange={e => setWorkoutName(e.target.value)}                       
                        placeholder="Enter workout name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default NewWorkout;