import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

// Add a timeline item to a course
export const createTimelineItem = async (courseId, itemData) => {
  const res = await API.post(`/timeline/${courseId}`, itemData, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Get all timeline items for a course
export const getTimeline = async (courseId) => {
  const res = await API.get(`/timeline/${courseId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};
