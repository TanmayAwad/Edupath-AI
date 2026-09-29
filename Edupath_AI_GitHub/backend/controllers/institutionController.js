const institutionsData = require('../data/institutions.json');

exports.getAllInstitutions = (req, res) => {
  try {
    let results = [...institutionsData];
    const { region, search } = req.query;

    if (region && region !== 'all') {
      results = results.filter(inst => inst.region === region);
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(inst =>
        inst.name.toLowerCase().includes(q) ||
        inst.location.toLowerCase().includes(q)
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

exports.compareInstitutions = (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ success: false, message: 'Please provide an array of institution IDs to compare.' });
    }
    const compared = institutionsData.filter(inst => ids.includes(inst.id));
    res.status(200).json({ success: true, count: compared.length, data: compared });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
