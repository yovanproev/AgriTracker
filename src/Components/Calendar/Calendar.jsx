import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

const Calendar = ({ onClick}) => {
  const [value, onChange] = useState(new Date());
    
  return (
    <div>
      <DatePicker 
      format={"dd-MM-y"}
        onChange={onChange}
        onClick={() => onClick(value)}
        value={value}
        />
    </div>
  );
}

export default Calendar;