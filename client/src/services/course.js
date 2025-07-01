import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

// Create a new course
export const createCourse = async (courseData) => {
  const res = await API.post('/courses', courseData, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Get all courses created by the logged-in instructor
export const getMyCourses = async () => {
  const res = await API.get('/courses/my-courses', {
    headers: getAuthHeader(),
  });
  return res.data;
};
