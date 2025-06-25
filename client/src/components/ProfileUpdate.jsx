import { useEffect, useState } from 'react';
import { getProfile } from '../services/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then(userData => {
        setDisplayName(userData.displayName || '');
        setEmail(userData.email || '');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false);
      });
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('displayName', displayName);
      formData.append('email', email);
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      await axios.put('http://localhost:5000/profile/update', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Profile updated successfully');
      setPhotoFile(null);

      setTimeout(() => navigate('/profile'), 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="text-slate-600 text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-8 rounded-xl border border-slate-200">
      <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">Edit Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4 text-left">
        <div>
          <label className="block text-sm text-slate-600 mb-1" htmlFor="displayName">Name</label>
          <input
            id="displayName"
            type="text"
            className="w-full p-2 border rounded"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1" htmlFor="photo">Profile Photo</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {photoFile && <p className="mt-1 text-sm text-slate-700">Selected: {photoFile.name}</p>}
        </div>

        <button
          type="submit"
          disabled={updating}
          className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg shadow transition duration-200"
        >
          {updating ? 'Updating...' : 'Update Profile'}
        </button>

        {message && (
          <p className={`mt-4 text-center ${message.includes('Failed') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ProfileUpdate;
