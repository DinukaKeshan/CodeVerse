const TimelineItem = require('../models/timeline.model');

// @desc Add a timeline item to a course
// @route POST /timeline/:courseId
exports.addTimelineItem = async (req, res) => {
  const { title, videos, pdfs } = req.body;
  const { courseId } = req.params;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const item = new TimelineItem({
      course: courseId,
      title,
      videos: videos || [],
      pdfs: pdfs || []
    });

    await item.save();

    res.status(201).json({ message: 'Timeline item added', item });
  } catch (error) {
    console.error('Add Timeline Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all timeline items for a course
// @route GET /timeline/:courseId
exports.getCourseTimeline = async (req, res) => {
  const { courseId } = req.params;

  try {
    const timelineItems = await TimelineItem.find({ course: courseId });
    res.json(timelineItems);
  } catch (error) {
    console.error('Get Timeline Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
