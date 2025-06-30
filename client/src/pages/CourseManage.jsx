import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createTimelineItem, getTimeline } from '../services/timeline';

const CourseManage = () => {
  const { courseId } = useParams();
  const [title, setTitle] = useState('');
  const [videos, setVideos] = useState(['']);
  const [pdfs, setPdfs] = useState(['']);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    setLoading(true);
    try {
      const cleanVideos = videos.filter((v) => v.trim() !== '');
      const cleanPdfs = pdfs.filter((p) => p.trim() !== '');

      await createTimelineItem(courseId, {
        title,
        videos: cleanVideos,
        pdfs: cleanPdfs,
      });

      setTitle('');
      setVideos(['']);
      setPdfs(['']);
    } catch (err) {
      alert('Failed to add timeline item');
    } finally {
      setLoading(false);
    }
  };

  const updateList = (index, value, setFunc, list) => {
    const newList = [...list];
    newList[index] = value;
    setFunc(newList);
  };

  const addInput = (setFunc, list) => {
    setFunc([...list, '']);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Course Content</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6">
        <h3 className="text-lg font-semibold mb-2">Add Timeline Title</h3>
        <input
          type="text"
          placeholder="Timeline Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 border border-gray-300 px-3 py-2 rounded"
        />

        <div className="mb-3">
          <h4 className="font-medium mb-1">YouTube Video Links</h4>
          {videos.map((v, idx) => (
            <input
              key={idx}
              type="text"
              value={v}
              onChange={(e) => updateList(idx, e.target.value, setVideos, videos)}
              placeholder={`Video ${idx + 1}`}
              className="w-full mb-2 border border-gray-300 px-3 py-2 rounded"
            />
          ))}
          <button
            type="button"
            onClick={() => addInput(setVideos, videos)}
            className="text-sm text-indigo-600 hover:underline"
          >
            + Add Another Video
          </button>
        </div>

        <div className="mb-3">
          <h4 className="font-medium mb-1">PDF Links</h4>
          {pdfs.map((p, idx) => (
            <input
              key={idx}
              type="text"
              value={p}
              onChange={(e) => updateList(idx, e.target.value, setPdfs, pdfs)}
              placeholder={`PDF ${idx + 1}`}
              className="w-full mb-2 border border-gray-300 px-3 py-2 rounded"
            />
          ))}
          <button
            type="button"
            onClick={() => addInput(setPdfs, pdfs)}
            className="text-sm text-indigo-600 hover:underline"
          >
            + Add Another PDF
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Timeline Item'}
        </button>
      </form>
    </div>
  );
};

export default CourseManage;