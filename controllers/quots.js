const path = require("path");
const News = require("../models/News");
const Quots = require("../models/Quots");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all quotes
// @route   GET /api/v1/quotes
// @access  public

exports.getQuotes = asyncHandler(async (req, res) => {
  const quotes = await Quots.find();
  if (!quotes) {
    return next(new ErrorResponse(`quotes not found`, 404));
  }
  res.status(200).json({
    success: true,
    data: quotes,
    count: quotes.length,
  });
});

// @desc    Get single quotes
// @route   GET /api/v1/quotes/:id
// @access  public

exports.getQuote = asyncHandler(async (req, res, next) => {
  const quotes = await Quots.findById(req.params.id);
  if (!quotes) {
    return next(
      new ErrorResponse(`quotes not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: quotes,
  });
});

// @desc    Create quotes
// @route   POST /api/v1/quotes
// @access  private

exports.createQuotes = asyncHandler(async (req, res, next) => {
  const quotes = await Quots.create(req.body);
  res.status(201).json({
    success: true,
    data: quotes,
  });
});

// @desc    Update quotes
// @route   PUT /api/v1/quotes/:id
// @access  private

exports.updateQuotes = asyncHandler(async (req, res, next) => {
  const quotes = await Quots.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!quotes) {
    return next(
      new ErrorResponse(`quotes not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: quotes,
  });
});

// @desc    Delete  quotes
// @route   DELETE /api/v1/quotes/:id
// @access  private

exports.deletequotes = asyncHandler(async (req, res, next) => {
  const quotes = await Quots.findById(req.params.id);
  if (!quotes) {
    return next(
      new ErrorResponse(`quotes not found with id of ${req.params.id}`, 404)
    );
  }
  quotes.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
