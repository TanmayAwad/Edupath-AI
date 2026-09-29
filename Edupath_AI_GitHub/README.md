# 🎓 EduPath AI — AI-Powered Student Education, Career & Decision Support Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.19-lightgrey.svg)](https://expressjs.com/)

**EduPath AI** (also known as **HorizonAI**) is a next-generation academic decision support platform. It empowers students to evaluate degree options, forecast 10-year net ROIs, stress-test financial & academic scenarios with Monte Carlo simulations, and navigate personalized multi-phase career execution roadmaps with complete algorithmic transparency.

---

## 🚀 Key Features

* **🎓 Interactive 4-Phase Career Trajectory Roadmaps**: Step-by-step degree milestone execution plans (Foundations, Specialization, Capstone, Career Launch & Salary Projections).
* **🎲 What-If Monte Carlo Scenario Simulator**: Stress-test academic plans against unexpected tuition inflation, budget cuts, or GPA changes.
* **⚖️ Multi-Criteria Decision Matrix**: Live weighted optimization across Financial Debt Risk, Career Salary Growth, Visa/PR Security, and Institution Prestige.
* **🏫 Institution & Scholarship Engine**: Search and compare 500+ verified global universities and funding grants.
* **🎥 Career Video Learning Hub**: Curated video insights and mentorship guides.

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js, REST API, Modular JSON Data Layer.
* **Frontend**: HTML5, Vanilla JavaScript (ES6+), Tailwind CSS, Material Symbols Icons.
* **Architecture**: Single-Port Unified Express Static & API Architecture.

---

## ⚡ Quick Start

### 1. Installation
```bash
# Clone repository
git clone https://github.com/your-username/edupath-ai.git

# Navigate to project directory
cd edupath-ai

# Install dependencies
npm install
```

### 2. Launch Development Server
```bash
npm start
```

Open your browser at **[http://localhost:5000](http://localhost:5000)**.

---

## 📁 Repository Structure

```
edupath-ai/
├── backend/
│   ├── controllers/      # Express API Controllers (pathway, matrix, simulator, etc.)
│   ├── data/             # JSON Datasets (pathways, institutions, scholarships, videos)
│   ├── routes/           # Express REST API Route definitions
│   └── server.js         # Express Application Entry Point
├── frontend/
│   ├── assets/js/        # Client JS (api.js, main.js, matrix.js, simulator.js)
│   ├── index.html        # Main Landing Page & Live Decision Engine
│   ├── pathways.html     # Academic Pathways Hub
│   ├── simulator.html    # What-If Monte Carlo Scenario Simulator
│   ├── decision-matrix.html # Multidimensional Decision Matrix
│   ├── institutions.html # Institution Comparison & Rankings
│   └── scholarships.html # Funding & Grant Finder
├── Edupath_AI/           # Stitch UI Design Component Templates
├── package.json          # Node.js project manifest
└── README.md             # Project documentation
```

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).
