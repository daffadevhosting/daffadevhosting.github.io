/**
 * DaffaDev - Clean JavaScript
 * Handles tab switching, chat UI, blog posts, and PWA functionality
 */

// ============================================
// DOM Elements
// ============================================
const DOM = {
  // Tab elements
  tabContents: document.querySelectorAll('.tab-content'),
  navItems: document.querySelectorAll('.nav-item'),
  
  // Chat elements
  chatInput: document.getElementById('chatInput'),
  sendBtn: document.getElementById('sendBtn'),
  chatMessages: document.getElementById('chatMessages'),
  chatBox: document.getElementById('chatBoxContainer'),
  welcomeScreen: document.getElementById('welcomeScreen'),
  
  // Modal elements
  blogPostModal: document.getElementById('blogPostModal'),
  blogPostModalTitle: document.getElementById('blogPostModalTitle'),
  blogPostModalContent: document.getElementById('blogPostModalContent'),
  
  // Sidebar elements
  sidebarPanel: document.querySelector('.sidebar-panel'),
  sidebarBackdrop: document.querySelector('.sidebar-backdrop'),
  menuBtn: document.querySelector('.menu-btn'),
  
  // PWA elements
  pwaBanner: document.getElementById('pwaBanner'),
  pwaInstallBtn: document.getElementById('pwaInstallBtn'),
  pwaCloseBtn: document.getElementById('pwaCloseBtn')
};

// ============================================
// State Management
// ============================================
const state = {
  deferredPrompt: null,
  currentTab: 'home',
  isSidebarOpen: false,
  isPWAInstalled: false
};

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initChat();
  initSidebar();
  initPWA();
  initBlogPosts();
  initRepositoryList();
});

// ============================================
// Tab Switching
// ============================================
function initTabs() {
  // Hide all tabs except the active one
  DOM.tabContents.forEach(tab => {
    if (!tab.classList.contains('active')) {
      tab.style.display = 'none';
    }
  });

  // Add click handlers to nav items
  DOM.navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.dataset.tab;
      switchTab(targetTab);
    });
  });
}

function switchTab(tabName) {
  state.currentTab = tabName;
  
  // Update nav items
  DOM.navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });
  
  // Update tab contents
  DOM.tabContents.forEach(tab => {
    const isActive = tab.id === `${tabName}Tab`;
    tab.classList.toggle('active', isActive);
    tab.style.display = isActive ? 'block' : 'none';
    
    // Scroll to top when switching tabs
    if (isActive) {
      tab.scrollTop = 0;
    }
  });
  
  // Close sidebar when switching tabs on mobile
  if (state.isSidebarOpen) {
    closeSidebar();
  }
}

// ============================================
// Chat Functionality
// ============================================
function initChat() {
  if (!DOM.chatInput || !DOM.sendBtn) return;

  // Auto-resize textarea
  DOM.chatInput.addEventListener('input', autoResizeTextarea);
  
  // Send message on Enter (Shift+Enter for new line)
  DOM.chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // Send button click
  DOM.sendBtn.addEventListener('click', sendMessage);
  
  // Focus chat input when clicked
  DOM.chatBox?.addEventListener('click', () => {
    DOM.chatInput.focus();
  });
  
  // Hide welcome screen on first input
  DOM.chatInput.addEventListener('focus', () => {
    if (DOM.welcomeScreen) {
      DOM.welcomeScreen.style.display = 'none';
    }
  });
}

function autoResizeTextarea() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
}

function sendMessage() {
  const message = DOM.chatInput.value.trim();
  if (!message) return;
  
  // Clear input
  DOM.chatInput.value = '';
  DOM.chatInput.style.height = 'auto';
  
  // Hide welcome screen
  if (DOM.welcomeScreen) {
    DOM.welcomeScreen.style.display = 'none';
  }
  
  // Add user message to chat
  addMessage(message, 'user');
  
  // Simulate AI response (replace with actual API call)
  setTimeout(() => {
    const response = generateAIResponse(message);
    addMessage(response, 'ai');
  }, 1000);
}

