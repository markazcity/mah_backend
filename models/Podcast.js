const mongoose = require("mongoose");
const AudioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Please enter the title"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    audioUrl: {
      type: String,
      default: "no-audio.mp3",
    },
    imgUrl: {
      type: String,
      default: "no-photo.jpg",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Audio", AudioSchema);
