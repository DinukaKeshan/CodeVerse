import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaUserGraduate, FaCheckCircle, FaStar, FaUsers } from 'react-icons/fa';

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
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

  const RippleButton = ({ children, onClick, className }) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, id: Date.now() };
      setRipples([...ripples, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);

      if (onClick) onClick(e);
    };

    return (
      <button onClick={handleClick} className={`relative overflow-hidden ${className}`}>
        {children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ripple"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
      </button>
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg transform hover:scale-110 transition-all duration-300">
              <FaBook className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
              Explore Courses
            </h1>
            <p className="text-gray-600">Discover amazing courses to boost your skills</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                {courses.length}
              </div>
              <p className="text-sm text-gray-600">Total Courses</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {enrolledIds.length}
              </div>
              <p className="text-sm text-gray-600">Enrolled</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                {courses.length - enrolledIds.length}
              </div>
              <p className="text-sm text-gray-600">Available</p>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={course._id}
                className={`relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0 overflow-hidden group`}
                onMouseEnter={() => setHoveredCard(course._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Enrolled Badge */}
                {enrolledIds.includes(course._id) && (
                  <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg animate-pulse">
                    <FaCheckCircle className="text-xs" />
                    Enrolled
                  </div>
                )}

                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.bannerUrl?.startsWith('/uploads') 
                      ? `http://localhost:5000${course.bannerUrl}` 
                      : course.bannerUrl || '/default-course.jpg'}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                    {course.category || 'General'}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {course.description || 'Explore this amazing course and enhance your skills.'}
                  </p>

                  {/* Instructor Info */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                      <FaUserGraduate className="text-white text-xs" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        {course.instructor?.displayName || 'Expert Instructor'}
                      </p>
                      <p className="text-xs text-gray-500">Instructor</p>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span>4.8</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-gray-400" />
                      <span>{Math.floor(Math.random() * 1000) + 100} students</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {enrolledIds.includes(course._id) ? (
                    <RippleButton
                      onClick={() => navigate(`/lessons/${course._id}`)}
                      className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <FaBook />
                        Continue Learning
                      </span>
                    </RippleButton>
                  ) : (
                    <RippleButton
                      onClick={() => handleEnroll(course._id)}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                    >
                      <span className="relative z-10">Enroll Now</span>
                    </RippleButton>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 border-2 border-indigo-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {courses.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <FaBook className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses available</h3>
              <p className="text-gray-500">Check back later for new courses</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}