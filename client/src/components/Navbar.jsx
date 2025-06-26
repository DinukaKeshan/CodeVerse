import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Ripple effect component
  const RippleButton = ({ children, onClick, className }) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, id: Date.now() };
      setRipples([...ripples, newRipple]);

      setTimeout(() => {
        setRipples((prevRipples) =>
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
        {ripples.map((ripple) => (
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
      `}</style>

      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div
                className="flex-shrink-0 cursor-pointer group active:scale-95 transition-transform duration-150"
                onClick={() => navigate("/")}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-active:scale-100 group-active:rotate-0">
                      <span className="text-white font-bold text-lg">L</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      LMS Platform
                    </h1>
                    <p className="text-xs text-gray-500 -mt-1">
                      Learn. Grow. Succeed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform active:scale-95 ${
                  isActiveLink("/")
                    ? "bg-indigo-50 text-indigo-700 shadow-sm scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-105"
                }`}
              >
                <span className="relative z-10">Home</span>
                {isActiveLink("/") && (
                  <span className="absolute inset-0 bg-indigo-100 rounded-lg animate-pulse" />
                )}
              </Link>
              <Link
                to="/courses"
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform active:scale-95 ${
                  isActiveLink("/courses")
                    ? "bg-indigo-50 text-indigo-700 shadow-sm scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-105"
                }`}
              >
                <span className="relative z-10">Courses</span>
                {isActiveLink("/courses") && (
                  <span className="absolute inset-0 bg-indigo-100 rounded-lg animate-pulse" />
                )}
              </Link>
              <Link
                to="/mentor"
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform active:scale-95 ${
                  isActiveLink("/mentor")
                    ? "bg-indigo-50 text-indigo-700 shadow-sm scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-105"
                }`}
              >
                <span className="relative z-10">Find Mentor</span>
                {isActiveLink("/mentor") && (
                  <span className="absolute inset-0 bg-indigo-100 rounded-lg animate-pulse" />
                )}
              </Link>
              <Link
                to="/dashboard"
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform active:scale-95 ${
                  isActiveLink("/dashboard")
                    ? "bg-indigo-50 text-indigo-700 shadow-sm scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-105"
                }`}
              >
                <span className="relative z-10">Dashboard</span>
                {isActiveLink("/dashboard") && (
                  <span className="absolute inset-0 bg-indigo-100 rounded-lg animate-pulse" />
                )}
              </Link>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {!loading && user ? (
                // Logged-in User Profile
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none rounded-xl px-3 py-2 hover:bg-gray-50 transition-all duration-200 group transform active:scale-95"
                >
                  <div className="relative">
                    {user.photoURL ? (
                      <img
                        src={
                          user.photoURL?.startsWith("/uploads")
                            ? `http://localhost:5000${user.photoURL}`
                            : user.photoURL
                        }
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-indigo-300 transition-all duration-300 group-hover:scale-110 group-active:scale-100"
                      />
                    ) : (
                      <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center ring-2 ring-gray-200 group-hover:ring-indigo-300 transition-all duration-300 group-hover:scale-110 group-active:scale-100">
                        <FaUserCircle className="text-white" size={22} />
                      </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.role || "Student"}
                    </p>
                  </div>
                </button>
              ) : (
                // Guest State - Login/Register Buttons
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="relative text-gray-700 hover:text-gray-900 px-5 py-2.5 text-sm font-medium border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:shadow-sm transform hover:scale-105 active:scale-95 overflow-hidden group"
                  >
                    <span className="relative z-10">Sign In</span>
                    <span className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
                  </Link>
                  <RippleButton
                    onClick={() => navigate("/register")}
                    className="relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2.5 text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                  >
                    <span className="relative z-10">Get Started</span>
                  </RippleButton>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 transform active:scale-90"
              >
                <div
                  className={`transition-transform duration-300 ${
                    mobileMenuOpen ? "rotate-180" : ""
                  }`}
                >
                  {mobileMenuOpen ? (
                    <FaTimes className="w-5 h-5" />
                  ) : (
                    <FaBars className="w-5 h-5" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 py-3 space-y-1 bg-gray-50 border-t border-gray-100">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform active:scale-95 ${
                isActiveLink("/")
                  ? "bg-white text-indigo-700 shadow-sm translate-x-2"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white hover:translate-x-2"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform active:scale-95 ${
                isActiveLink("/courses")
                  ? "bg-white text-indigo-700 shadow-sm translate-x-2"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white hover:translate-x-2"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/mentor"
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform active:scale-95 ${
                isActiveLink("/mentor")
                  ? "bg-white text-indigo-700 shadow-sm translate-x-2"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white hover:translate-x-2"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Mentor
            </Link>
            <Link
              to="/dashboard"
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform active:scale-95 ${
                isActiveLink("/dashboard")
                  ? "bg-white text-indigo-700 shadow-sm translate-x-2"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white hover:translate-x-2"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>

            {/* Mobile User Profile Section */}
            {user && (
              <div className="pt-3 mt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg hover:bg-white transition-all duration-200 transform active:scale-95 hover:translate-x-2"
                >
                  <div className="relative">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                        <FaUserCircle className="text-white" size={20} />
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
