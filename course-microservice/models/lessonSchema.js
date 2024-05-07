const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  chapterNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Lesseon = mongoose.model("course", lessonSchema);

module.exports = Lesseon;
