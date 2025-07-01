import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaGraduationCap,
  FaClock,
  FaChartLine,
  FaPlayCircle,
  FaTrophy,
} from "react-icons/fa";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/courses/enrolled", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Error loading enrolled courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolled();
  }, []);

  const getProgressPercentage = () => Math.floor(Math.random() * 60) + 20; // Mock progress

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-3 transition-all duration-300">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                My Learning Journey
              </h1>
              <p className="text-gray-600">
                Track your progress and continue learning
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 group">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors duration-200">
                  <FaBook className="text-indigo-600 text-xl" />
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  {courses.length}
                </span>
              </div>
              <p className="text-sm text-gray-600">Enrolled Courses</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 group">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors duration-200">
                  <FaChartLine className="text-purple-600 text-xl" />
                </div>
                <span className="text-2xl font-bold text-gray-800">65%</span>
              </div>
              <p className="text-sm text-gray-600">Avg. Progress</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 group">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-pink-50 rounded-lg group-hover:bg-pink-100 transition-colors duration-200">
                  <FaClock className="text-pink-600 text-xl" />
                </div>
                <span className="text-2xl font-bold text-gray-800">24h</span>
              </div>
              <p className="text-sm text-gray-600">Learning Time</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 group">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors duration-200">
                  <FaTrophy className="text-green-600 text-xl" />
                </div>
                <span className="text-2xl font-bold text-gray-800">3</span>
              </div>
              <p className="text-sm text-gray-600">Certificates</p>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>My Courses</span>
            <span className="text-sm font-normal text-gray-500">
              ({courses.length} enrolled)
            </span>
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-indigo-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
              </div>
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
                <FaBook className="text-indigo-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No courses yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start your learning journey by exploring our course catalog
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                <FaBook />
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => {
                const progress = getProgressPercentage();
                return (
                  <div
                    key={course._id}
                    onClick={() => navigate(`/lessons/${course._id}`)}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0 cursor-pointer overflow-hidden group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Course Image with Overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          course.bannerUrl?.startsWith("/uploads")
                            ? `http://localhost:5000${course.bannerUrl}`
                            : course.bannerUrl || "/default-course.jpg"
                        }
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <FaPlayCircle className="text-indigo-600 text-4xl ml-1" />
                        </div>
                      </div>

                      {/* Progress Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                        {progress}% Complete
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                        {course.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                          <FaGraduationCap className="text-white text-xs" />
                        </div>
                        <p className="text-sm text-gray-600">
                          {course.instructor?.displayName ||
                            "Unknown Instructor"}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">
                            Progress
                          </span>
                          <span className="text-xs font-semibold text-indigo-600">
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="w-full py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 font-medium rounded-xl transition-all duration-200 group-hover:shadow-md">
                        Continue Learning
                      </button>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-2 border-indigo-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
