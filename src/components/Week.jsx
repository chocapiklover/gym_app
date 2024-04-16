import Day from './Day';
function Week() 
{
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'short' });//using Date objext to get current date in short

  return (
    <div className="flex justify-center space-x-2 mb-8">
      {daysOfWeek.map(day => (
        <Day key={day} day={day} isToday={currentDay.startsWith(day)} /> //giving day and isToday as a prop
      ))}
    </div>
  );
}

export default Week;