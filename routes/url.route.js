const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url.controller");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.post("/anal/:shortId", handleGetAnalytics);

module.exports = router;
