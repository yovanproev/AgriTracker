export const getDate = () => {
 const currentDate = new Date()
 const currentDay = currentDate.getDate()
 const currentMonth = currentDate.getMonth()+1
 const currentYear = currentDate.getFullYear()
   return currentDay + "/" + currentMonth + "/" + currentYear
}

export const getTime = () => {
  const currentDate = new Date()
  const currentHour = currentDate.getHours()
  const currentMinutes = currentDate.getMinutes()
  return addZero(currentHour) + ":" + addZero(currentMinutes)
 }
 
 export default getTime;

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
