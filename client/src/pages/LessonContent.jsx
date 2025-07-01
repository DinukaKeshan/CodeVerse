import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTimeline } from '../services/timeline';

export default function LessonContent() {
  const { courseId, timelineId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const timeline = await getTimeline(courseId);
        const selected = timeline.find(t => t._id === timelineId);
        setItem(selected);
        setLoading(false);
      } catch (err) {
        console.error('Error loading timeline item:', err);
        setLoading(false);
      }
    };

    fetchItem();
  }, [courseId, timelineId]);

  if (loading) return <p className="p-6">Loading lesson content...</p>;
  if (!item) return <p className="p-6 text-red-600">Lesson not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{item.title}</h2>

      {/* Videos */}
      {item.videos && item.videos.length > 0 ? (
        <div className="space-y-6 mb-8">
          {item.videos.map((video, index) => (
            <div key={index} className="aspect-video">
              <iframe
                src={video}
                title={`Video ${index + 1}`}
                className="w-full h-full rounded shadow"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No videos provided for this lesson.</p>
      )}

      {/* PDFs */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Resources</h3>
        {item.pdfs && item.pdfs.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {item.pdfs.map((pdf, index) => (
              <li key={index}>
                <a
                  href={pdf.startsWith('/uploads') ? `http://localhost:5000${pdf}` : pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View PDF {index + 1}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No PDF resources available.</p>
        )}
      </div>
    </div>
  );
}
