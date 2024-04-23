import { useState } from 'react';
import NewWorkout from '../components/NewWorkout';
import Week from '../components/Week';
import Exercise from '../components/Exercise';
import Navbar from '../components/Navbar';

function MainPage() {
  const [showNewWorkout, setShowNewWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState('')
  const [currentDay, SetCurrentDay] = useState('')

  const handleWorkoutSubmit = (name) =>
  {
    setWorkoutName(name);
    setShowNewWorkout(false);
  }

  return (
    <>
      {showNewWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md mx-auto my-auto">
            <div className="flex justify-end">
              <button 
                onClick={() => setShowNewWorkout(false)}
                className="text-black rounded-full text-sm p-1.5 mb-2 mr-2 bg-gray-200 hover:bg-gray-300">
                &times; Close
              </button>
            </div>
            <NewWorkout onWorkoutSubmit={handleWorkoutSubmit} />
          </div>
        </div>
      )}
      <h1 className='text-5xl mb-8'>Workout</h1>
      <Week onSetCurrentDay={SetCurrentDay} />
      <div id='createWorkout' className='border-2 border-black rounded-lg text-left'>
      {workoutName ? (
          <h2 className="text-lg p-2">{workoutName}</h2>
        ) : (
          <button 
            className="p-2 text-lg"
            onClick={() => setShowNewWorkout(true)}
          >+ New Workout</button>
        )}
        <Exercise />
      </div>
      <Navbar />
    </>
  );
}

export default MainPage;
