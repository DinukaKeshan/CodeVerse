const Message = require('../models/message.model');

exports.sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  try {
    const message = new Message({ sender: req.user._id, receiver: receiverId, content });
    await message.save();
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

exports.getMessages = async (req, res) => {
  const { receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: receiverId },
        { sender: receiverId, receiver: req.user._id }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving messages' });
  }
};

// Get all students who sent messages to this instructor
exports.getStudentConversations = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    })
      .populate('sender', 'displayName email photoURL role')
      .populate('receiver', 'displayName email photoURL role');

    const studentUsers = {};
    messages.forEach((msg) => {
      const participant =
        msg.sender._id.toString() === req.user._id.toString()
          ? msg.receiver
          : msg.sender;

      if (participant.role === 'Student') {
        studentUsers[participant._id] = participant;
      }
    });

    res.json(Object.values(studentUsers));
  } catch (err) {
    console.error('Error fetching conversations:', err);
    res.status(500).json({ message: 'Error retrieving student messages' });
  }
};