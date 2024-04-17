import '../App.css';
import React, { useState } from 'react';
import NewWorkout from '../components/NewWorkout';
import Week from '../components/Week';
import Exercise from '../components/Exercise';

function MainPage() {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(true); // This controls the visibility of the button

  const addWorkout = (name) => {
    setWorkouts(prevWorkouts => [...prevWorkouts, { name }]);
    setShowModal(false); // Hide form after adding a workout
    setShowButton(false); // Keep the button hidden after adding a workout
  }

  return (
    <>
      <h1 className='text-5xl mb-8'>Workout</h1>
      <Week />
      {showButton && (
        <button 
          onClick={() => setShowModal(true)}
          className='p-2 text-lg border-2 border-black rounded-lg'>
          + New Workout
        </button>
      )}
      {showModal && (
        <NewWorkout 
          addWorkout={addWorkout} 
          onClose={() => setShowModal(false)}
        />
      )}

      <div id='createWorkout' className='border-2 border-black rounded-lg text-left p-4'>
        <h2 className="text-4xl text-center font-bold">
          {workouts.length > 0 ? workouts[workouts.length - 1].name : "No Workouts Added"}
        </h2>
      </div>
    </>
  );
}

export default MainPage;
