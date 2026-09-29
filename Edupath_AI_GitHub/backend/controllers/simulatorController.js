exports.runSimulation = (req, res) => {
  try {
    const { annualBudget, gpa, stream, targetRegion, tuitionInflation = 3 } = req.body;

    const budgetNum = Number(annualBudget) || 20000;
    const gpaNum = Number(gpa) || 3.5;

    // Simulation calculation engine
    let debtRisk = 'Low';
    let baseSalary = 85000;
    if (stream === 'cs' || stream === 'stem') baseSalary = 98000;
    if (stream === 'commerce') baseSalary = 105000;

    let matchScore = Math.min(99, Math.round(75 + (gpaNum * 5) + (budgetNum > 20000 ? 5 : 0)));

    if (budgetNum < 10000) {
      debtRisk = 'Moderate to High';
    } else if (budgetNum >= 25000) {
      debtRisk = 'Minimal / Zero';
    }

    const tenYrRoi = (baseSalary * 10 * 0.45) - (budgetNum * 4 * (1 + tuitionInflation / 100));

    res.status(200).json({
      success: true,
      simulation: {
        matchScore: `${matchScore}%`,
        tuitionDebtRisk: debtRisk,
        estimated10YrRoi: `$${Math.max(150000, Math.round(tenYrRoi)).toLocaleString()}+`,
        projectedStartingSalary: `$${baseSalary.toLocaleString()}`,
        financialFeasibility: budgetNum >= 15000 ? 'High' : 'Medium (Requires Scholarship)',
        simulatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
