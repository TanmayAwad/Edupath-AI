/**
 * EduPath AI Main Interactivity Engine & Prototype Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  // Highlight active navigation tab based on current window location
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('header nav a, header div a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('bg-primary-container', 'text-on-primary', 'font-bold');
      link.classList.remove('text-on-surface-variant');
    }
  });

  // Inject Global Pathway Roadmap Modal container if missing
  injectGlobalModalContainer();

  // Initialize Quick Start Intake Form on Homepage
  initQuickStartForm();

  // Initialize Dynamic Pathways Grid & Discipline Chips on Pathways Page
  initPathwaysPage();

  // Initialize Institutions Page Search & Filters
  initInstitutionsPage();

  // Initialize Scholarships Page Search & Filters
  initScholarshipsPage();

  // Check health endpoint
  if (window.EduPathAPI) {
    window.EduPathAPI.getHealth().then(data => {
      console.log('⚡ Connected to EduPath AI Backend API:', data);
    }).catch(err => console.log('Running client fallback mode'));
  }
});

// Helper: Inject global roadmap modal DOM into body
function injectGlobalModalContainer() {
  if (document.getElementById('pathwayModalContainer')) return;

  const modalHTML = `
    <div id="pathwayModalContainer" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md hidden transition-opacity duration-300">
      <div class="bg-surface-container-lowest border border-surface-container-high rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative">
        <button id="closePathwayModal" class="absolute top-4 right-4 p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors">
          <span class="material-symbols-outlined text-[24px]">close</span>
        </button>
        <div id="pathwayModalContent">
          <!-- Dynamic Content Loaded Here -->
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  document.getElementById('closePathwayModal').addEventListener('click', () => {
    window.hidePathwayModal();
  });

  document.getElementById('pathwayModalContainer').addEventListener('click', (e) => {
    if (e.target.id === 'pathwayModalContainer') window.hidePathwayModal();
  });
}

// Global modal open helper
window.showPathwayModal = function(pathway) {
  const container = document.getElementById('pathwayModalContainer');
  const content = document.getElementById('pathwayModalContent');
  if (!container || !content) return;

  const roadmapPhases = pathway.roadmap || [
    {
      phase: "Phase 1: Foundation (Years 1-2)",
      details: "Core STEM/Domain Math, Computer Science Fundamentals, Problem Solving.",
      milestone: "Build foundational project portfolio & complete 100+ algorithmic challenges."
    },
    {
      phase: "Phase 2: Specialization (Year 3)",
      details: "Applied Advanced Coursework, Machine Learning, Industry Tools.",
      milestone: "Secure competitive summer research internship."
    },
    {
      phase: "Phase 3: Industry Capstone (Year 4)",
      details: "Production Deployment, Thesis/Capstone Project, Portfolio Polish.",
      milestone: "Present capstone to corporate sponsors & secure return offer."
    },
    {
      phase: "Phase 4: Career Launch & Trajectory",
      details: `Target Roles: ${(pathway.careerRoles || []).join(', ')}. Est. Starting Salary: ${pathway.avgStartingSalary || '$95,000'}.`,
      milestone: `10-Year ROI: ${pathway.roi10Yr || '$350,000+'}`
    }
  ];

  content.innerHTML = `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-primary-fixed text-primary uppercase tracking-wider">${pathway.category || 'STEM'}</span>
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-secondary-fixed text-secondary">${pathway.matchScore || 95}% AI Match Score</span>
      </div>

      <h2 class="text-2xl md:text-3xl font-extrabold text-on-surface">${pathway.title}</h2>
      <p class="text-on-surface-variant font-body-md">${pathway.description || 'Comprehensive degree pathway designed for maximum ROI and long-term career growth.'}</p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-surface-container">
        <div class="flex flex-col">
          <span class="text-xs text-outline font-semibold">10-Yr Net ROI</span>
          <span class="text-lg font-bold text-secondary">${pathway.roi10Yr || '$380,000+'}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-outline font-semibold">Avg Starting Salary</span>
          <span class="text-lg font-bold text-on-surface">${pathway.avgStartingSalary || '$98,500'}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-outline font-semibold">Est. Cost / Year</span>
          <span class="text-lg font-bold text-primary">${pathway.estCostPerYear || '$18,500'}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-outline font-semibold">Tuition Debt Risk</span>
          <span class="text-lg font-bold text-secondary">${pathway.tuitionDebtRisk || 'Very Low'}</span>
        </div>
      </div>

      <div class="flex flex-col gap-3 pt-2">
        <h3 class="text-lg font-bold text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">route</span>
          Interactive 4-Phase Career Trajectory & Roadmap
        </h3>

        <div class="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-primary/20 pl-8">
          ${roadmapPhases.map((phase, idx) => `
            <div class="relative bg-surface-container-low p-4 rounded-xl border border-surface-container">
              <div class="absolute -left-10 top-4 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                ${idx + 1}
              </div>
              <h4 class="font-bold text-on-surface text-base">${phase.phase}</h4>
              <p class="text-sm text-on-surface-variant mt-1">${phase.details}</p>
              <div class="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-xs font-semibold text-primary">
                <span class="material-symbols-outlined text-[16px] text-secondary">verified</span>
                ${phase.milestone}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="bg-surface-container p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
        <div class="flex flex-col">
          <span class="text-xs font-bold text-secondary uppercase">Contingency Fallback Option</span>
          <span class="text-sm font-bold text-on-surface">${pathway.contingencyFallback || 'Computational Biology B.Sc.'}</span>
        </div>
        <button onclick="alert('Contingency path activated! Simulating dual fallback application strategy.')" class="px-4 py-2 rounded-lg bg-primary-container text-on-primary text-xs font-bold hover:bg-primary transition-colors">
          Activate Fallback Plan
        </button>
      </div>
    </div>
  `;

  container.classList.remove('hidden');
};

window.hidePathwayModal = function() {
  const container = document.getElementById('pathwayModalContainer');
  if (container) container.classList.add('hidden');
};

// 1. Quick Start Form Handler
function initQuickStartForm() {
  const quickStartForm = document.getElementById('quickStartForm');
  if (!quickStartForm) return;

  quickStartForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const streamSelect = quickStartForm.querySelector('select:nth-of-type(1)') || document.querySelector('select');
    const selectedStream = streamSelect ? streamSelect.value : 'cs';

    const resultsCard = document.getElementById('quickResultsCard');
    if (resultsCard) {
      resultsCard.classList.remove('hidden');

      if (window.EduPathAPI) {
        try {
          const res = await window.EduPathAPI.getPathways({ stream: selectedStream });
          if (res.success && res.data && res.data.length > 0) {
            updateQuickResultsCard(res.data[0]);
          }
        } catch (err) {
          console.warn('Using client fallback for results card', err);
        }
      }

      resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function updateQuickResultsCard(pathway) {
  const resultsCard = document.getElementById('quickResultsCard');
  if (!resultsCard) return;

  const titleElem = resultsCard.querySelector('h3') || resultsCard.querySelector('.font-title-md');
  if (titleElem) titleElem.innerText = pathway.title;

  const scoreElem = resultsCard.querySelector('.text-secondary');
  if (scoreElem) scoreElem.innerText = `${pathway.matchScore || 96}% Match`;

  const btn = resultsCard.querySelector('button');
  if (btn) {
    btn.onclick = () => window.showPathwayModal(pathway);
  }
}

// 2. Dynamic Pathways Page & Stream Chips
function initPathwaysPage() {
  // Bind click handlers to all buttons across pathways page
  const allBtns = document.querySelectorAll('main button');
  allBtns.forEach(btn => {
    const text = btn.innerText.toLowerCase();
    if (text.includes('explore') || text.includes('view') || text.includes('details') || text.includes('roadmap')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Sample pathway depending on button context
        const samplePathway = {
          title: "AI & Data Science B.S.",
          category: "STEM / Computer Science",
          matchScore: 96,
          durationYears: 4,
          estCostPerYear: "$18,500",
          tuitionDebtRisk: "Very Low",
          roi10Yr: "$380,000+",
          avgStartingSalary: "$98,500",
          description: "High-demand undergraduate degree focusing on machine learning, deep learning, statistical modelling, and big data engineering.",
          careerRoles: ["AI Engineer", "Data Scientist", "ML Ops Specialist", "Quantitative Analyst"],
          contingencyFallback: "Computational Bio B.Sc.",
          roadmap: [
            {
              phase: "Phase 1: Foundation (Years 1-2)",
              details: "Calculus, Linear Algebra, Python Data Structures, Object-Oriented Programming, Discrete Math.",
              milestone: "Build 3 open-source Python Machine Learning projects & solve 150+ LeetCode problems."
            },
            {
              phase: "Phase 2: Specialization & Internships (Year 3)",
              details: "Neural Networks, Deep Learning (PyTorch), Cloud Data Engineering (AWS/GCP), Applied NLP.",
              milestone: "Secure Summer AI Research Internship at top tech lab or Fortune 500 tech firm."
            },
            {
              phase: "Phase 3: Advanced Industry Capstone (Year 4)",
              details: "Large Language Models, Distributed MLOps, Computer Vision, Ethics in AI & Capstone Thesis.",
              milestone: "Deploy production-grade LLM application; present capstone to corporate sponsors."
            },
            {
              phase: "Phase 4: Career & Salary Trajectory",
              details: "Entry Salary: $95k - $125k | Senior ML Lead at 5-Yr: $180k+ | 10-Yr Net ROI: $380,000+.",
              milestone: "Target Roles: ML Engineer, Data Scientist, AI Product Manager, Quant Researcher."
            }
          ]
        };

        window.showPathwayModal(samplePathway);
      });
    }
  });

  // Discipline Filter Chips
  const disciplineChips = document.querySelectorAll('button:has(+ button), button.rounded-full');
  disciplineChips.forEach(chip => {
    chip.addEventListener('click', async () => {
      disciplineChips.forEach(c => {
        c.classList.remove('bg-primary-container', 'text-on-primary');
        c.classList.add('bg-surface-container', 'text-on-surface');
      });
      chip.classList.add('bg-primary-container', 'text-on-primary');
      chip.classList.remove('bg-surface-container', 'text-on-surface');

      const streamMap = {
        'all': '',
        'it': 'cs',
        'engineering': 'stem',
        'medical': 'biotech',
        'commerce': 'commerce',
        'design': 'humanities'
      };

      const chipText = chip.innerText.toLowerCase();
      let matchedStream = '';
      for (const [k, v] of Object.entries(streamMap)) {
        if (chipText.includes(k)) matchedStream = v;
      }

      if (window.EduPathAPI) {
        try {
          const res = await window.EduPathAPI.getPathways({ stream: matchedStream });
          if (res.success && res.data && res.data.length > 0) {
            console.log('Filtered pathways by stream:', res.data);
          }
        } catch (err) {
          console.warn('Stream filter error', err);
        }
      }
    });
  });
}

// 3. Dynamic Institutions Page
function initInstitutionsPage() {
  if (!window.location.pathname.includes('institutions.html')) return;

  const searchInput = document.querySelector('input[placeholder*="Search"]');
  if (searchInput && window.EduPathAPI) {
    searchInput.addEventListener('input', debounce(async () => {
      try {
        const res = await window.EduPathAPI.getInstitutions({ search: searchInput.value });
        console.log('Filtered institutions:', res.data);
      } catch (err) {
        console.warn('Error filtering institutions', err);
      }
    }, 300));
  }
}

// 4. Dynamic Scholarships Page
function initScholarshipsPage() {
  if (!window.location.pathname.includes('scholarships.html')) return;

  const applyBtns = document.querySelectorAll('button');
  applyBtns.forEach(btn => {
    if (btn.innerText.toLowerCase().includes('apply') || btn.innerText.toLowerCase().includes('check')) {
      btn.onclick = () => {
        alert('🎉 Scholarship Eligibility Verified! Redirecting to scholarship application form.');
      };
    }
  });
}

// Utility debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
