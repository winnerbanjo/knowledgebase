// --- DATA DATABASE: Shared Nile Merchant Dashboard Articles & Categories ---
// Note: This script requires data.js to be loaded prior to app.js

// --- DYNAMIC DATABASE CONTROLLER ---
let dbArticles = [];

async function initDatabase() {
  try {
    const res = await fetch('/api/articles');
    if (!res.ok) throw new Error('API failed');
    dbArticles = await res.json();
  } catch (err) {
    console.warn('Backend API connection failed, falling back to localStorage...', err);
    const stored = localStorage.getItem('nile-kb-articles');
    if (stored) {
      dbArticles = JSON.parse(stored);
    } else {
      dbArticles = [...defaultArticles];
      localStorage.setItem('nile-kb-articles', JSON.stringify(dbArticles));
    }
  }
}

// --- APP STATE ---
const state = {
  activeTheme: localStorage.getItem('nile-theme') || 'light',
  currentView: 'home', // 'home' or 'portal'
  activeCategoryId: null,
  activeArticleId: null,
  searchQuery: ''
};

// --- DOM ELEMENTS ---
const el = {
  html: document.documentElement,
  themeBtn: document.getElementById('theme-toggle-btn'),
  sunIcon: document.getElementById('theme-sun-icon'),
  moonIcon: document.getElementById('theme-moon-icon'),
  
  // Views
  homeContent: document.getElementById('home-main-content'),
  portalContent: document.getElementById('portal-main-content'),
  backBtn: document.getElementById('back-to-home-btn'),
  
  // Containers
  categoriesList: document.getElementById('categories-list'),
  featuredList: document.getElementById('featured-list'),
  sidebarTitle: document.getElementById('sidebar-category-title'),
  sidebarMenu: document.getElementById('sidebar-articles-menu'),
  
  // Search
  searchInput: document.getElementById('search-kb-input'),
  searchResultsBox: document.getElementById('search-results-box'),
  tagPaystack: document.getElementById('tag-paystack'),
  tagSizeguide: document.getElementById('tag-sizeguide'),
  tagBuilder: document.getElementById('tag-websitebuilder'),
  tagPreorder: document.getElementById('tag-preorder'),
  tag502: document.getElementById('tag-502'),
  
  // Dynamic Article Render
  articleCategory: document.getElementById('article-rendered-category'),
  articleTitle: document.getElementById('article-rendered-title'),
  articleReadTime: document.getElementById('article-read-time'),
  articleBody: document.getElementById('article-rendered-body'),
  
  // Ratings Widget
  feedbackWidget: document.getElementById('feedback-widget'),
  feedbackYes: document.getElementById('feedback-yes-btn'),
  feedbackNo: document.getElementById('feedback-no-btn'),
  feedbackThanks: document.getElementById('feedback-thanks-message'),
  
  // Support Chat drawer
  chatBubble: document.getElementById('chat-bubble-trigger'),
  chatDrawer: document.getElementById('support-chat-drawer'),
  chatCloseBtn: document.getElementById('chat-close-btn'),
  ctaChatBtn: document.getElementById('cta-chat-btn'),
  footerChatLink: document.getElementById('footer-live-chat-link'),
  chatInput: document.getElementById('chat-message-input'),
  chatSendBtn: document.getElementById('chat-send-message-btn'),
  chatMessages: document.getElementById('chat-messages-container'),
  adminTbody: null // placeholder to avoid trailing comma error if needed, but we can just end with chatMessages
};

// --- CONTROLLERS & RENDERERS ---

// Theme Toggling
function initTheme() {
  el.html.setAttribute('data-theme', state.activeTheme);
  updateThemeIcons();
}

function updateThemeIcons() {
  if (state.activeTheme === 'dark') {
    el.sunIcon.style.display = 'block';
    el.moonIcon.style.display = 'none';
  } else {
    el.sunIcon.style.display = 'none';
    el.moonIcon.style.display = 'block';
  }
}

function toggleTheme() {
  state.activeTheme = state.activeTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('nile-theme', state.activeTheme);
  el.html.setAttribute('data-theme', state.activeTheme);
  updateThemeIcons();
}

