const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  photoURL: { type: String },
  role: { type: String, enum: ['Student', 'Instructor'], default: null },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
