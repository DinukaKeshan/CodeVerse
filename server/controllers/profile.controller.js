const User = require('../models/user.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware export for routes
exports.uploadMiddleware = upload.single('photo');

// Profile update controller
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update fields
    if (req.body.displayName) user.displayName = req.body.displayName;
    if (req.body.email) user.email = req.body.email; // optional, but careful about email update logic

    // Handle file upload
    if (req.file) {
      const photoURL = `/uploads/${req.file.filename}`;
      user.photoURL = photoURL;
    }

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get profile remains same
exports.getProfile = (req, res) => {
  res.json(req.user);
};
