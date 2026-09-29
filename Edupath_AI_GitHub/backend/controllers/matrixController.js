exports.calculateMatrix = (req, res) => {
  try {
    const { weights } = req.body;
    // default weights if none passed
    const w = weights || {
      lowDebt: 25,
      careerGrowth: 25,
      visaSecurity: 25,
      netRoi: 25
    };

    // Calculate score breakdown for pathways based on user custom weights
    const calculatedOptions = [
      {
        pathway: 'AI & Data Science B.S.',
        institution: 'Stanford University',
        compositeScore: Math.round((w.lowDebt * 0.85) + (w.careerGrowth * 0.98) + (w.visaSecurity * 0.90) + (w.netRoi * 0.96)),
        financialDebtIndex: '88/100',
        visaProbability: '92%',
        roiScore: '96/100'
      },
      {
        pathway: 'Computational Biology B.Sc.',
        institution: 'ETH Zurich',
        compositeScore: Math.round((w.lowDebt * 0.96) + (w.careerGrowth * 0.88) + (w.visaSecurity * 0.85) + (w.netRoi * 0.88)),
        financialDebtIndex: '95/100',
        visaProbability: '88%',
        roiScore: '89/100'
      },
      {
        pathway: 'FinTech & Quant Analytics M.S.',
        institution: 'NUS Singapore',
        compositeScore: Math.round((w.lowDebt * 0.80) + (w.careerGrowth * 0.95) + (w.visaSecurity * 0.91) + (w.netRoi * 0.94)),
        financialDebtIndex: '82/100',
        visaProbability: '90%',
        roiScore: '94/100'
      }
    ];

    res.status(200).json({
      success: true,
      data: calculatedOptions,
      normalizedWeights: w
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
