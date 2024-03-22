import axios from "axios";

const verifyToken = () => {
  const token = JSON.parse(localStorage.getItem("Token"));
  return token ? token : "";
};

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_BASE_URL ||
    "https://localhost:3001",
  timeout: 2 * 60 * 1000,
});

instance.interceptors.request.use((config) => {
  config.headers["x-access-token"] = verifyToken();
  config.headers["Content-Type"] = "multipart/form-data";

  return config;
});

export default instance;