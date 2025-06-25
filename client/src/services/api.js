import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await API.get('/profile/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const registerUser = async (formData) => {
  const res = await API.post('/auth/register', formData);
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await API.post('/auth/login', formData);
  return res.data;
};

export const updateUserRole = async (role) => {
  const token = localStorage.getItem('token');
  const res = await API.post('/auth/role', { role }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
