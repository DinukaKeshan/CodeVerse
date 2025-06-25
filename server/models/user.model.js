const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  photoURL: { type: String },
  role: { type: String, enum: ['Student', 'Instructor'], default: null }
});

module.exports = mongoose.model("User", userSchema);
