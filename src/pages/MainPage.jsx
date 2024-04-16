import '../App.css';
import Week from '../components/Week';
import Workout from '../components/Workout';
function MainPage() 
{
  return (
    <>
      <h1 className='text-5xl mb-8'>Workout</h1>
      <Week />
      <div id='createWorkout' className='border-2 border-black rounded-lg text-left'>
        <button className='p-2 text-lg'>+ New Workout</button>
        <Workout />
      </div>
    </>
  );
}


export default MainPage;
