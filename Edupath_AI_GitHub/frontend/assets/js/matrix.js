/**
 * Multi-Criteria Decision Matrix Interactive Weighting Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  const s1 = document.getElementById('slider-w1');
  const s2 = document.getElementById('slider-w2');
  const s3 = document.getElementById('slider-w3');
  const s4 = document.getElementById('slider-w4');

  const v1 = document.getElementById('val-w1');
  const v2 = document.getElementById('val-w2');
  const v3 = document.getElementById('val-w3');
  const v4 = document.getElementById('val-w4');

  const resetBtn = document.getElementById('resetWeightsBtn');

  function updateWeights() {
    const w1 = s1 ? parseInt(s1.value) || 25 : 25;
    const w2 = s2 ? parseInt(s2.value) || 25 : 25;
    const w3 = s3 ? parseInt(s3.value) || 25 : 25;
    const w4 = s4 ? parseInt(s4.value) || 25 : 25;

    if (v1) v1.innerText = `${w1}%`;
    if (v2) v2.innerText = `${w2}%`;
    if (v3) v3.innerText = `${w3}%`;
    if (v4) v4.innerText = `${w4}%`;

    if (window.EduPathAPI) {
      window.EduPathAPI.calculateMatrix({ lowDebt: w1, careerGrowth: w2, visaSecurity: w3, netRoi: w4 })
        .then(res => {
          if (res.success && res.data) {
            renderMatrixResults(res.data);
          }
        })
        .catch(err => {
          console.warn('Matrix calculation fallback', err);
          renderFallbackMatrix(w1, w2, w3, w4);
        });
    } else {
      renderFallbackMatrix(w1, w2, w3, w4);
    }
  }

  function renderMatrixResults(data) {
    data.forEach((item, index) => {
      const scoreElem = document.getElementById(`composite-score-${index + 1}`) || document.querySelectorAll('.font-extrabold.text-secondary')[index];
      if (scoreElem) {
        scoreElem.innerText = `${item.compositeScore}% Match`;
      }
    });
  }

  function renderFallbackMatrix(w1, w2, w3, w4) {
    const score1 = Math.min(99, Math.round((w1 * 0.85) + (w2 * 0.98) + (w3 * 0.90) + (w4 * 0.96)));
    const score2 = Math.min(99, Math.round((w1 * 0.96) + (w2 * 0.88) + (w3 * 0.85) + (w4 * 0.88)));
    const score3 = Math.min(99, Math.round((w1 * 0.80) + (w2 * 0.95) + (w3 * 0.91) + (w4 * 0.94)));

    const scores = [score1, score2, score3];
    const scoreElems = document.querySelectorAll('[id^="composite-score-"]');
    scoreElems.forEach((elem, idx) => {
      if (scores[idx] !== undefined) {
        elem.innerText = `${scores[idx]}% Match`;
      }
    });
  }

  [s1, s2, s3, s4].forEach(slider => {
    if (slider) slider.addEventListener('input', updateWeights);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (s1) s1.value = 25;
      if (s2) s2.value = 25;
      if (s3) s3.value = 25;
      if (s4) s4.value = 25;
      updateWeights();
    });
  }

  // Initial trigger
  updateWeights();
});
