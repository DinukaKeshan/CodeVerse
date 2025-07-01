import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTimeline } from '../services/timeline';
import { 
  FaBook, 
  FaPlayCircle, 
  FaCheckCircle, 
  FaClock, 
  FaArrowLeft,
  FaChevronRight 
} from 'react-icons/fa';

export default function Lessons() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await getTimeline(courseId);
        setTimeline(data);
        
        // Load completed lessons from localStorage
        const savedProgress = localStorage.getItem(`course_${courseId}_completed`);
        if (savedProgress) {
          setCompletedLessons(JSON.parse(savedProgress));
        } else {
          setCompletedLessons([]);
        }
      } catch (error) {
        console.error('Error fetching timeline:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [courseId]);

  const getLessonIcon = (index, lessonId) => {
    if (completedLessons.includes(lessonId)) {
      return <FaCheckCircle className="text-green-500" />;
    } else {
      return <FaPlayCircle className="text-indigo-600" />;
    }
  };

  const progress = timeline.length > 0 
    ? Math.round((completedLessons.length / timeline.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group transition-all duration-200"
          >
            <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Dashboard</span>
          </button>

          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-3 transition-all duration-300">
                  <FaBook className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Course Lessons
                  </h1>
                  <p className="text-gray-600">Continue your learning journey</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-bold text-indigo-600">{progress}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>{completedLessons.length} of {timeline.length} lessons completed</span>
                <span className="flex items-center gap-1">
                  <FaClock />
                  ~{Math.round(timeline.length * 15)} min total
                </span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-indigo-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
            </div>
          </div>
        ) : timeline.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
              <FaBook className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No lessons available</h3>
            <p className="text-gray-600">This course doesn't have any lessons yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {timeline.map((item, index) => {
              const isCompleted = completedLessons.includes(item._id);
              const isActive = !isCompleted && completedLessons.length === index;

              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/lessons/${courseId}/${item._id}`)}
                  className={`
                    relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 
                    transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]
                    cursor-pointer
                    ${isActive ? 'ring-2 ring-indigo-400 ring-offset-2' : ''}
                    group overflow-hidden
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {isCompleted && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
                      Completed
                    </div>
                  )}

                  <div className="p-5 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
                        transition-all duration-300 group-hover:scale-110
                        ${isCompleted 
                          ? 'bg-green-50 text-green-600' 
                          : isActive 
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg animate-pulse' 
                            : 'bg-gray-100 text-gray-600'
                        }
                      `}>
                        {index + 1}
                      </div>
                      <div className="text-xl">
                        {getLessonIcon(index, item._id)}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold transition-colors duration-200 text-gray-800 group-hover:text-indigo-600">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaClock className="text-xs" />
                          ~15 min
                        </span>
                        {item.type && (
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                            {item.type}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="transition-all duration-300 transform group-hover:translate-x-1">
                      <FaChevronRight className="text-gray-400" />
                    </div>
                  </div>

                  {index < timeline.length - 1 && (
                    <div className="absolute left-[3.25rem] top-full h-3 w-0.5 bg-gray-200 -translate-y-0.5 z-10">
                      {isCompleted && (
                        <div className="h-full w-full bg-green-500 transition-all duration-500"></div>
                      )}
                    </div>
                  )}

                  <div className="absolute inset-0 border-2 border-indigo-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              );
            })}
          </div>
        )}

        {timeline.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                {timeline.length}
              </div>
              <p className="text-sm text-gray-600">Total Lessons</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {completedLessons.length}
              </div>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                {timeline.length - completedLessons.length}
              </div>
              <p className="text-sm text-gray-600">Remaining</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}