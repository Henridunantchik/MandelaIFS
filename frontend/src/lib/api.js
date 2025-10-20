import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  withCredentials: true,
});

// Attach Authorization header from stored JWT if available
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (_) {}
  return config
})

// Capture token on auth responses (e.g., /user/login)
api.interceptors.response.use((response) => {
  try {
    const token = response?.data?.token
    if (token) {
      localStorage.setItem('token', token)
    }
  } catch (_) {}
  return response
}, (error) => {
  // Optional: clear token on 401 to force re-login
  if (error?.response?.status === 401) {
    // localStorage.removeItem('token')
  }
  return Promise.reject(error)
})
export default api;