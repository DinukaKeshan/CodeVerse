import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    const fetchEnrolled = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/courses/enrolled', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrolledIds(res.data.map(c => c._id));
      } catch (err) {
        console.error('Enrollment fetch error:', err);
      }
    };

    fetchCourses();
    fetchEnrolled();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/courses/enroll/${courseId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrolledIds([...enrolledIds, courseId]);
    } catch (err) {
      console.error('Enroll error:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <div
            key={course._id}
            className="border rounded-xl shadow-md p-4"
          >
            <img
              src={course.bannerUrl?.startsWith('/uploads') ? `http://localhost:5000${course.bannerUrl}` : course.bannerUrl}
              alt={course.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-2">Instructor: {course.instructor?.displayName || 'Unknown'}</p>

            {enrolledIds.includes(course._id) ? (
              <button
                onClick={() => navigate(`/lessons/${course._id}`)}
                className="mt-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                View Lessons
              </button>
            ) : (
              <button
                onClick={() => handleEnroll(course._id)}
                className="mt-2 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white w-full"
              >
                Enroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
