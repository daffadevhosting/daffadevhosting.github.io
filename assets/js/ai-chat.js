// assets/js/ai-chat.js
class AIChat {
  constructor() {
    this.baseURL = 'https://github-api.sendaljepit.workers.dev';
    this.chatHistory = [];
    this.isOpen = false;
    this.isLoading = false;
    this.init();
  }

  init() {
    this.createChatInterface();
    this.bindEvents();
  }

  createChatInterface() {
    const chatHTML = `
      <!-- AI Chat Widget -->
      <div id="ai-chat-widget" class="fixed bottom-6 right-6 z-50">
        <!-- Chat Button -->
        <button id="ai-chat-toggle" class="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <i class="fas fa-robot text-white text-xl"></i>
        </button>

        <!-- Chat Container -->
        <div id="ai-chat-container" class="hidden absolute bottom-16 right-0 w-80 md:w-96 h-96 bg-slate-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700 flex flex-col">
          <!-- Chat Header -->
          <div class="p-4 border-b border-slate-700 bg-slate-900/50 rounded-t-2xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <i class="fas fa-robot text-white text-sm"></i>
                </div>
                <div>
                  <h3 class="font-bold text-white">Repo Assistant</h3>
                  <p class="text-slate-400 text-xs">Ask me about repositories!</p>
                </div>
              </div>
              <button id="ai-chat-close" class="text-slate-400 hover:text-white transition">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Chat Messages -->
          <div id="ai-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-4">
            <div class="ai-message bot-message">
              <div class="message-bubble bg-slate-700/50 rounded-2xl p-3">
                <p class="text-white text-sm">Hi! I'm your AI assistant. I can help you find repositories based on technology, popularity, or specific features. What are you looking for? 🚀</p>
              </div>
            </div>
          </div>

          <!-- Chat Input -->
          <div class="p-4 border-t border-slate-700">
            <div class="flex space-x-2">
              <input 
                type="text" 
                id="ai-chat-input" 
                placeholder="Ask about repositories..." 
                class="flex-1 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled
              >
              <button id="ai-chat-send" class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-semibold hover:opacity-90 transition disabled:opacity-50 text-sm" disabled>
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
            <div class="mt-2 flex flex-wrap gap-1">
              <button class="quick-prompt px-2 py-1 bg-slate-700/50 hover:bg-slate-600 rounded-lg text-slate-300 text-xs transition">
                Show trending repos
              </button>
              <button class="quick-prompt px-2 py-1 bg-slate-700/50 hover:bg-slate-600 rounded-lg text-slate-300 text-xs transition">
                Find AI projects
              </button>
              <button class="quick-prompt px-2 py-1 bg-slate-700/50 hover:bg-slate-600 rounded-lg text-slate-300 text-xs transition">
                Most popular
              </button>
              <button class="quick-prompt px-2 py-1 bg-slate-700/50 hover:bg-slate-600 rounded-lg text-slate-300 text-xs transition">
                Web development
              </button>
            </div>
          </div>

          <!-- Loading Indicator -->
          <div id="ai-chat-loading" class="hidden absolute inset-0 bg-slate-800/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div class="text-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p class="text-white text-sm">Searching repositories...</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add to body
    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  bindEvents() {
    // Toggle chat
    document.getElementById('ai-chat-toggle').addEventListener('click', () => {
      this.toggleChat();
    });

    // Close chat
    document.getElementById('ai-chat-close').addEventListener('click', () => {
      this.closeChat();
    });

    // Send message
    document.getElementById('ai-chat-send').addEventListener('click', () => {
      this.sendMessage();
    });

    // Enter key support
    document.getElementById('ai-chat-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Quick prompts
    document.querySelectorAll('.quick-prompt').forEach(button => {
      button.addEventListener('click', (e) => {
        const prompt = e.target.textContent;
        document.getElementById('ai-chat-input').value = prompt;
        this.sendMessage();
      });
    });

    // Enable input when chat opens
    this.enableInput();
  }

  toggleChat() {
    const container = document.getElementById('ai-chat-container');
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      container.classList.remove('hidden');
      container.classList.add('flex');
      document.getElementById('ai-chat-input').focus();
    } else {
      container.classList.add('hidden');
      container.classList.remove('flex');
    }
  }

  closeChat() {
    this.isOpen = false;
    document.getElementById('ai-chat-container').classList.add('hidden');
    document.getElementById('ai-chat-container').classList.remove('flex');
  }

  enableInput() {
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    input.disabled = false;
    sendBtn.disabled = false;
  }

  async sendMessage() {
    const input = document.getElementById('ai-chat-input');
    const message = input.value.trim();
    
    if (!message || this.isLoading) return;

    // Add user message to chat
    this.addMessage(message, 'user');
    input.value = '';
    
    // Show loading
    this.showLoading(true);

    try {
      const response = await fetch(`${this.baseURL}/api/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          chatHistory: this.chatHistory
        })
      });

      const data = await response.json();

      if (data.success) {
        // Add AI response to chat
        this.addMessage(data.response, 'bot');
        
        // Update chat history
        this.chatHistory.push(
          { role: 'user', content: message },
          { role: 'assistant', content: data.response }
        );

        // Keep only last 10 messages to manage context length
        if (this.chatHistory.length > 20) {
          this.chatHistory = this.chatHistory.slice(-20);
        }

        // Show mentioned repositories if any
        if (data.mentioned_repos && data.mentioned_repos.length > 0) {
          this.showMentionedRepos(data.mentioned_repos);
        }

      } else {
        throw new Error(data.error);
      }

    } catch (error) {
      console.error('AI Chat Error:', error);
      this.addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
    } finally {
      this.showLoading(false);
    }
  }

  addMessage(content, sender) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender}-message`;
    
    const bubbleClass = sender === 'user' 
      ? 'bg-blue-500/20 border border-blue-500/30 rounded-2xl p-3 ml-8'
      : 'bg-slate-700/50 rounded-2xl p-3 mr-8';

    messageDiv.innerHTML = `
      <div class="message-bubble ${bubbleClass}">
        <p class="text-white text-sm">${this.formatMessage(content)}</p>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  formatMessage(content) {
    // Convert line breaks and basic formatting
    return content
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-slate-600 px-1 rounded text-xs">$1</code>');
  }

  showMentionedRepos(repos) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    
    repos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.className = 'ai-message bot-message';
      repoDiv.innerHTML = `
        <div class="message-bubble bg-slate-700/50 rounded-2xl p-3 mr-8 border-l-4 border-green-500">
          <div class="flex items-start justify-between mb-2">
            <h4 class="font-bold text-white text-sm">${repo.name}</h4>
            <span class="flex items-center text-yellow-400 text-xs">
              <i class="fas fa-star mr-1"></i> ${repo.stargazers_count}
            </span>
          </div>
          <p class="text-slate-300 text-xs mb-2">${repo.description || 'No description'}</p>
          <div class="flex items-center justify-between">
            <span class="text-slate-400 text-xs">${repo.language || 'Various'}</span>
            <a href="${repo.html_url}" target="_blank" class="text-blue-400 hover:text-blue-300 text-xs font-semibold">
              View <i class="fas fa-external-link-alt ml-1"></i>
            </a>
          </div>
        </div>
      `;
      messagesContainer.appendChild(repoDiv);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showLoading(show) {
    const loading = document.getElementById('ai-chat-loading');
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    
    this.isLoading = show;
    
    if (show) {
      loading.classList.remove('hidden');
      input.disabled = true;
      sendBtn.disabled = true;
    } else {
      loading.classList.add('hidden');
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }
}

// Initialize AI Chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Replace the existing floating button with AI chat
  const existingFloatingBtn = document.querySelector('.fixed.bottom-5.right-5');
  if (existingFloatingBtn) {
    existingFloatingBtn.remove();
  }
  
  new AIChat();
});