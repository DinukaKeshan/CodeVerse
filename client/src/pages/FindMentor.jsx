import React, { useEffect, useState } from 'react';
import { getInstructors, getProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const FindMentor = () => {
  const [instructors, setInstructors] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
        if (profile.role === 'Instructor') {
          navigate('/instructor-messages');
        } else {
          const data = await getInstructors();
          setInstructors(data);
        }
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
    fetchData();
  }, [navigate]);

  if (user?.role === 'Instructor') return null;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Find a Mentor</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {instructors.map((mentor) => (
          <div key={mentor._id} className="border rounded-lg p-4 shadow">
            <img src={`http://localhost:5000${mentor.photoURL}`} alt="" className="w-20 h-20 rounded-full object-cover mb-2" />
            <h3 className="text-lg font-semibold">{mentor.displayName}</h3>
            <p className="text-sm text-gray-600">{mentor.email}</p>
            <button
              onClick={() => navigate(`/chat/${mentor._id}`)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Chat Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindMentor;
