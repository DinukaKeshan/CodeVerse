import { useState } from 'react';
import { createCourse } from '../services/course';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaUpload, FaBook, FaChartLine, FaGraduationCap } from 'react-icons/fa';

const InstructorDashboard = () => {
  const [title, setTitle] = useState('');
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle file selection and preview
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBannerFile(file);
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
    } else {
      setBannerPreview('');
    }
  };

  // Upload image to server and return URL
  const uploadBanner = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('token');
    const res = await axios.post(
      'http://localhost:5000/upload/image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.url;
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!title || !bannerFile) return;

    setLoading(true);
    try {
      const finalBannerUrl = await uploadBanner(bannerFile);
      await createCourse({ title, bannerUrl: finalBannerUrl });
      setTitle('');
      setBannerFile(null);
      setBannerPreview('');
      alert('Course created successfully!');
      navigate('/instructor/courses');
    } catch (error) {
      alert('Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Instructor Dashboard
              </h1>
              <p className="text-gray-500 mt-1">Create and manage your educational content</p>
            </div>
            <button
              onClick={() => navigate('/instructor/courses')}
              className="relative bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md flex items-center space-x-2 group"
            >
              <FaBook className="group-hover:rotate-12 transition-transform duration-300" />
              <span>View My Courses</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 hover:shadow-md transition-all duration-300 transform hover:scale-105 active:scale-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <FaBook className="text-white" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 hover:shadow-md transition-all duration-300 transform hover:scale-105 active:scale-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Students</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <FaGraduationCap className="text-white" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-6 border border-pink-100 hover:shadow-md transition-all duration-300 transform hover:scale-105 active:scale-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$0</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <FaChartLine className="text-white" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create Course Form */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <FaPlus className="mr-2" />
                Create New Course
              </h3>
              <p className="text-indigo-100 text-sm mt-1">Start sharing your knowledge with students</p>
            </div>

            <form onSubmit={handleCreateCourse} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  placeholder="Enter an engaging course title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Banner
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    className="hidden"
                    id="banner-upload"
                    required
                  />
                  <label
                    htmlFor="banner-upload"
                    className="cursor-pointer block w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors duration-200 group"
                  >
                    {!bannerPreview ? (
                      <>
                        <FaUpload className="mx-auto text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" size={48} />
                        <p className="mt-2 text-sm text-gray-600">
                          Click to upload course banner
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </>
                    ) : (
                      <div className="relative">
                        <img
                          src={bannerPreview}
                          alt="Banner Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <p className="text-white font-medium">Click to change</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Course...</span>
                  </>
                ) : (
                  <>
                    <FaPlus />
                    <span>Create Course</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Tips Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
              <h4 className="font-bold text-gray-800 mb-3">Quick Tips for Success</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Choose a clear, descriptive title that tells students what they'll learn
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Use high-quality banner images (1280x720px recommended)
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Create engaging content that provides real value to students
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Structure your course with clear learning objectives
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-bold text-gray-800 mb-3">Next Steps</h4>
              <p className="text-sm text-gray-600 mb-4">
                After creating your course, you'll be able to:
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-bold">1</span>
                  </div>
                  Add detailed course description and objectives
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-bold">2</span>
                  </div>
                  Create modules and upload video content
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-bold">3</span>
                  </div>
                  Set pricing and publish your course
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;