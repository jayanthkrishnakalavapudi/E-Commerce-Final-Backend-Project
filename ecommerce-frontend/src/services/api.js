import axios from 'axios';

const API = axios.create({
  baseURL: 'https://e-commerce-backend-api-dev.onrender.com/api',
});

// Add JWT to requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Auth
  login: (credentials) => API.post('/users/login', credentials),
  register: (userData) => API.post('/users/register', userData),
  getProfile: () => API.get('/users/me'),
  updateProfile: (userData) => API.patch('/users/me', userData), // New profile update endpoint

  // Products
  getProducts: () => API.get('/products'),
  getProduct: (id) => API.get(`/products/${id}`),

  // Your specific API endpoints
  getWeatherRecommendations: (lat, lon) => 
    API.get('/products/recommendations/weather', { params: { lat, lon } }),

  // Orders
  createOrder: (orderData) => API.post('/orders', orderData),
  getOrders: () => API.get('/orders/me'),


  // Categories
  getCategories: () => API.get('/categories'),
  createCategory: (categoryData) => API.post('/categories', categoryData),
};