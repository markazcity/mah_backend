const path = require("path");
const News = require("../models/News");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { log } = require("console");

// @desc    Get all newses
// @route   GET /api/v1/newses
// @access  public

exports.getNewses = asyncHandler(async (req, res) => {
  const newses = await News.find();
  if (!newses) {
    return next(new ErrorResponse(`newses not found`, 404));
  }
  res.status(200).json({
    success: true,
    data: newses,
    count: newses.length,
  });
});

// @desc    Get single news
// @route   GET /api/v1/newses/:id
// @access  public

exports.getNews = asyncHandler(async (req, res, next) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    return next(
      new ErrorResponse(`news not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: news,
  });
});

// @desc    Create news
// @route   POST /api/v1/newses
// @access  private

exports.createNews = asyncHandler(async (req, res, next) => {
  const news = await News.create(req.body);
  console.log(req.files);
  res.status(201).json({
    success: true,
    data: news,
  });
});

// @desc    Update news
// @route   PUT /api/v1/newses/:id
// @access  private

exports.updateNews = asyncHandler(async (req, res, next) => {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!news) {
    return next(
      new ErrorResponse(`news not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: news,
  });
});

// @desc    Delete  news
// @route   DELETE /api/v1/newses/:id
// @access  private

exports.deleteNews = asyncHandler(async (req, res, next) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    return next(
      new ErrorResponse(`news not found with id of ${req.params.id}`, 404)
    );
  }
  news.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Upload photo for  news
// @route   PUT /api/v1/newss/:id/photo
// @access  private

exports.newsPhotoUpload = asyncHandler(async (req, res, next) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    return next(
      new ErrorResponse(`news not found with id of ${req.params.id}`, 404)
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
  file.name = `photo_${news._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.PHOTO_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await News.findByIdAndUpdate(req.params.id, { imgUrl: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

// @desc    Upload video for  bootcamp
// @route   PUT /api/v1/bootcamps/:id/video
// @access  private

exports.bootcampVideoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files.file;

  //example
  //   {
  //   name: 'VID_20220507_114151.mp4',
  //   data: <Buffer 00 00 00 18 66 74 79 70 6d 70 34 32 00 00 00 00 69 73 6f 6d 6d 70 34 32 00 00 09 4e 6d 6f 6f 76 00 00 00 6c 6d 76 68 64 00 00 00 00 de 9b be 2b de 9b ... 3151496 more bytes>,
  //   size: 3151546,
  //   encoding: '7bit',
  //   tempFilePath: '',
  //   truncated: false,
  //   mimetype: 'video/mp4',
  //   md5: '0ad65cbeb1583c79615763f5a373a3fe',
  //   mv: [Function: mv]
  // }

  // make sure the images is a photo
  if (!file.mimetype.startsWith("video")) {
    return next(new ErrorResponse(`Please upload a image file`, 400));
  }

  // // CHECK FILESIZE
  if (file.size > process.env.MAX_VIDEO_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload a image less than ${process.env.MAX_VIDEO_UPLOAD}`,
        400
      )
    );
  }

  // //create custome file name
  file.name = `video_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.VIDEO_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
