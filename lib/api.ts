import axios from "axios";

const api = axios.create({
  // Intenta cambiar '127.0.0.1' por 'localhost' si sigue fallando
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
