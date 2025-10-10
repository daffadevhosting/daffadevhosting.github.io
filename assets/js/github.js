// assets/js/github.js
class GitHubAPI {
  constructor(baseURL = null) {
    this.baseURL = baseURL || 'https://github-api.sendaljepit.workers.dev';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  async #fetchWithCache(endpoint, cacheKey) {
    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Cache the response
      this.cache.set(cacheKey, {
        data: data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  }

  async getPinnedRepos(username = 'daffadevhosting') {
    const cacheKey = `pinned-${username}`;
    const endpoint = `${this.baseURL}/api/pinned?username=${username}`;
    
    return await this.#fetchWithCache(endpoint, cacheKey);
  }

  async getUserRepos(options = {}) {
    const params = new URLSearchParams({
      username: options.username || 'daffadevhosting',
      per_page: options.per_page || '6',
      page: options.page || '1',
      sort: options.sort || 'updated'
    });

    const cacheKey = `repos-${params.toString()}`;
    const endpoint = `${this.baseURL}/api/repos?${params}`;
    
    return await this.#fetchWithCache(endpoint, cacheKey);
  }

  async searchRepos(query, username = 'daffadevhosting') {
    if (!query || query.trim() === '') {
      return { success: true, data: [], total_count: 0 };
    }

    const cacheKey = `search-${query}-${username}`;
    const endpoint = `${this.baseURL}/api/search?q=${encodeURIComponent(query)}&username=${username}`;
    
    return await this.#fetchWithCache(endpoint, cacheKey);
  }

  async getRepoDetails(repoName) {
    const cacheKey = `repo-${repoName}`;
    const endpoint = `${this.baseURL}/api/repo/${repoName}`;
    
    return await this.#fetchWithCache(endpoint, cacheKey);
  }

  async getUserProfile() {
    const cacheKey = 'profile';
    const endpoint = `${this.baseURL}/api/profile`;
    
    return await this.#fetchWithCache(endpoint, cacheKey);
  }

  clearCache() {
    this.cache.clear();
  }
}

// Global instance
const githubAPI = new GitHubAPI();

// Utility functions
function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3776ab',
    'Java': '#ed8b00',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'Vue': '#41b883',
    'React': '#61dafb',
    'PHP': '#777bb4',
    'Ruby': '#cc342d',
    'Go': '#00add8',
    'Rust': '#dea584',
    'C++': '#00599c',
    'C#': '#239120',
    'Shell': '#89e051',
    'Dart': '#00b4ab'
  };
  
