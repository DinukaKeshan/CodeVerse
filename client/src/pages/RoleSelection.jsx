import { useNavigate } from 'react-router-dom';
import { updateUserRole } from '../services/api';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = async (role) => {
    try {
      await updateUserRole(role);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert('Failed to update role.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-8">Select Your Role</h2>
      <div className="flex space-x-6">
        <button
          onClick={() => handleRoleSelect('Student')}
          className="bg-emerald-500 text-white px-6 py-3 rounded hover:bg-emerald-600 text-xl"
        >
          Student
        </button>
        <button
          onClick={() => handleRoleSelect('Instructor')}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-xl"
        >
          Instructor
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
