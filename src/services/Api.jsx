import axios from "axios";

// creating an Axios instance
const api = axios.create({
    baseURL: "http://localhost:8080"
})

// Add a request interceptor to include token in headers
api.interceptors.request.use(
    (config) =>{
        const token = sessionStorage.getItem('token');
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
          
    },
    (error) => Promise.reject(error)
)

// Add a response interceptor to handle unauthorized responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        sessionStorage.removeItem('token'); // Clear token
        window.location.href = '/login'; // Redirect to login
      }
      return Promise.reject(error);
    }
  );

export default api;