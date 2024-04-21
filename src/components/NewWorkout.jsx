import React, { useState } from "react";
function NewWorkout({ onWorkoutSubmit, currentDay }) {
    const [workoutName, setWorkoutName] = useState('');
    
    const handleSubmit = async(event) =>
    {
        event.preventDefault();
        const response = await fetch('https://localhost:5000/api/workouts', //here we need the backend
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: workoutName, weekday:currentDay})
        });
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
                        onChange={e => setWorkoutName(e.target.value)}                        placeholder="Enter workout name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default NewWorkout;