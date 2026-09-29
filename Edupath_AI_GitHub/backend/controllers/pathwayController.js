const pathwaysData = require('../data/pathways.json');

exports.getAllPathways = (req, res) => {
  try {
    let results = [...pathwaysData];
    const { stream, maxBudget, search } = req.query;

    if (stream) {
      results = results.filter(p => p.stream === stream || stream === 'all');
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPathwayById = (req, res) => {
  try {
    const pathway = pathwaysData.find(p => p.id === req.params.id);
    if (!pathway) {
      return res.status(404).json({ success: false, message: 'Pathway not found' });
    }
    res.status(200).json({ success: true, data: pathway });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