function addMessage(content, type) {
  if (!DOM.chatMessages) return;
  
  const messageWrapper = document.createElement('div');
  messageWrapper.className = `message-wrapper ${type}`;
  
  if (type === 'ai') {
    const aiAvatar = document.createElement('div');
    aiAvatar.className = 'ai-avatar';
    aiAvatar.innerHTML = '<ion-icon name="logo-github"></ion-icon>';
    messageWrapper.appendChild(aiAvatar);
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';
  
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  if (type === 'user') {
    bubble.textContent = content;
  } else {
    // Format AI response (simple markdown support)
    bubble.innerHTML = formatMessage(content);
  }
  
  messageDiv.appendChild(bubble);
  messageWrapper.appendChild(messageDiv);
  DOM.chatMessages.appendChild(messageWrapper);
  
  // Scroll to bottom
  DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
}

function formatMessage(text) {
  // Simple markdown formatting
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

function generateAIResponse(message) {
  const responses = [
    "Terima kasih atas pertanyaannya! Saya akan mencoba membantu sebaik mungkin.",
    "Menarik! Mari kita bahas lebih lanjut tentang topik ini.",
    "Baik, saya mengerti. Berikut adalah beberapa informasi yang mungkin berguna:",
    "Pertanyaan yang bagus! Berikut jawaban saya:",
    "Saya sedang mempelajari hal ini juga. Mari kita eksplorasi bersama!"
  ];
  
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

function fillAndSendPrompt(prompt) {
  if (DOM.chatInput) {
    DOM.chatInput.value = prompt;
    DOM.chatInput.focus();
    // Trigger input event for auto-resize
    DOM.chatInput.dispatchEvent(new Event('input'));
  }
}

// ============================================
// Sidebar
// ============================================
function initSidebar() {
  if (!DOM.menuBtn || !DOM.sidebarPanel || !DOM.sidebarBackdrop) return;
  
  DOM.menuBtn.addEventListener('click', toggleSidebar);
  DOM.sidebarBackdrop.addEventListener('click', closeSidebar);
  
  // Close button
  const closeBtn = DOM.sidebarPanel.querySelector('.sidebar-close');
  closeBtn?.addEventListener('click', closeSidebar);
}

function toggleSidebar() {
  state.isSidebarOpen = !state.isSidebarOpen;
  
  DOM.sidebarPanel.classList.toggle('active', state.isSidebarOpen);
  DOM.sidebarBackdrop.classList.toggle('active', state.isSidebarOpen);
  
  // Prevent body scroll when sidebar is open
  document.body.style.overflow = state.isSidebarOpen ? 'hidden' : '';
}

function closeSidebar() {
  state.isSidebarOpen = false;
  DOM.sidebarPanel.classList.remove('active');
  DOM.sidebarBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================
// Blog Posts
// ============================================
function initBlogPosts() {
  // Add click handlers to blog post links
  const blogLinks = document.querySelectorAll('.blog-post-link');
  blogLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.dataset.postUrl;
      const image = link.dataset.postImage;
      openBlogPost(url, image);
    });
  });
}

async function openBlogPost(url, imageUrl = '') {
  if (!DOM.blogPostModal || !DOM.blogPostModalContent) return;
  
  // Show loading state
  DOM.blogPostModalTitle.textContent = 'Memuat artikel...';
  DOM.blogPostModalContent.innerHTML = '<div class="loading">Memuat artikel...</div>';
  
  // Show modal
  DOM.blogPostModal.present?.();
  
  try {
    // Fetch the blog post content
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extract content
    const content = doc.querySelector('.jekyll-content, .post-content, article') || doc.querySelector('main') || doc.body;
    
    if (!content) {
      throw new Error('Content not found');
    }
    
    // Extract title
    const title = doc.querySelector('h1')?.textContent || 
                  doc.querySelector('title')?.textContent || 
                  'Artikel';
    
    // Set title
    DOM.blogPostModalTitle.textContent = title;
    
    // Set content (remove h1 to avoid duplicate)
    const h1 = content.querySelector('h1');
    if (h1) h1.remove();
    
    // Add hero image if available
    if (imageUrl) {
      const heroImg = document.createElement('img');
      heroImg.src = imageUrl;
      heroImg.alt = title;
      heroImg.className = 'blog-post-hero-image';
      DOM.blogPostModalContent.innerHTML = '';
      DOM.blogPostModalContent.appendChild(heroImg);
    } else {
      DOM.blogPostModalContent.innerHTML = '';
    }
    
    // Append content
    DOM.blogPostModalContent.appendChild(content.cloneNode(true));
    
    // Sanitize and style content
    sanitizeBlogContent(DOM.blogPostModalContent);
    
  } catch (error) {
    console.error('Error loading blog post:', error);
    DOM.blogPostModalContent.innerHTML = `
      <div class="error-msg">
        <p>Gagal memuat artikel.</p>
        <p style="font-size: 12px; color: #666;">${error.message}</p>
      </div>
    `;
  }
}

