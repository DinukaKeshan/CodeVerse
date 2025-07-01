const mongoose = require("mongoose");

const timelineItemSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    videos: [
      {
        type: String,
      },
    ],
    pdfs: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TimelineItem", timelineItemSchema);
