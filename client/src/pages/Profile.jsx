import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ripples, setRipples] = useState([]);
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

  // Ripple effect component
  const RippleButton = ({ children, onClick, className }) => {
    const [buttonRipples, setButtonRipples] = useState([]);

    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, id: Date.now() };
      setButtonRipples([...buttonRipples, newRipple]);

      setTimeout(() => {
        setButtonRipples((prevRipples) =>
          prevRipples.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 600);

      if (onClick) onClick(e);
    };

    return (
      <button
        onClick={handleClick}
        className={`relative overflow-hidden ${className}`}
      >
        {children}
        {buttonRipples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ripple"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
      </button>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <>
        <style jsx>{`
          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(4);
              opacity: 0;
            }
          }
          .animate-ripple {
            animation: ripple 0.6s ease-out;
          }
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
            }
            50% {
              box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
            }
          }
          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
        `}</style>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse-glow">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Loading your profile...
              </h3>
              <p className="text-gray-500 mt-2">Please wait a moment</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl">!</span>
          </div>
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Failed to load profile
          </h3>
          <p className="text-gray-500">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              User Profile
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your profile and account settings
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
              {/* Profile Image Section */}
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="relative group">
                  {user.photoURL ? (
                    <img
                      src={
                        user.photoURL?.startsWith("/uploads")
                          ? `http://localhost:5000${user.photoURL}`
                          : user.photoURL
                      }
                      alt="Profile"
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-white shadow-2xl group-hover:scale-105 transition-all duration-300 animate-float"
                    />
                  ) : (
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center ring-4 ring-white shadow-2xl group-hover:scale-105 transition-all duration-300 animate-float">
                      <FaUserCircle className="text-white text-6xl md:text-7xl" />
                    </div>
                  )}
                  
                  {/* Online Status Indicator */}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white animate-pulse shadow-lg"></div>
                </div>
              </div>

              {/* Profile Details Section */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                    {user.displayName}
                  </h2>
                  <p className="text-gray-600 text-lg mb-3">{user.email}</p>
                  
                  {/* Role Badge */}
                  <div className="inline-flex items-center">
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transform hover:scale-105 transition-all duration-200">
                      {user.role || "Student"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <RippleButton
                    onClick={() => navigate("/profile/edit")}
                    className="flex items-center justify-center space-x-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"
                  >
                    <FaEdit className="text-lg" />
                    <span>Edit Profile</span>
                  </RippleButton>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-3 bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300 hover:text-red-600 hover:bg-red-50 px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 group"
                  >
                    <FaSignOutAlt className="text-lg group-hover:text-red-500 transition-colors duration-200" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-indigo-400/20 rounded-full blur-2xl -z-10"></div>
          </div>

          {/* Bottom Decorative Section */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              LMS Platform • Learn. Grow. Succeed.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;