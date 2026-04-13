import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", //"http://localhost:5000/api" import.meta.env.VITE_API_URL "https://crm-project-1-2o2n.onrender.com/api"
});

export default API;
