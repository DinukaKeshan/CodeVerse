const User = require('../models/user.model');

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: 'Instructor' }).select('displayName photoURL email');
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching instructors' });
  }
};
