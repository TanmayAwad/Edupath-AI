/**
 * EduPath AI Frontend API Client Helper
 */
const API_BASE_URL = window.location.origin.includes('5000') ? '' : 'http://localhost:5000';

const EduPathAPI = {
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`);
      return await res.json();
    } catch (e) {
      console.warn('Backend API connection warning:', e);
      return { status: 'offline' };
    }
  },

  async getPathways(query = {}) {
    const params = new URLSearchParams(query).toString();
    const res = await fetch(`${API_BASE_URL}/api/pathways?${params}`);
    return await res.json();
  },

  async getInstitutions(query = {}) {
    const params = new URLSearchParams(query).toString();
    const res = await fetch(`${API_BASE_URL}/api/institutions?${params}`);
    return await res.json();
  },

  async getScholarships(query = {}) {
    const params = new URLSearchParams(query).toString();
    const res = await fetch(`${API_BASE_URL}/api/scholarships?${params}`);
    return await res.json();
  },

  async runSimulation(payload) {
    const res = await fetch(`${API_BASE_URL}/api/simulator/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  async calculateMatrix(weights) {
    const res = await fetch(`${API_BASE_URL}/api/matrix/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weights })
    });
    return await res.json();
  },

  async getProfile() {
    const res = await fetch(`${API_BASE_URL}/api/profile`);
    return await res.json();
  },

  async updateProfile(payload) {
    const res = await fetch(`${API_BASE_URL}/api/profile/calibrate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  }
};

window.EduPathAPI = EduPathAPI;
