let mockProfileStore = {
  candidateId: "Candidate #812",
  status: "Calibrated",
  confidence: "99.2%",
  academicStream: "STEM / Computer Science",
  annualBudget: 22000,
  preferredRegion: "USA & Canada",
  gpa: 3.8,
  calibratedAt: new Date().toISOString()
};

exports.getProfile = (req, res) => {
  res.status(200).json({ success: true, profile: mockProfileStore });
};

exports.updateProfile = (req, res) => {
  try {
    mockProfileStore = {
      ...mockProfileStore,
      ...req.body,
      calibratedAt: new Date().toISOString()
    };
    res.status(200).json({ success: true, message: "Profile successfully updated and recalibrated", profile: mockProfileStore });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
