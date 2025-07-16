import axios from "axios";

const instance = axios.create({
  baseURL: 'https://todowebbackend.onrender.com/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // // Skip token logic for login request
    // if(originalRequest.url.includes('/users/login')) {
    //   return Promise.reject(err); // Let the login page handle it.
    // }

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post('https://todowebbackend.onrender.com/api/users/refresh', { token: refreshToken });
        localStorage.setItem("accessToken", res.data.accessToken);
        instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
        return instance(originalRequest);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default instance;