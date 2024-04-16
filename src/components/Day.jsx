function Day({ day, isToday })  
{
    const baseStyle = "h-12 w-12 flex items-center justify-center rounded-full text-sm font-semibold";
    const todayStyle = "bg-red-500 text-white";
    const notTodayStyle = "bg-gray-200 text-gray-800";
  
    return (
      <div className={`${baseStyle} ${isToday ? todayStyle : notTodayStyle}`}> {/* isToday true -> todayStyle else notTodayStyle */}
        {day}
      </div>
    );
  }
  

  export default Day;