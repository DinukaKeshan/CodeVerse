import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/courses/enrolled', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error('Error loading enrolled courses', err);
      }
    };

    fetchEnrolled();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p>You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map(course => (
            <div key={course._id} className="border rounded-xl shadow-md p-4">
              <img
                src={course.bannerUrl?.startsWith('/uploads') ? `http://localhost:5000${course.bannerUrl}` : course.bannerUrl}
                alt={course.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p className="text-sm text-gray-600">Instructor: {course.instructor?.displayName || 'Unknown'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
