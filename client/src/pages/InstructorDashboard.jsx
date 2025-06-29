import { useEffect, useState } from 'react';
import { createCourse, getMyCourses } from '../services/course';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load instructor's courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getMyCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!title || !bannerUrl) return;

    setLoading(true);
    try {
      await createCourse({ title, bannerUrl });
      setTitle('');
      setBannerUrl('');
      fetchCourses();
    } catch (error) {
      alert('Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Instructor Dashboard</h2>

      {/* New Course Form */}
      <form onSubmit={handleCreateCourse} className="mb-8 bg-white shadow-md rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Create New Course</h3>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Banner Image URL"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>

      {/* Course List */}
      <h3 className="text-lg font-semibold mb-2">Your Courses</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded shadow hover:shadow-md p-4 cursor-pointer transition"
            onClick={() => navigate(`/manage-course/${course._id}`)}
          >
            <img
              src={course.bannerUrl}
              alt={course.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h4 className="text-lg font-bold">{course.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorDashboard;
