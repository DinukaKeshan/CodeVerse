import { useEffect, useState } from 'react';
import { getMyCourses } from '../services/course';
import { useNavigate } from 'react-router-dom';

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-500">You haven't created any courses yet.</p>
      ) : (
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
      )}
    </div>
  );
};

export default InstructorCourses;
