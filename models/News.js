const mongoose = require("mongoose");
const slugify = require("slugify");

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      unique: true,
      maxLength: [200, "Name can not exceed more than 200 characters"],
    },
    slug: String,
    desc: {
      type: String,
      required: [true, "Please enter a description"],
    },
    imgUrl: {
      type: String,
      default: "no-photo.jpg",
    },
    videoUrl: {
      type: String,
      default: "no-video.mp4",
    },
    date: {
      type: String,
      default: Date.now(),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    category: {
      // Array of strings
      type: [String],
      required: true,
      enum: ["Travel", "Business", "Education", "Other"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Create NewsSchema slug from the title [pre before run]
NewsSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("News", NewsSchema);