function closeBlogPostModal() {
  DOM.blogPostModal?.dismiss?.();
}

function sanitizeBlogContent(container) {
  // Remove unwanted elements
  const unwantedSelectors = ['nav', 'footer', 'aside', '.sidebar', '.top-bar', '.footer-container'];
  unwantedSelectors.forEach(selector => {
    const elements = container.querySelectorAll(selector);
    elements.forEach(el => el.remove());
  });
  
  // Style images
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    img.style.maxWidth = '100%';
    img.style.borderRadius = '12px';
  });
  
  // Style code blocks
  const codeBlocks = container.querySelectorAll('pre');
  codeBlocks.forEach(block => {
    block.style.background = '#1f2328';
    block.style.color = '#f0f6fc';
    block.style.padding = '14px';
    block.style.borderRadius = '12px';
    block.style.overflowX = 'auto';
  });
}

// ============================================
// Repository List (Library Tab)
// ============================================
function initRepositoryList() {
  // This would typically fetch from GitHub API
  // For now, just ensure the loading state is proper
  const repoList = document.getElementById('repoList');
  if (repoList && repoList.querySelector('.loading')) {
    // Could add actual repo loading here
    // fetchGitHubRepos();
  }
}

async function fetchGitHubRepos() {
  // Example: Fetch repos from GitHub API
  // Note: This requires proper authentication for private repos
  try {
    const response = await fetch('https://api.github.com/users/daffadevhosting/repos?sort=updated&per_page=10');
    const repos = await response.json();
    
    const repoList = document.getElementById('repoList');
    if (!repoList) return;
    
    repoList.innerHTML = '';
    
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'modern-repo-card';
      card.innerHTML = `
        <div class="repo-header">
          <ion-icon name="logo-github" class="repo-icon"></ion-icon>
          <span class="repo-name">${repo.name}</span>
          <span class="repo-badge">Public</span>
        </div>
        <p class="repo-desc">${repo.description || 'No description'}</p>
        <div class="repo-meta-footer">
          <div class="meta-item">
            <ion-icon name="star-outline"></ion-icon>
            <span>${repo.stargazers_count || 0}</span>
          </div>
          <div class="meta-item">
            <ion-icon name="git-branch-outline"></ion-icon>
            <span>${repo.forks_count || 0}</span>
          </div>
          <div class="meta-item">
            <span class="lang-dot dot-${repo.language?.toLowerCase() || 'default'}"></span>
            <span>${repo.language || 'Unknown'}</span>
          </div>
        </div>
      `;
      repoList.appendChild(card);
    });
    
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
}

// ============================================
// PWA Installation
// ============================================
function initPWA() {
  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    state.deferredPrompt = e;
    
    // Show PWA banner
    if (DOM.pwaBanner && !state.isPWAInstalled) {
      DOM.pwaBanner.style.display = 'block';
    }
  });
  
  // Install button click
  if (DOM.pwaInstallBtn) {
    DOM.pwaInstallBtn.addEventListener('click', installPWA);
  }
  
  // Close button click
  if (DOM.pwaCloseBtn) {
    DOM.pwaCloseBtn.addEventListener('click', () => {
      if (DOM.pwaBanner) {
        DOM.pwaBanner.style.display = 'none';
      }
    });
  }
  
  // Check if PWA is already installed
  window.addEventListener('appinstalled', () => {
    state.isPWAInstalled = true;
    if (DOM.pwaBanner) {
      DOM.pwaBanner.style.display = 'none';
    }
  });
}

async function installPWA() {
  if (!state.deferredPrompt) return;
  
  state.deferredPrompt.prompt();
  
  const choiceResult = await state.deferredPrompt.userChoice;
  
  if (choiceResult.outcome === 'accepted') {
    state.isPWAInstalled = true;
    if (DOM.pwaBanner) {
      DOM.pwaBanner.style.display = 'none';
    }
  }
  
  state.deferredPrompt = null;
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ============================================
// Export for use in other scripts
// ============================================
window.openBlogPost = openBlogPost;
window.closeBlogPostModal = closeBlogPostModal;
window.fillAndSendPrompt = fillAndSendPrompt;
window.switchTab = switchTab;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
