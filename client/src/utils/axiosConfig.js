import axios from "axios";

const verifyToken = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  return token ? token : "";
};

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_BASE_URL || "https://localhost:3001",
  timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers["x-access-token"] = verifyToken();
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle network errors
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server responded with status:', error.response.status);
      console.error("Error:", error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error:', error.message);
    }
    
    // Retry the request after a delay
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(instance(error.config)), 3000); // Retry after 3 seconds
    // });
  }
);

export default instance;