// Render Categories on Home Page
function renderCategories() {
  el.categoriesList.innerHTML = '';
  categories.forEach(cat => {
    const catArticles = dbArticles.filter(art => art.category === cat.id);
    const card = document.createElement('div');
    card.className = 'category-card';
    card.id = `cat-card-${cat.id}`;
    card.innerHTML = `
      <div class="category-icon-box">
        ${cat.icon}
      </div>
      <div class="category-info">
        <h3>${cat.title}</h3>
        <p>${cat.desc}</p>
      </div>
      <div class="category-articles-count">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        <span>${catArticles.length} guides</span>
      </div>
    `;
    
    // Spotlight Hover Glow Effect (mouse tracking)
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });

    card.addEventListener('click', () => {
      openCategory(cat.id);
    });
    
    el.categoriesList.appendChild(card);
  });
}

// Render Recommended Solutions list
function renderFeaturedArticles() {
  el.featuredList.innerHTML = '';
  const featuredIds = ['payment-methods', 'size-guides', 'website-builder', 'troubleshooting-faq'];
  const featuredItems = dbArticles.filter(art => featuredIds.includes(art.id));
  
  featuredItems.forEach(art => {
    const card = document.createElement('div');
    card.className = 'featured-card';
    card.innerHTML = `
      <div class="featured-category">${art.categoryName}</div>
      <div class="featured-title">${art.title}</div>
      <p class="featured-desc">Step-by-step documentation on how to configure this on your store.</p>
    `;
    card.addEventListener('click', () => {
      openArticle(art.id);
    });
    el.featuredList.appendChild(card);
  });
}

// Navigate to Category view
function openCategory(categoryId) {
  state.currentView = 'portal';
  state.activeCategoryId = categoryId;
  
  const categoryArticles = dbArticles.filter(art => art.category === categoryId);
  if (categoryArticles.length > 0) {
    state.activeArticleId = categoryArticles[0].id;
  }
  
  updatePortalView();
}

// Navigate to Specific Article
function openArticle(articleId) {
  state.currentView = 'portal';
  const article = dbArticles.find(art => art.id === articleId);
  if (article) {
    state.activeCategoryId = article.category;
    state.activeArticleId = article.id;
  }
  updatePortalView();
}

