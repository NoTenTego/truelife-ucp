import axios from "axios";

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://truelife-api-ten.vercel.app/api/",
  withCredentials: true,
});