  return colors[language] || '#6b7280';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

function createRepoCard(repo) {
  const languageColor = getLanguageColor(repo.language);
  const isPinned = repo.is_pinned;
  
  return `
    <div class="project-card group glowing-border rounded-xl overflow-hidden backdrop-blur-sm bg-[#111827]/50 shadow-lg h-full flex flex-col relative">
      ${isPinned ? `
        <div class="absolute top-3 right-3 text-yellow-400" title="Pinned Repository">
          <i class="fas fa-thumbtack"></i>
        </div>
      ` : ''}
      
      <div class="p-6 flex-1">
        <div class="flex items-start mb-4">
          <div class="w-12 h-12 rounded-md bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
            <i class="fab fa-github text-white"></i>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="text-xl font-bold text-white truncate" title="${repo.name}">${repo.name}</h3>
            <p class="text-slate-400 text-sm mt-1">Updated ${formatDate(repo.updated_at)}</p>
          </div>
        </div>
        
        <p class="text-slate-300 mb-4 line-clamp-2">${repo.description || 'No description available'}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          ${repo.language ? `
            <span class="px-2 py-1 bg-slate-700/80 text-xs rounded flex items-center">
              <span class="w-2 h-2 rounded-full mr-1" style="background-color: ${languageColor}"></span>
              ${repo.language}
            </span>
          ` : ''}
          
          <span class="px-2 py-1 bg-slate-700/80 text-yellow-300 text-xs rounded flex items-center">
            <i class="fas fa-star mr-1"></i> ${repo.stargazers_count}
          </span>
          
          <span class="px-2 py-1 bg-slate-700/80 text-green-300 text-xs rounded flex items-center">
            <i class="fas fa-code-branch mr-1"></i> ${repo.forks_count}
          </span>
          
          ${repo.topics.slice(0, 2).map(topic => `
            <span class="px-2 py-1 bg-slate-700/80 text-purple-300 text-xs rounded truncate max-w-20" title="${topic}">${topic}</span>
          `).join('')}
        </div>
      </div>
      
      <div class="px-6 pb-4 pt-2 border-t border-slate-700/50">
        <a href="${repo.html_url}" target="_blank" class="text-blue-400 hover:text-blue-300 font-semibold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
          Explore Project <i class="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  `;
}

// Load pinned projects
async function loadPinnedProjects() {
  const projectsContainer = document.querySelector('.grid.grid-cols-1');
  
  if (!projectsContainer) return;

  try {
    // Show loading state
    projectsContainer.innerHTML = `
      <div class="col-span-3 text-center py-12">
        <div class="inline-flex items-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mr-3"></div>
          <span class="text-white">Loading pinned repositories...</span>
        </div>
      </div>
    `;

    const result = await githubAPI.getPinnedRepos();
    
    if (result.success && result.data.length > 0) {
      // Update section title to show these are pinned repos
      const sectionTitle = document.querySelector('.text-center.mb-12 h2');
      const sectionDesc = document.querySelector('.text-center.mb-12 p');
      
      if (sectionTitle) {
        sectionTitle.innerHTML = `Pinned Projects <span class="text-yellow-400 text-xl ml-2"><i class="fas fa-thumbtack"></i></span>`;
      }
      
      if (sectionDesc) {
        sectionDesc.textContent = 'Featured repositories from my GitHub profile';
      }
      
      projectsContainer.innerHTML = result.data.map(repo => createRepoCard(repo)).join('');
      
      // Add source indicator
      const sourceIndicator = document.createElement('div');
      sourceIndicator.className = 'text-center mt-6 text-slate-500 text-sm';
      sourceIndicator.innerHTML = `Source: ${result.source === 'graphql' ? 'GitHub Pinned Repositories' : 'Latest Updated Repositories'}`;
      projectsContainer.parentElement.appendChild(sourceIndicator);
      
    } else {
      projectsContainer.innerHTML = `
        <div class="col-span-3 text-center py-12">
          <i class="fas fa-thumbtack text-4xl text-slate-500 mb-4"></i>
          <h3 class="text-xl font-bold text-white mb-2">No pinned repositories</h3>
          <p class="text-slate-400">Check back later for featured projects</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading pinned projects:', error);
    projectsContainer.innerHTML = `
      <div class="col-span-3 text-center py-12">
        <i class="fas fa-wifi text-4xl text-red-500 mb-4"></i>
        <h3 class="text-xl font-bold text-white mb-2">Failed to load projects</h3>
        <p class="text-slate-400">Please check your connection and try again</p>
      </div>
    `;
  }
}

// Search functionality (tetap sama)
function initializeSearch() {
  const searchInput = document.querySelector('input[type="text"]');
  const searchButton = document.querySelector('.search-container button');
  const quickSearchButtons = document.querySelectorAll('.search-container .bg-gray-700');

  if (!searchInput) return;

  // Quick search buttons
  quickSearchButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const searchTerm = button.textContent.trim();
      if (searchInput) {
        searchInput.value = searchTerm;
      }
      await performSearch(searchTerm);
    });
  });

  // Main search button
  if (searchButton) {
    searchButton.addEventListener('click', async () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        await performSearch(searchTerm);
      }
    });
  }

  // Enter key support
  searchInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        await performSearch(searchTerm);
      }
    }
  });
}

// fungsi untuk trending
async function loadTrendingRepos() {
  try {
    const result = await githubAPI.getTrendingRepos({ limit: 5, sort: 'stars' });
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error loading trending repos:', error);
  }
  return [];
}

// Update quick search buttons di search container
function updateQuickSearchButtons() {
  const quickSearchContainer = document.querySelector('.search-container .flex.space-x-3');
  if (quickSearchContainer) {
    quickSearchContainer.innerHTML = `
      <button class="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition quick-search" data-query="Tailwind Animation">
        Tailwind Animation
      </button>
      <button class="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 transition quick-search" data-query="AI Chatbot">
        AI Chatbot
      </button>
      <button class="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 transition quick-search" data-query="trending">
        Trending
      </button>
      <button class="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition" id="ask-ai-button">
        <i class="fas fa-robot mr-2"></i>Ask AI
      </button>
    `;

    // Add event listeners
    document.querySelectorAll('.quick-search').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const query = e.target.dataset.query;
        document.querySelector('input[type="text"]').value = query;
        performSearch(query);
      });
    });

    document.getElementById('ask-ai-button').addEventListener('click', () => {
      // Trigger AI chat
      document.getElementById('ai-chat-toggle').click();
    });
  }
}

// Update initialization
document.addEventListener('DOMContentLoaded', function() {
  initializeSearch();
  loadPinnedProjects();
  updateQuickSearchButtons();
});

async function performSearch(query) {
  const searchContainer = document.querySelector('.search-container');
  const projectsSection = document.querySelector('.grid.grid-cols-1');
  
  if (!projectsSection) return;

  // Show loading state
  searchContainer.classList.add('searching');
  
  try {
    const result = await githubAPI.searchRepos(query);
    
    if (result.success && result.data.length > 0) {
      // Update projects section with search results
      projectsSection.innerHTML = result.data.map(repo => createRepoCard(repo)).join('');
      
      // Add search results header
      const existingHeader = projectsSection.previousElementSibling;
      if (existingHeader && existingHeader.id !== 'search-results-header') {
        const header = document.createElement('div');
        header.id = 'search-results-header';
        header.className = 'text-center mb-8';
        header.innerHTML = `
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">
            Search Results for "${query}"
          </h2>
          <p class="text-slate-400">Found ${result.total_count} repositories</p>
          <button id="clearSearch" class="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition-colors">
            <i class="fas fa-times mr-2"></i>Clear Search
          </button>
        `;
        
        projectsSection.parentElement.insertBefore(header, projectsSection);
        
        // Clear search handler
        document.getElementById('clearSearch').addEventListener('click', () => {
          location.reload();
        });
      }
    } else {
      projectsSection.innerHTML = `
        <div class="col-span-3 text-center py-12">
          <i class="fas fa-search text-4xl text-slate-500 mb-4"></i>
          <h3 class="text-xl font-bold text-white mb-2">No repositories found</h3>
          <p class="text-slate-400">Try a different search term</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Search error:', error);
    projectsSection.innerHTML = `
      <div class="col-span-3 text-center py-12">
        <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
        <h3 class="text-xl font-bold text-white mb-2">Search failed</h3>
        <p class="text-slate-400">Please try again later</p>
      </div>
    `;
  } finally {
    searchContainer.classList.remove('searching');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeSearch();
  loadPinnedProjects(); // Ganti dari loadFeaturedProjects()
});

window.aiChatModal = new AIChatModal();
