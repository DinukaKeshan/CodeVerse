const Course = require('../models/course.model');

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
