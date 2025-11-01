import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to debug cookies
apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

// Add response interceptor to debug 401 errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('401 Unauthorized - Check cookies and backend auth:', {
        url: error.config?.url,
        status: error.response.status,
        cookies: document.cookie,
        response: error.response.data,
      });
    }
    return Promise.reject(error);
  },
);

export default apiClient;
