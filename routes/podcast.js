const express = require("express");
const Podcast = require("../models/Podcast");
const { protect } = require("../middleware/auth");

const {
  getPodcast,
  getPodcasts,
  createPodcast,
  deletePodcast,
  updatePodcast,
  podcastPhotoUpload,
  podcastAudioUpload,
} = require("../controllers/podcast");

const router = express.Router();

router.route("/").get(getPodcasts).post(protect, createPodcast);
router
  .route("/:id")
  .get(getPodcast)
  .put(protect, updatePodcast)
  .delete(protect, deletePodcast);
router.route("/:id/photo").put(protect, podcastPhotoUpload);
router.route("/:id/audio").put(protect, podcastAudioUpload);

module.exports = router;
