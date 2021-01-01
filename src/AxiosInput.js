import axios from "axios";

const databaseURLProduction = "https://dfp-app-registrations-default-rtdb.firebaseio.com";
const databaseURLDevelopment = "https://input-output-data.firebaseio.com";

const config = process.env.NODE_ENV === 'production'
? databaseURLProduction : databaseURLDevelopment

const instance = axios.create ({
  baseURL: config
});

export default instance;