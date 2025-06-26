import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((userData) => {
        setUser(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="text-slate-600 text-lg">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="text-red-500 text-lg">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-8 rounded-xl text-center border border-slate-200">
      {user.photoURL ? (
        <img
          src={
            user.photoURL?.startsWith("/uploads")
              ? `http://localhost:5000${user.photoURL}`
              : user.photoURL
          }
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg object-cover border-4 border-emerald-400"
        />
      ) : (
        <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-slate-200 flex items-center justify-center">
          <span className="text-slate-500 text-4xl">👤</span>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-2 text-slate-800">
        {user.displayName}
      </h2>
      <p className="text-slate-600 mb-4">{user.email}</p>

      <button
        onClick={() => navigate("/profile/edit")}
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg shadow transition duration-200"
      >
        Edit Profile
      </button>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow transition duration-200"
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
