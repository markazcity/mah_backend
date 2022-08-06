const mongoose = require("mongoose");
const QuotsSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      unique: true,
      required: [true, "Please enter the quotes"],
    },
    date: {
      type: String,
      default: Date.now(),
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    imgUrl: {
      type: String,
      default: "no-photo.jpg",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Quots", QuotsSchema);