// Update DOM for Article Portal View
function updatePortalView() {
  if (state.currentView === 'home') {
    el.homeContent.classList.remove('hidden');
    el.portalContent.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (state.currentView === 'portal') {
    el.homeContent.classList.add('hidden');
    el.portalContent.classList.add('active');
    
    // Render Sidebar Navigation
    const activeCat = categories.find(cat => cat.id === state.activeCategoryId);
    el.sidebarTitle.textContent = activeCat ? activeCat.title : 'Guides';
    
    el.sidebarMenu.innerHTML = '';
    const categoryArticles = dbArticles.filter(art => art.category === state.activeCategoryId);
    
    categoryArticles.forEach(art => {
      const item = document.createElement('li');
      item.className = `sidebar-item ${art.id === state.activeArticleId ? 'active' : ''}`;
      item.innerHTML = `
        <span>${art.title}</span>
        <svg style="width: 0.8rem; height: 0.8rem;" viewBox="0 0 24 24"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      `;
      item.addEventListener('click', () => {
        state.activeArticleId = art.id;
        updatePortalView();
      });
      el.sidebarMenu.appendChild(item);
    });
    
    // Render Main Article Pane
    const activeArt = dbArticles.find(art => art.id === state.activeArticleId);
    if (activeArt) {
      el.articleCategory.textContent = activeArt.categoryName;
      el.articleTitle.textContent = activeArt.title;
      el.articleReadTime.textContent = `🕒 ${activeArt.readTime || '3 min read'}`;
      
      // Build body layout
      let finalBodyHtml = activeArt.content;
      
      // Inject Play video and screenshot preview boxes dynamically if set!
      if (activeArt.videoUrl || activeArt.screenshotUrl) {
        let attachmentsHtml = `<div class="article-attachments">`;
        
        if (activeArt.videoUrl) {
          attachmentsHtml += `
            <div>
              <div class="attachment-title">
                <svg style="width: 1rem; height: 1rem;" viewBox="0 0 24 24"><path fill="currentColor" d="M21 3H3c-1.11 0-2 .89-2 2v14c0 1.1.89 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm-9 14.5c-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5zm3.5-5.5L10.5 9v6l5-3z"/></svg>
                <span>Video Tutorial</span>
              </div>
              <a href="${activeArt.videoUrl}" target="_blank" class="video-btn">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                <span>Watch TikTok Walkthrough Video</span>
              </a>
            </div>
          `;
        }
        
        if (activeArt.screenshotUrl) {
          attachmentsHtml += `
            <div>
              <div class="attachment-title">
                <svg style="width: 1rem; height: 1rem;" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                <span>Dashboard Screenshot Preview</span>
              </div>
              <img src="${activeArt.screenshotUrl}" alt="Dashboard Screenshot" class="screenshot-preview">
            </div>
          `;
        }
        
        attachmentsHtml += `</div>`;
        finalBodyHtml += attachmentsHtml;
      }
      
      el.articleBody.innerHTML = finalBodyHtml;
      
      // Update feedback rating buttons
      resetFeedbackWidget(activeArt.id);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Reset helpful feedback widget buttons
function resetFeedbackWidget(articleId) {
  el.feedbackThanks.style.display = 'none';
  el.feedbackYes.classList.remove('active-yes');
  el.feedbackNo.classList.remove('active-no');
  el.feedbackYes.style.display = 'flex';
  el.feedbackNo.style.display = 'flex';
  
  const savedRating = localStorage.getItem(`rating-${articleId}`);
  if (savedRating === 'yes') {
    el.feedbackYes.classList.add('active-yes');
  } else if (savedRating === 'no') {
    el.feedbackNo.classList.add('active-no');
  }
}

// Register helpful rating
function handleFeedback(isHelpful) {
  const articleId = state.activeArticleId;
  localStorage.setItem(`rating-${articleId}`, isHelpful ? 'yes' : 'no');
  
  if (isHelpful) {
    el.feedbackYes.classList.add('active-yes');
    el.feedbackNo.style.display = 'none';
  } else {
    el.feedbackNo.classList.add('active-no');
    el.feedbackYes.style.display = 'none';
    
    // Open chat to generate automated ticket escalation!
    setTimeout(() => {
      openChatWithEscalation();
    }, 1200);
  }
  
  el.feedbackThanks.style.display = 'block';
  

}

// Search Logic
function handleSearch(query) {
  state.searchQuery = query.trim().toLowerCase();
  
  if (!state.searchQuery) {
    el.searchResultsBox.classList.remove('active');
    return;
  }
  
  // Keyword scoring match
  const filtered = dbArticles.map(art => {
    let score = 0;
    if (art.title.toLowerCase().includes(state.searchQuery)) score += 10;
    if (art.keywords.toLowerCase().includes(state.searchQuery)) score += 5;
    return { ...art, score };
  })
  .filter(art => art.score > 0)
  .sort((a, b) => b.score - a.score);
  
  // Render search list dropdown
  el.searchResultsBox.innerHTML = '';
  if (filtered.length > 0) {
    filtered.forEach(art => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `
        <div class="search-result-title">
          ${art.title} <span>${art.categoryName}</span>
        </div>
        <div class="search-result-snippet">
          Configure ${art.title.toLowerCase()} settings for your Nile merchant store.
        </div>
      `;
      item.addEventListener('click', () => {
        el.searchInput.value = '';
        el.searchResultsBox.classList.remove('active');
        openArticle(art.id);
      });
      el.searchResultsBox.appendChild(item);
    });
  } else {
    const noRes = document.createElement('div');
    noRes.className = 'search-no-results';
    noRes.textContent = `No help articles found matching "${query}"`;
    el.searchResultsBox.appendChild(noRes);
  }
  
  el.searchResultsBox.classList.add('active');
}



// --- SUPPORT CHAT WIDGET LOGIC (Ash's Ticket Sync API Client Mockup) ---

function toggleChatDrawer() {
  el.chatDrawer.classList.toggle('active');
  if (el.chatDrawer.classList.contains('active')) {
    el.chatInput.focus();
    el.chatBubble.style.boxShadow = '0 0 0 4px rgba(45, 111, 81, 0.2)';
  } else {
    el.chatBubble.style.boxShadow = '';
  }
}

function appendChatMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${sender}`;
  msg.innerHTML = text;
  el.chatMessages.appendChild(msg);
  el.chatMessages.scrollTop = el.chatMessages.scrollHeight;
}

function handleSendMessage() {
  const text = el.chatInput.value.trim();
  if (!text) return;
  
  appendChatMessage('user', text);
  el.chatInput.value = '';
  
  // Automate bot support replies mirroring the User Guide
  setTimeout(() => {
    botReply(text);
  }, 1000);
}

function botReply(userQuery) {
  const query = userQuery.toLowerCase();
  
  // Match guides from data
  if (query.includes('payment') || query.includes('paystack') || query.includes('stripe') || query.includes('card')) {
    appendChatMessage('bot', `
      💳 <strong>Payment Gateways:</strong><br>
      To enable card payments, navigate to <strong>Payments</strong> on your sidebar. Toggle the <strong>Cards</strong> switch to 'On' and paste your secret credentials from your Paystack/Stripe dashboard.<br><br>
      <a href="#" onclick="openArticle('payment-methods'); toggleChatDrawer(); return false;" style="color: var(--accent-green); text-decoration: underline; font-weight: 600;">Read complete integration guide →</a>
    `);
  } else if (query.includes('shipping') || query.includes('delivery') || query.includes('fee') || query.includes('zone')) {
    appendChatMessage('bot', `
      🚚 <strong>Shipping & Zones:</strong><br>
      Configure shipping under <strong>Orders & Shipping → Shipping</strong>. You can define location-based rates (e.g. Lagos Island, Mainland) and add weight-based pricing rules.<br><br>
      <a href="#" onclick="openArticle('shipping-options'); toggleChatDrawer(); return false;" style="color: var(--accent-green); text-decoration: underline; font-weight: 600;">Read shipping guide →</a>
    `);
  } else if (query.includes('variant') || query.includes('size') || query.includes('colour') || query.includes('color') || query.includes('option')) {
    appendChatMessage('bot', `
      👕 <strong>Product Variants:</strong><br>
      Open the product editor and enable <strong>Add Variants</strong>. Define attributes like Size or Colour, list options separated by commas, and set distinct prices or stock levels.<br><br>
      <a href="#" onclick="openArticle('variable-products'); toggleChatDrawer(); return false;" style="color: var(--accent-green); text-decoration: underline; font-weight: 600;">Read variants guide →</a>
    `);
  } else if (query.includes('502') || query.includes('gateway') || query.includes('outage') || query.includes('crash')) {
    appendChatMessage('bot', `
      ⚠️ <strong>502 Bad Gateway:</strong><br>
      This represents a temporary hosting server refresh. Your checkout cart details are completely safe. Please wait 2-3 minutes and reload the page.<br><br>
      <a href="#" onclick="openArticle('troubleshooting-faq'); toggleChatDrawer(); return false;" style="color: var(--accent-green); text-decoration: underline; font-weight: 600;">Read troubleshooting details →</a>
    `);
  } else if (query.includes('agent') || query.includes('ticket') || query.includes('live-agent') || query.includes('ash') || query.includes('support')) {
    escalateToLiveAgent();
  } else {
    // Standard default response
    appendChatMessage('bot', `
      I've received your query! Since this knowledge base is connected to your developer <strong>Ash's</strong> unified ticketing system, you can escalate this query directly to a live agent.<br><br>
      <button class="chat-shortcut-btn" onclick="escalateToLiveAgent()" style="margin-top: 0.5rem; background: var(--bg-primary); border-color: var(--accent-green); color: var(--text-primary);">🛠️ Create Support Ticket</button>
    `);
  }
}

function escalateToLiveAgent() {
  appendChatMessage('bot', `🚀 Connecting to Nile Live In-App Chat system...`);
  
  setTimeout(() => {
    const ticketId = 'NL-' + Math.floor(1000 + Math.random() * 9000);
    appendChatMessage('bot', `
      <strong>Ticket Created: #${ticketId}</strong><br>
      We've successfully synced this thread with your merchant dashboard session. A live support developer will contact you shortly directly on your dashboard or via your registered shop email address.
    `);
  }, 1200);
}

function openChatWithEscalation() {
  el.chatDrawer.classList.add('active');
  appendChatMessage('bot', `
    ⚠️ <strong>Ticket Desk Auto-Help:</strong><br>
    I noticed you marked the article as not helpful. Would you like to escalate this issue directly to Nile's expert support team?<br><br>
    <button class="chat-shortcut-btn" onclick="escalateToLiveAgent()" style="background: var(--bg-primary); border-color: var(--accent-green); color: var(--text-primary);">🛠️ Escalate & Sync Ticket Now</button>
  `);
}

// --- BIND EVENT LISTENERS ---
function bindEvents() {
  // Theme toggle
  el.themeBtn.addEventListener('click', toggleTheme);
  
  // Back to home
  el.backBtn.addEventListener('click', () => {
    state.currentView = 'home';
    updatePortalView();
  });
  
  // Logo home navigation
  document.getElementById('nav-logo').addEventListener('click', e => {
    e.preventDefault();
    state.currentView = 'home';
    updatePortalView();
  });
  
  // Search actions
  el.searchInput.addEventListener('input', e => {
    handleSearch(e.target.value);
  });
  
  // Close search results dropdown if clicked outside
  document.addEventListener('click', e => {
    if (!el.searchInput.contains(e.target) && !el.searchResultsBox.contains(e.target)) {
      el.searchResultsBox.classList.remove('active');
    }
  });
  
  // Quick Search Tags
  const bindQuickTag = (btn, term) => {
    if(btn) {
      btn.addEventListener('click', () => {
        el.searchInput.value = term;
        handleSearch(term);
        el.searchInput.focus();
      });
    }
  };
  bindQuickTag(el.tagPaystack, 'paystack');
  bindQuickTag(el.tagSizeguide, 'size guide');
  bindQuickTag(el.tagBuilder, 'website builder');
  bindQuickTag(el.tagPreorder, 'pre-order');
  bindQuickTag(el.tag502, '502 gateway');
  
  // Helpful ratings
  el.feedbackYes.addEventListener('click', () => handleFeedback(true));
  el.feedbackNo.addEventListener('click', () => handleFeedback(false));
  
  // Support Chat Triggering
  el.chatBubble.addEventListener('click', toggleChatDrawer);
  el.chatCloseBtn.addEventListener('click', toggleChatDrawer);
  el.ctaChatBtn.addEventListener('click', toggleChatDrawer);
  el.footerChatLink.addEventListener('click', e => {
    e.preventDefault();
    toggleChatDrawer();
  });
  
  // Chat message sending
  el.chatSendBtn.addEventListener('click', handleSendMessage);
  el.chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSendMessage();
  });
  
  // Chat Shortcuts links inside message log
  el.chatMessages.addEventListener('click', e => {
    const btn = e.target.closest('.chat-shortcut-btn');
    if (btn) {
      const query = btn.getAttribute('data-query');
      if (query === 'live-agent') {
        escalateToLiveAgent();
      } else {
        appendChatMessage('user', btn.textContent);
        setTimeout(() => {
          botReply(query);
        }, 800);
      }
    }
  });
  

}

// --- INIT APP ---
async function init() {
  initTheme();
  await initDatabase();
  renderCategories();
  renderFeaturedArticles();
  bindEvents();
}

// Run app init on load
document.addEventListener('DOMContentLoaded', init);

// Expose functions globally for dynamic inline onclick handlers in bot messages
window.escalateToLiveAgent = escalateToLiveAgent;
window.openArticle = openArticle;
window.toggleChatDrawer = toggleChatDrawer;
