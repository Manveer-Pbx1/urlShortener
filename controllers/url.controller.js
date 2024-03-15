const shortid = require("shortid");
const URL = require("../models/url.model");

async function handleGenerateNewShortURL(req, res) {
  console.log(req.body);
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy:  req.user._id
  });
  return res.json({ id: shortID });
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId});
    return res.json({totalClicks: entry.visitHistory.length, analytics: entry.visitHistory})
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}