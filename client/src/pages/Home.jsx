import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaCertificate, FaChartLine, FaStar, FaQuoteLeft, FaArrowRight, FaPlayCircle, FaClock, FaUserGraduate } from 'react-icons/fa';

export default function Home() {
  const featuredCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 12500,
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      duration: "40 hours",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      instructor: "Dr. Michael Chen",
      rating: 4.9,
      students: 8900,
      price: "$99.99",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      duration: "52 hours",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      instructor: "Emily Rodriguez",
      rating: 4.7,
      students: 15200,
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      duration: "35 hours",
      level: "All Levels"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Software Developer",
      company: "Tech Corp",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      content: "This platform transformed my career. The courses are well-structured and the mentorship program is invaluable.",
      rating: 5
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Marketing Manager",
      company: "Creative Agency",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      content: "I learned practical skills that I could immediately apply to my job. The instructors are top-notch!",
      rating: 5
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Students" },
    { number: "1,200+", label: "Expert Instructors" },
    { number: "3,500+", label: "Courses Available" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-5 rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Unlock Your Potential with 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"> Expert Learning</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Join thousands of learners advancing their careers with our comprehensive courses and personalized mentorship programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/courses" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
                >
                  Explore Courses
                  <FaArrowRight className="ml-2" />
                </Link>
                <button className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
                  <FaPlayCircle className="mr-2" size={20} />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" 
                alt="Students learning" 
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FaBook className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Expert-Led Courses</h3>
              <p className="text-gray-600">
                Learn from industry professionals with real-world experience and proven track records.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <FaUsers className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">1-on-1 Mentorship</h3>
              <p className="text-gray-600">
                Get personalized guidance from mentors who are invested in your success.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <FaCertificate className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Verified Certificates</h3>
              <p className="text-gray-600">
                Earn industry-recognized certificates to showcase your new skills to employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Featured Courses
              </h2>
              <p className="text-lg text-gray-600">
                Hand-picked courses to accelerate your learning
              </p>
            </div>
            <Link 
              to="/courses" 
              className="hidden md:inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Courses
              <FaArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">by {course.instructor}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaClock size={14} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUserGraduate size={14} />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" size={16} />
                      <span className="font-semibold text-gray-700">{course.rating}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-800">{course.price}</span>
                  </div>

                  <Link 
                    to={`/course/${course.id}`}
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link 
              to="/courses" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Courses
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied learners
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg">
                <FaQuoteLeft className="text-blue-600 mb-4" size={24} />
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" size={16} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join our community of learners and unlock your full potential
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
            >
              Get Started Free
              <FaArrowRight className="ml-2" />
            </Link>
            <Link 
              to="/mentor" 
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Find a Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}