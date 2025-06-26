import { useEffect, useState } from 'react';
import { getProfile } from '../services/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCamera, FaArrowLeft, FaSave, FaSpinner, FaEdit } from 'react-icons/fa';

const ProfileUpdate = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then(userData => {
        setUser(userData);
        setDisplayName(userData.displayName || '');
        setEmail(userData.email || '');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false);
      });
  }, []);

  // Ripple effect component
  const RippleButton = ({ children, onClick, className, disabled, type = "button" }) => {
    const [buttonRipples, setButtonRipples] = useState([]);

    const handleClick = (e) => {
      if (disabled) return;
      
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
        type={type}
        onClick={handleClick}
        disabled={disabled}
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    document.getElementById('photo-input').click();
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

      setMessage('Profile updated successfully! Refreshing and redirecting...');
      
      // Wait a moment to show the success message, then refresh and navigate
      setTimeout(() => {
        // Refresh the page first
        window.location.reload();
        
        // After refresh, navigate to profile (this will happen after the page reloads)
        setTimeout(() => {
          navigate('/profile');
        }, 100);
      }, 1500);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const getCurrentPhotoUrl = () => {
    if (photoPreview) return photoPreview;
    if (user?.photoURL) {
      return user.photoURL.startsWith("/uploads")
        ? `http://localhost:5000${user.photoURL}`
        : user.photoURL;
    }
    return null;
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
              Edit Profile
            </h1>
            <p className="text-gray-600 text-lg">
              Update your profile information and settings
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 relative">
            <form onSubmit={handleUpdate}>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
                {/* Profile Image Section */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="relative group">
                    {getCurrentPhotoUrl() ? (
                      <img
                        src={getCurrentPhotoUrl()}
                        alt="Profile"
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-white shadow-2xl group-hover:scale-105 transition-all duration-300 animate-float"
                      />
                    ) : (
                      <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center ring-4 ring-white shadow-2xl group-hover:scale-105 transition-all duration-300 animate-float">
                        <FaUserCircle className="text-white text-6xl md:text-7xl" />
                      </div>
                    )}
                    
                    {/* Camera Button Overlay */}
                    <button
                      type="button"
                      onClick={handlePhotoClick}
                      className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                    >
                      <FaCamera className="text-white text-2xl md:text-3xl" />
                    </button>
                    
                    {/* Online Status Indicator */}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-orange-400 rounded-full border-4 border-white animate-pulse shadow-lg"></div>
                  </div>
                  
                  {/* Upload Button */}
                  <RippleButton
                    onClick={handlePhotoClick}
                    className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"
                  >
                    <FaCamera className="inline mr-2" />
                    {photoFile ? 'Change Photo' : 'Upload Photo'}
                  </RippleButton>
                  
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Form Fields Section */}
                <div className="flex-1 text-center md:text-left space-y-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="displayName">
                      Full Name
                    </label>
                    <input
                      id="displayName"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white/90 focus:bg-white text-lg"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white/90 focus:bg-white text-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* Role Badge (Read-only) */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <div className="inline-flex items-center">
                      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        {user?.role || "Student"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start">
                    <RippleButton
                      type="submit"
                      disabled={updating}
                      className={`flex items-center justify-center space-x-3 px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 ${
                        updating
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                      }`}
                    >
                      {updating ? (
                        <>
                          <FaSpinner className="animate-spin text-lg" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <FaSave className="text-lg" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </RippleButton>

                    <button
                      type="button"
                      onClick={() => navigate('/profile')}
                      className="flex items-center justify-center space-x-3 bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"
                    >
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Success/Error Message */}
              {message && (
                <div className={`mt-8 p-4 rounded-xl text-center font-medium ${
                  message.includes('Failed') 
                    ? 'bg-red-50 text-red-600 border border-red-200' 
                    : 'bg-green-50 text-green-600 border border-green-200'
                }`}>
                  {message}
                </div>
              )}
            </form>

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

export default ProfileUpdate;