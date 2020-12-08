import axios from "axios";

const instance = axios.create ({
  baseURL: "https://input-output-data.firebaseio.com/"
});

export default instance;