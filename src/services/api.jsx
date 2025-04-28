import axios from "axios";

const api = axios.create({
  baseURL: "https://botanicaback.azurewebsites.net", 
});

export default api;
