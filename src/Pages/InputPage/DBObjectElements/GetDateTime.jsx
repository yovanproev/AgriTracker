export const getDateAndTime = () => {
 const currentDate = new Date()
 const currentDay = currentDate.getDate()
 const currentMonth = currentDate.getMonth()+1
 const currentYear = currentDate.getFullYear()
 const currentHour = currentDate.getHours()
  const currentMinutes = currentDate.getMinutes()
   return addZero(currentDay) + "-" + addZero(currentMonth) + "-" + currentYear + " " + addZero(currentHour) + ":" + addZero(currentMinutes)
}

export function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
