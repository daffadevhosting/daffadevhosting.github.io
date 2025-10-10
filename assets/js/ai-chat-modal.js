// assets/js/ai-chat-modal.js
class AIChatModal {
    constructor() {
        this.baseURL = 'https://github-api.sendaljepit.workers.dev';
        this.chatHistory = [];
        this.isOpen = false;
        this.isLoading = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupChat();
    }

    bindEvents() {
        // Trigger dari search box
        const triggerContainer = document.querySelector('.ai-trigger-container');
        const triggerInput = document.getElementById('ai-trigger-input');
        const triggerButton = triggerContainer.querySelector('button');

        // Click container
        triggerContainer.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                this.openModal();
            }
        });

        // Focus input
        triggerInput.addEventListener('focus', () => {
            this.openModal();
        });

        // Trigger button
        triggerButton.addEventListener('click', () => {
            this.openModal();
        });

        // Quick prompts di trigger
        document.querySelectorAll('.ai-quick-prompt').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const prompt = e.target.dataset.prompt;
                this.openModal(prompt);
            });
        });

        // Modal controls
        document.querySelector('.ai-modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        document.querySelector('.ai-modal-minimize').addEventListener('click', () => {
            this.minimizeModal();
        });

        // Send message
        document.querySelector('.ai-send-message').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key support
        document.getElementById('ai-chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Quick actions dalam modal
        document.querySelectorAll('.ai-quick-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const prompt = e.target.dataset.prompt;
                this.sendQuickPrompt(prompt);
            });
        });

        // Escape key untuk close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });
    }

    setupChat() {
        // Inisialisasi chat dengan welcome message
        this.chatHistory = [];
    }

    openModal(initialPrompt = '') {
        const modal = document.getElementById('ai-chat-modal');
        const chatContainer = document.querySelector('.ai-chat-container');
        
        modal.classList.remove('hidden');
        this.isOpen = true;
        
        // Trigger animation
        setTimeout(() => {
            chatContainer.classList.remove('scale-95', 'opacity-0');
            chatContainer.classList.add('scale-100', 'opacity-100');
        }, 50);

        // Focus input
        setTimeout(() => {
            document.getElementById('ai-chat-input').focus();
        }, 500);

        // Jika ada initial prompt, kirim otomatis
        if (initialPrompt) {
            setTimeout(() => {
                document.getElementById('ai-chat-input').value = initialPrompt;
                this.sendMessage();
            }, 1000);
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('ai-chat-modal');
        const chatContainer = document.querySelector('.ai-chat-container');
        
        chatContainer.classList.remove('scale-100', 'opacity-100');
        chatContainer.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            this.isOpen = false;
        }, 300);

        // Restore body scroll
        document.body.style.overflow = '';
    }

    minimizeModal() {
        // Implement minimize logic jika diperlukan
        this.closeModal();
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

                // Keep only last 10 messages
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
            this.addMessage('Sorry, I encountered an error while searching repositories. Please try again later.', 'bot');
        } finally {
            this.showLoading(false);
        }
    }

    sendQuickPrompt(prompt) {
        document.getElementById('ai-chat-input').value = prompt;
        this.sendMessage();
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="flex items-start space-x-3 justify-end">
                    <div class="flex-1 max-w-[80%]">
                        <div class="message-bubble bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl rounded-tr-none p-4 border border-blue-400/30">
                            <p class="text-white">${this.formatMessage(content)}</p>
                        </div>
                        <div class="flex items-center space-x-2 mt-2 justify-end">
                            <span class="text-slate-500 text-xs">You</span>
                            <span class="text-slate-600 text-xs">•</span>
                            <span class="text-slate-500 text-xs">${timestamp}</span>
                        </div>
                    </div>
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-user text-white text-xs"></i>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-robot text-white text-xs"></i>
                    </div>
                    <div class="flex-1 max-w-[80%]">
                        <div class="message-bubble bg-slate-800/60 rounded-2xl rounded-tl-none p-4 border border-slate-700/50">
                            <p class="text-white">${this.formatMessage(content)}</p>
                        </div>
                        <div class="flex items-center space-x-2 mt-2">
                            <span class="text-slate-500 text-xs">DaffaDev AI</span>
                            <span class="text-slate-600 text-xs">•</span>
                            <span class="text-slate-500 text-xs">${timestamp}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Hide quick actions setelah ada percakapan
        if (this.chatHistory.length > 0) {
            document.getElementById('ai-quick-actions').classList.add('hidden');
        }
    }

    formatMessage(content) {
        return content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-yellow-300">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="text-green-300">$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-slate-700 px-2 py-1 rounded text-sm font-mono">$1</code>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-blue-400 hover:text-blue-300 underline">$1</a>');
    }

    showMentionedRepos(repos) {
        const messagesContainer = document.getElementById('ai-chat-messages');
        
        repos.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.className = 'ai-message bot-message';
            repoDiv.innerHTML = `
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-robot text-white text-xs"></i>
                    </div>
                    <div class="flex-1 max-w-[80%]">
                        <div class="message-bubble bg-slate-800/60 rounded-2xl rounded-tl-none p-4 border-l-4 border-green-500">
                            <div class="flex items-start justify-between mb-3">
                                <h4 class="font-bold text-white text-lg">${repo.name}</h4>
                                <span class="flex items-center text-yellow-400 text-sm bg-yellow-400/20 px-2 py-1 rounded-full">
                                    <i class="fas fa-star mr-1"></i> ${repo.stargazers_count}
                                </span>
                            </div>
                            <p class="text-slate-300 text-sm mb-3">${repo.description || 'No description available'}</p>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    ${repo.language ? `
                                        <span class="flex items-center text-slate-400 text-sm">
                                            <span class="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                                            ${repo.language}
                                        </span>
                                    ` : ''}
                                    <span class="flex items-center text-slate-400 text-sm">
                                        <i class="fas fa-code-branch mr-1"></i> ${repo.forks_count}
                                    </span>
                                </div>
                                <a href="${repo.html_url}" target="_blank" class="text-green-400 hover:text-green-300 font-semibold text-sm flex items-center bg-green-500/20 px-3 py-1 rounded-lg transition">
                                    View Repository <i class="fas fa-external-link-alt ml-2"></i>
                                </a>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2 mt-2">
                            <span class="text-slate-500 text-xs">Repository</span>
                            <span class="text-slate-600 text-xs">•</span>
                            <span class="text-slate-500 text-xs">${repo.language || 'Various'}</span>
                        </div>
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
        const sendBtn = document.querySelector('.ai-send-message');
        
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

// Initialize AI Chat Modal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new AIChatModal();
});