import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTimeline } from "../services/timeline";
import {
  FaArrowLeft,
  FaArrowRight,
  FaPlay,
  FaFilePdf,
  FaDownload,
  FaBookOpen,
  FaCheckCircle,
  FaVideo,
  FaFileAlt,
} from "react-icons/fa";

export default function LessonContent() {
  const { courseId, timelineId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);

  // Helper to convert YouTube URLs to embed format
  const toEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtube.com")) {
        const videoId = urlObj.searchParams.get("v");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
      if (urlObj.hostname === "youtu.be") {
        const videoId = urlObj.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch {
      return url; // If invalid URL, return original
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const timelineData = await getTimeline(courseId);
        setTimeline(timelineData);
        const selectedIndex = timelineData.findIndex(
          (t) => t._id === timelineId
        );
        setCurrentIndex(selectedIndex);
        setItem(timelineData[selectedIndex]);
        
        // Check if this lesson is already completed
        const savedProgress = localStorage.getItem(`course_${courseId}_completed`);
        if (savedProgress) {
          const completed = JSON.parse(savedProgress);
          if (completed.includes(timelineId)) {
            setVideoCompleted(true);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading timeline item:", err);
        setLoading(false);
      }
    };

    fetchItem();
  }, [courseId, timelineId]);

  const markLessonComplete = () => {
    const key = `course_${courseId}_completed`;
    const completed = JSON.parse(localStorage.getItem(key) || '[]');
    if (!completed.includes(timelineId)) {
      completed.push(timelineId);
      localStorage.setItem(key, JSON.stringify(completed));
      setVideoCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(`/lessons/${courseId}/${timeline[currentIndex - 1]._id}`);
    }
  };

  const handleNext = () => {
    // Mark current lesson as complete when moving to next
    markLessonComplete();
    
    if (currentIndex < timeline.length - 1) {
      navigate(`/lessons/${courseId}/${timeline[currentIndex + 1]._id}`);
    }
  };

  const handleCompleteLesson = () => {
    markLessonComplete();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-indigo-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full mb-4">
            <FaBookOpen className="text-red-500 text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Lesson not found</h3>
          <p className="text-gray-600 mb-6">
            This lesson might have been removed or doesn't exist.
          </p>
          <button
            onClick={() => navigate(`/lessons/${courseId}`)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/lessons/${courseId}`)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 group transition-all duration-200"
          >
            <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Lessons</span>
          </button>
        </div>

        {/* Main Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Header */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span>
                      Lesson {currentIndex + 1} of {timeline.length}
                    </span>
                    {videoCompleted && (
                      <span className="flex items-center gap-1 text-green-600">
                        <FaCheckCircle className="text-xs" />
                        Completed
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    {item.title}
                  </h1>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FaVideo className="text-white text-xl" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${((currentIndex + 1) / timeline.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Video Section */}
            {item.videos && item.videos.length > 0 ? (
              <div className="space-y-4">
                {item.videos.map((video, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden group"
                  >
                    <div className="relative aspect-video bg-gray-900">
                      <iframe
                        src={toEmbedUrl(video)}
                        title={`Video ${index + 1}`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50">
                      <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FaPlay className="text-indigo-600" />
                        Video {index + 1} of {item.videos.length}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
                  <FaVideo className="text-gray-400 text-2xl" />
                </div>
                <p className="text-gray-600">No videos available for this lesson</p>
              </div>
            )}

            {/* Mark Complete Button */}
            {!videoCompleted && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 text-center">
                <p className="text-gray-700 mb-4">
                  Finished watching? Mark this lesson as complete to track your progress.
                </p>
                <button
                  onClick={handleCompleteLesson}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <FaCheckCircle />
                  Mark as Complete
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                <FaArrowLeft />
                Previous Lesson
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === timeline.length - 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentIndex === timeline.length - 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                Next Lesson
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Right Column - Resources */}
          <div className="space-y-6">
            {/* Resources Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-indigo-600" />
                Lesson Resources
              </h3>

              {item.pdfs && item.pdfs.length > 0 ? (
                <div className="space-y-3">
                  {item.pdfs.map((pdf, index) => (
                    <a
                      key={index}
                      href={
                        pdf.startsWith("/uploads")
                          ? `http://localhost:5000${pdf}`
                          : pdf
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
                          <FaFilePdf className="text-red-500 text-lg" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            PDF Resource {index + 1}
                          </p>
                          <p className="text-xs text-gray-600">Click to view</p>
                        </div>
                      </div>
                      <FaDownload className="text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
                    <FaFileAlt className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-500 text-sm">No resources available</p>
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium text-gray-800">~15 minutes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Type</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      Video Lesson
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      videoCompleted 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {videoCompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
              <h4 className="font-semibold mb-2">Need Help?</h4>
              <p className="text-sm text-white/80 mb-4">
                Get support from instructors and peers
              </p>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-medium transition-all duration-200">
                Ask a Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}