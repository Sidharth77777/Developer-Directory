import { ENV } from "@/lib/ENV"
import axios from "axios"

export const api = axios.create({
    baseURL: `${ENV.SERVER_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    }
})

// Middleware for api calls
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data || error);
  }
);
