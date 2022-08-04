const path = require("path");
const Podcast = require("../models/Podcast");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//s3
require("dotenv").config();
const upload = require("../utils/s3");
const singleUpload = upload.single("image");
const UploadAudio = upload.single("audio");

// @desc    Get all podcast
// @route   GET /api/v1/podcast
// @access  public

exports.getPodcasts = asyncHandler(async (req, res) => {
  const podcast = await Podcast.find();
  if (!podcast) {
    return next(new ErrorResponse(`podcast not found`, 404));
  }
  res.status(200).json({
    success: true,
    data: podcast,
    count: podcast.length,
  });
});

// @desc    Get single podcast
// @route   GET /api/v1/podcast/:id
// @access  public

exports.getPodcast = asyncHandler(async (req, res, next) => {
  const podcast = await Podcast.findById(req.params.id);
  if (!podcast) {
    return next(
      new ErrorResponse(`podcast not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: podcast,
  });
});

// @desc    Create podcast
// @route   POST /api/v1/podcast
// @access  private

exports.createPodcast = asyncHandler(async (req, res, next) => {
  const podcast = await Podcast.create(req.body);
  res.status(201).json({
    success: true,
    data: podcast,
  });
});

// @desc    Update podcast
// @route   PUT /api/v1/podcast/:id
// @access  private

exports.updatePodcast = asyncHandler(async (req, res, next) => {
  const podcast = await Podcast.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!podcast) {
    return next(
      new ErrorResponse(`podcast not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: podcast,
  });
});

// @desc    Delete  podcast
// @route   DELETE /api/v1/podcast/:id
// @access  private

exports.deletePodcast = asyncHandler(async (req, res, next) => {
  const podcast = await Podcast.findById(req.params.id);
  if (!podcast) {
    return next(
      new ErrorResponse(`podcast not found with id of ${req.params.id}`, 404)
    );
  }
  podcast.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Upload photo for  podcast
// @route   PUT /api/v1/podcasts/:id/photo
// @access  private

exports.podcastPhotoUpload = asyncHandler(async (req, res, next) => {
  const podcast = await Podcast.findById(req.params.id);
  if (!podcast) {
    return next(
      new ErrorResponse(`podcast not found with id of ${req.params.id}`, 404)
    );
  }
  singleUpload(req, res, async function (err) {
    if (!req.file) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }

    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
    let update = { imgUrl: req.file.location };

    await Podcast.findByIdAndUpdate(req.params.id, update, { new: true })
      .then((podcast) =>
        res.status(200).json({ success: true, podcast: podcast })
      )
      .catch((err) => res.status(400).json({ success: false, error: err }));
  });
});

// @desc    Upload audio for  podcast
// @route   PUT /api/v1/podcasts/:id/audio
// @access  private

exports.podcastAudioUpload = asyncHandler(async (req, res, next) => {
  const podcast = await Podcast.findById(req.params.id);
  if (!podcast) {
    return next(
      new ErrorResponse(`podcast not found with id of ${req.params.id}`, 404)
    );
  }

  UploadAudio(req, res, async function (err) {
    if (!req.file) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }

    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "audio Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
    let update = { audioUrl: req.file.location };

    await Podcast.findByIdAndUpdate(req.params.id, update, { new: true })
      .then((podcast) =>
        res.status(200).json({ success: true, podcast: podcast })
      )
      .catch((err) => res.status(400).json({ success: false, error: err }));
  });
});
