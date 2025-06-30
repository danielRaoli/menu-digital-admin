// lib/axios.ts
import axios from "axios";
import router from "next/router";
import { isTokenExpired } from "@/utils/jwt";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && isTokenExpired(token)) {

    localStorage.removeItem("token");
    router.push("/login");
    return Promise.reject("Token expirado");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
