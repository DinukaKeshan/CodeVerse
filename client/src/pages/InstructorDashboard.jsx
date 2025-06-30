import { useState } from 'react';
import { createCourse } from '../services/course';
import axios from 'axios';

const InstructorDashboard = () => {
  const [title, setTitle] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (!title || (!bannerUrl && !bannerFile)) return;

    setLoading(true);
    try {
      let finalBannerUrl = bannerUrl;
      if (bannerFile) {
        finalBannerUrl = await uploadBanner(bannerFile);
      }
      await createCourse({ title, bannerUrl: finalBannerUrl });
      setTitle('');
      setBannerUrl('');
      setBannerFile(null);
      setBannerPreview('');
      alert('Course created successfully!');
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
          <label className="block mb-1 font-medium">Banner Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="mb-2"
          />
          <div className="text-sm text-gray-500 mb-2">or paste image URL below</div>
          <input
            type="text"
            placeholder="Banner Image URL"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            disabled={!!bannerFile}
          />
          {bannerPreview && (
            <img
              src={bannerPreview}
              alt="Banner Preview"
              className="mt-2 w-full max-h-48 object-contain rounded border"
            />
          )}
          {!bannerPreview && bannerUrl && (
            <img
              src={bannerUrl}
              alt="Banner Preview"
              className="mt-2 w-full max-h-48 object-contain rounded border"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default InstructorDashboard;
