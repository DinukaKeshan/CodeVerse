import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTimeline } from '../services/timeline';

export default function Lessons() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await getTimeline(courseId);
        setTimeline(data);
      } catch (error) {
        console.error('Error fetching timeline:', error);
      }
    };

    fetchTimeline();
  }, [courseId]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Course Lessons</h2>

      {timeline.length === 0 ? (
        <p className="text-gray-500">No lessons available.</p>
      ) : (
        <ul className="space-y-3">
          {timeline.map((item) => (
            <li
              key={item._id}
              onClick={() => navigate(`/course/${courseId}/timeline/${item._id}`)}
              className="text-lg font-medium text-blue-700 hover:underline cursor-pointer flex items-center gap-2"
            >
              📘 {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
