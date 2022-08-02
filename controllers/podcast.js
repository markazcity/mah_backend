const path = require("path");
const Podcast = require("../models/Podcast");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { log } = require("console");

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
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files.file;

  // make sure the images is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload a image file`, 400));
  }

  // CHECK FILESIZE
  if (file.size > process.env.MAX_PHOTO_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload a image less than ${process.env.MAX_PHOTO_UPLOAD}`,
        400
      )
    );
  }

  //create custome file name
  file.name = `podcast_${podcast.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.PHOTO_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Podcast.findByIdAndUpdate(req.params.id, { imgUrl: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
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
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files.file;
  console.log(req.files.file);
  // make sure the images is a photo
  if (!file.mimetype.startsWith("audio")) {
    return next(new ErrorResponse(`Please upload a audio file`, 400));
  }

  // CHECK FILESIZE
  if (file.size > process.env.MAX_AUDIO_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload a audio less than ${process.env.MAX_AUDIO_UPLOAD}`,
        400
      )
    );
  }

  //create custome file name
  file.name = `audio_${podcast._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.AUDIO_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Podcast.findByIdAndUpdate(req.params.id, { audioUrl: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
