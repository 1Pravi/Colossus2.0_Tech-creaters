import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tracking';  // Ensure this matches your Flask server URL

const api = {
  getDrugs: () => axios.get(`${API_URL}/drugs`),
  getVendors: () => axios.get(`${API_URL}/vendors`),
  getConsumption: () => axios.get(`${API_URL}/consumption`),
};

export default api;