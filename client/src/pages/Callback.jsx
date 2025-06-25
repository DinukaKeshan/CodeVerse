import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/api';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);

      getProfile().then(userData => {
        if (!userData.role) {
          navigate('/select-role');
        } else {
          navigate('/profile');
        }
      }).catch(() => {
        navigate('/login');
      });
    }
  }, [navigate]);

  return <div className="text-center mt-10">Logging in...</div>;
};

export default Callback;
