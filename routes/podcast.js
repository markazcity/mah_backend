const express = require("express");
const Podcast = require("../models/Podcast");
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

router.route("/").get(getPodcasts).post(createPodcast);
router.route("/:id").get(getPodcast).put(updatePodcast).delete(deletePodcast);
router.route("/:id/photo").put(podcastPhotoUpload);
router.route("/:id/audio").put(podcastAudioUpload);

module.exports = router;
