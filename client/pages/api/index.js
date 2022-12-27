import axios from "axios";

export const serverInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  responseType: "json",
});
