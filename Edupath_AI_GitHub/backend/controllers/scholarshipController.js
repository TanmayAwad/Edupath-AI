const scholarshipsData = require('../data/scholarships.json');

exports.getAllScholarships = (req, res) => {
  try {
    let results = [...scholarshipsData];
    const { type, region, search } = req.query;

    if (type) {
      results = results.filter(s => s.type.toLowerCase().includes(type.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.eligibility.toLowerCase().includes(q)
      );
    }

    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
