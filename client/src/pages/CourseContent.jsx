import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTimeline } from '../services/timeline';

const CourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      const data = await getTimeline(courseId);
      setTimeline(data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Course Timeline</h2>

      {timeline.length === 0 ? (
        <p className="text-gray-500">No timeline items yet.</p>
      ) : (
        <ul className="list-disc list-inside space-y-2 mb-6">
          {timeline.map((item) => (
            <li
              key={item._id}
              className="text-lg font-semibold text-indigo-700 hover:underline cursor-pointer"
              onClick={() => navigate(`/course/${courseId}/timeline/${item._id}`)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => navigate(`/manage-course/${courseId}`)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Manage Course Content
      </button>
    </div>
  );
};

export default CourseContent;