const videosData = require('../data/videos.json');

exports.getAllVideos = (req, res) => {
  try {
    res.status(200).json({ success: true, count: videosData.length, data: videosData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
