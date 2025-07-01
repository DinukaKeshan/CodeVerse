const Course = require('../models/course.model');
const User = require('../models/user.model'); // Make sure this is imported

// @desc Create a new course
// @route POST /courses
exports.createCourse = async (req, res) => {
  const { title, bannerUrl } = req.body;

  if (!title || !bannerUrl) {
    return res.status(400).json({ message: 'Title and bannerUrl are required' });
  }

  try {
    const course = new Course({
      title,
      bannerUrl,
      instructor: req.user._id
    });

    await course.save();

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error('Create Course Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all courses created by logged-in instructor
// @route GET /courses/my-courses
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.json(courses);
  } catch (error) {
    console.error('Fetch Courses Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Enroll student in a course
// @route POST /courses/:courseId/enroll
exports.enrollInCourse = async (req, res) => {
  const user = req.user;
  const { courseId } = req.params;

  if (user.role !== 'Student') {
    return res.status(403).json({ message: 'Only students can enroll in courses' });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (err) {
    console.error('Enroll Error:', err);
    res.status(500).json({ message: 'Enrollment failed' });
  }
};

// @desc Get courses the student enrolled in
// @route GET /courses/enrolled
exports.getEnrolledCourses = async (req, res) => {
  try {
    const student = await User.findById(req.user._id).populate('enrolledCourses');
    res.json(student.enrolledCourses);
  } catch (err) {
    console.error('Get Enrolled Courses Error:', err);
    res.status(500).json({ message: 'Failed to load enrolled courses' });
  }
};
