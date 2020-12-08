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
  const currentMinutes = currentDate.getMinutes()+1
  return currentHour + ":" + currentMinutes
 }
 
 export default getTime;