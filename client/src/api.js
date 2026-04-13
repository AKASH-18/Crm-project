import axios from "axios";

const API = axios.create({
  baseURL: "https://crm-project-1-2o2n.onrender.com/api", //"http://localhost:5000/api" import.meta.env.VITE_API_URL
});

export default API;
