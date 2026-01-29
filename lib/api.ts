import axios from "axios";

const api = axios.create({
  // MAGIA: Si estamos en Vercel usa la variable oculta, si estamos en tu PC usa localhost
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
