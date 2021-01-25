import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';

const Calendar = ({ stateProps, onChange, }) => {
  const [value, updateValue] = useState(new Date());
  const [endValue, updateEndValue] = useState('');
  
  useEffect(() => {
    onChange(value, endValue)
  }, [endValue, onChange, value])
  

  return (
    <div>
      <DatePicker 
        showLeadingZeros={true}
        format={"dd-MM-y"}
        onChange={updateValue}
        value={value}
      />
      {stateProps.outputTable || stateProps.adminSection ?
        <DatePicker 
        showLeadingZeros={true}
        format={"dd-MM-y"}
        onChange={updateEndValue}
        value={endValue}
       /> : null}
    </div>
  );
}

export default Calendar;