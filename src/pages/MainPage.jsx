import '../App.css';
import Week from '../components/Week';
import Exercise from '../components/Exercise';
function MainPage() 
{
  return (
    <>
      <h1 className='text-5xl mb-8'>Workout</h1>
      <Week />
      <div id='createWorkout' className='border-2 border-black rounded-lg text-left'>
        <button className='p-2 text-lg'>+ New Workout</button>
        <Exercise />
      </div>
    </>
  );
}


export default MainPage;
