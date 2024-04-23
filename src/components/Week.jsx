import Day from './Day'
import React, {useEffect} from 'react'
function Week({ onSetCurrentDay }) 
{
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const currentDay = new Date().toLocaleDateString('en-UK', { weekday: 'short' });//using Date object to get current date in short

  useEffect(() => {
    if (typeof onSetCurrentDay === 'function') {
      onSetCurrentDay(currentDay);
    }
  }, [currentDay, onSetCurrentDay]);
  
  return (
    <div className="flex justify-center space-x-2 mb-8">
      {daysOfWeek.map(day => (
        <Day key={day} day={day} isToday={currentDay.startsWith(day)} /> //giving day and isToday as a prop
      ))}
    </div>
  );
}

export default Week;