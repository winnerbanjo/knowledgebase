// --- NILE SUPPORT CMS PORTAL ADMIN JS CONTROLLER ---

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

// --- STATE MANAGEMENT ---
const state = {
  activeTheme: localStorage.getItem('nile-theme') || 'light',
  isLoggedIn: sessionStorage.getItem('nile-admin-logged-in') === 'true'
};

// --- DOM SELECTORS ---
const el = {
  html: document.documentElement,
  themeBtn: document.getElementById('theme-toggle-btn'),
  sunIcon: document.getElementById('theme-sun-icon'),
  moonIcon: document.getElementById('theme-moon-icon'),
  
  // Auth Elements
  loginScreen: document.getElementById('admin-login-screen'),
  loginForm: document.getElementById('admin-login-form'),
  loginEmailInput: document.getElementById('admin-email-input'),
  loginPasscodeInput: document.getElementById('admin-passcode-input'),
  loginErrorBlock: document.getElementById('admin-login-error'),
  logoutBtn: document.getElementById('nav-logout-btn'),
  
  // Workspace Elements
  workspaceView: document.getElementById('admin-workspace-view'),
  totalArticlesCount: document.getElementById('admin-total-articles-count'),
  helpfulRate: document.getElementById('admin-helpful-rate'),
  resetDbBtn: document.getElementById('btn-reset-db'),
  
  // CMS Editor Form
  articleForm: document.getElementById('admin-article-form'),
  formArticleId: document.getElementById('form-article-id'),
  formTitle: document.getElementById('form-title'),
  formCategory: document.getElementById('form-category'),
  formReadTime: document.getElementById('form-readtime'),
  formKeywords: document.getElementById('form-keywords'),
  formScreenshot: document.getElementById('form-screenshot'),
  formVideo: document.getElementById('form-video'),
  formBody: document.getElementById('form-body'),
  formActionTitle: document.getElementById('form-action-title'),
  btnSaveArticle: document.getElementById('btn-save-article'),
  btnCancelEdit: document.getElementById('btn-cancel-edit'),
  articlesTbody: document.getElementById('admin-articles-tbody'),
  imageUploadInput: document.getElementById('editor-image-upload'),
  editorToolbar: document.querySelector('.editor-toolbar')
};

// --- THEME MANAGEMENT ---
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

// --- AUTHENTICATION FLOW ---
function updateAuthUI() {
  if (state.isLoggedIn) {
    el.loginScreen.classList.add('admin-hidden');
    el.workspaceView.classList.remove('admin-hidden');
    el.logoutBtn.style.display = 'block';
    renderDashboard();
  } else {
    el.loginScreen.classList.remove('admin-hidden');
    el.workspaceView.classList.add('admin-hidden');
    el.logoutBtn.style.display = 'none';
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = el.loginEmailInput.value.trim();
  const passcode = el.loginPasscodeInput.value.trim();
  
  // Secure Mock Authentication validation
  // Accepting admin passcode: nileadmin2026
  if (email && passcode === 'nileadmin2026') {
    state.isLoggedIn = true;
    sessionStorage.setItem('nile-admin-logged-in', 'true');
    el.loginErrorBlock.style.display = 'none';
    el.loginForm.reset();
    updateAuthUI();
  } else {
    el.loginErrorBlock.style.display = 'block';
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to log out of the admin console?')) {
    state.isLoggedIn = false;
    sessionStorage.removeItem('nile-admin-logged-in');
    updateAuthUI();
  }
}

// --- CMS DASHBOARD RENDERERS ---
function renderDashboard() {
  // Compute Total Guides Count
  el.totalArticlesCount.textContent = dbArticles.length;
  
  // Compute Overall Helpfulness Rating percentages
  let yesCount = 0;
  let totalRatingCount = 0;
  
  dbArticles.forEach(art => {
    const rating = localStorage.getItem(`rating-${art.id}`);
    if (rating) {
      totalRatingCount++;
      if (rating === 'yes') yesCount++;
    }
  });
  
  const ratingPercent = totalRatingCount > 0 ? Math.round((yesCount / totalRatingCount) * 100) : 100;
  el.helpfulRate.textContent = `${ratingPercent}%`;
  
  // Render active documentation list table
  el.articlesTbody.innerHTML = '';
  
  dbArticles.forEach(art => {
    const rating = localStorage.getItem(`rating-${art.id}`) || 'No Rating';
    const ratingText = rating === 'yes' ? '👍 Helpful' : (rating === 'no' ? '👎 Not Helpful' : '—');
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 600; color: var(--text-primary);">${art.title}</td>
      <td><span style="font-size:0.75rem; background:rgba(45, 111, 81, 0.08); padding:0.2rem 0.5rem; border-radius:4px; color:var(--accent-green); font-weight:500;">${art.categoryName}</span></td>
      <td style="color: var(--text-secondary); max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${art.keywords}</td>
      <td>${ratingText}</td>
      <td>
        <button class="admin-action-btn edit" data-id="${art.id}">Edit</button>
        <button class="admin-action-btn delete" data-id="${art.id}">Delete</button>
      </td>
    `;
    el.articlesTbody.appendChild(tr);
  });
}

// --- CRUD HANDLERS ---
async function saveArticle(e) {
  e.preventDefault();
  
  const id = el.formArticleId.value;
  const title = el.formTitle.value.trim();
  const categoryId = el.formCategory.value;
  const readTime = el.formReadTime.value.trim() || '3 min read';
  const keywords = el.formKeywords.value.trim() || title.toLowerCase();
  const screenshotUrl = el.formScreenshot.value.trim();
  const videoUrl = el.formVideo.value.trim();
  const body = el.formBody.value.trim();
  
  if (!title || !body) {
    alert('Please fill out the article title and body content.');
    return;
  }
  
  const categoryNames = {
    setup: 'Account & Setup',
    storefront: 'Storefront & Design',
    products: 'Product Inventory',
    payments: 'Payments & Gateway',
    shipping: 'Shipping & Locations',
    orders: 'Orders & Invoicing',
    customers: 'Customer Management',
    troubleshooting: 'Troubleshooting & Support'
  };
  
  const articleData = {
    id: id || undefined,
    title,
    category: categoryId,
    categoryName: categoryNames[categoryId] || 'Support Base',
    readTime,
    keywords,
    screenshotUrl,
    videoUrl,
    content: body
  };
  
  try {
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData)
    });
    
    if (!res.ok) throw new Error('Failed to save article on server');
    
    alert('Support article successfully published to help database!');
    
    // Reload database list from server
    await initDatabase();
    
    // Reset Form & Re-render Dashboard
    cancelArticleEdit();
    renderDashboard();
  } catch (err) {
    console.error('Error saving article to server:', err);
    alert('Failed to publish article to MongoDB. Saving to local storage fallback instead.');
    
    // Local Storage Fallback
    if (id) {
      const index = dbArticles.findIndex(art => art.id === id);
      if (index !== -1) {
        articleData.id = id;
        dbArticles[index] = articleData;
      }
    } else {
      const newId = 'art-' + Math.floor(1000 + Math.random() * 9000);
      articleData.id = newId;
      dbArticles.push(articleData);
    }
    localStorage.setItem('nile-kb-articles', JSON.stringify(dbArticles));
    
    cancelArticleEdit();
    renderDashboard();
  }
}

function editArticle(articleId) {
  const art = dbArticles.find(a => a.id === articleId);
  if (!art) return;
  
  // Populate form controls
  el.formArticleId.value = art.id;
  el.formTitle.value = art.title;
  el.formCategory.value = art.category;
  el.formReadTime.value = art.readTime || '';
  el.formKeywords.value = art.keywords || '';
  el.formScreenshot.value = art.screenshotUrl || '';
  el.formVideo.value = art.videoUrl || '';
  el.formBody.value = art.content;
  
  // Update UI texts
  el.formActionTitle.textContent = `Edit Article: "${art.title}"`;
  el.btnSaveArticle.textContent = 'Save Changes';
  el.btnCancelEdit.style.display = 'inline-block';
  
  // Scroll to input view
  el.articleForm.scrollIntoView({ behavior: 'smooth' });
}

async function deleteArticle(articleId) {
  if (!confirm('Are you sure you want to delete this support article?')) return;
  
  try {
    const res = await fetch(`/api/articles/${articleId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('API delete failed');
    
    await initDatabase();
    cancelArticleEdit();
    renderDashboard();
  } catch (err) {
    console.error('Failed to delete article on server, falling back to localStorage...', err);
    dbArticles = dbArticles.filter(art => art.id !== articleId);
    localStorage.setItem('nile-kb-articles', JSON.stringify(dbArticles));
    cancelArticleEdit();
    renderDashboard();
  }
}

function cancelArticleEdit() {
  el.formArticleId.value = '';
  el.articleForm.reset();
  
  el.formActionTitle.textContent = 'Create New Support Article';
  el.btnSaveArticle.textContent = 'Save & Publish';
  el.btnCancelEdit.style.display = 'none';
}

async function resetDatabase() {
  if (!confirm('Are you sure you want to restore default Nile guides? This deletes all custom changes.')) return;
  
  try {
    const res = await fetch('/api/reset', { method: 'POST' });
    if (!res.ok) throw new Error('API reset failed');
    
    alert('Help database successfully reset to default June 2026 guidelines!');
    await initDatabase();
    cancelArticleEdit();
    renderDashboard();
  } catch (err) {
    console.error('Failed to reset server database, falling back to localStorage...', err);
    localStorage.removeItem('nile-kb-articles');
    await initDatabase();
    cancelArticleEdit();
    renderDashboard();
    alert('Local fallback database reset to defaults.');
  }
}

// --- EDITOR TOOLBAR & UPLOAD LOGIC ---

function insertText(beforeText, afterText = '') {
  const textarea = el.formBody;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const selectedText = text.substring(start, end);
  
  const replacement = beforeText + selectedText + afterText;
  textarea.value = text.substring(0, start) + replacement + text.substring(end);
  
  textarea.focus();
  textarea.selectionStart = start + beforeText.length;
  textarea.selectionEnd = start + beforeText.length + selectedText.length;
}

function handleToolbarClick(e) {
  const btn = e.target.closest('.toolbar-btn');
  if (!btn) return;
  
  const id = btn.id;
  
  switch (id) {
    case 'tb-bold':
      insertText('<strong>', '</strong>');
      break;
    case 'tb-italic':
      insertText('<em>', '</em>');
      break;
    case 'tb-underline':
      insertText('<u>', '</u>');
      break;
    case 'tb-h2':
      insertText('<h2>', '</h2>\n');
      break;
    case 'tb-h3':
      insertText('<h3>', '</h3>\n');
      break;
    case 'tb-paragraph':
      insertText('<p>', '</p>\n');
      break;
    case 'tb-ul':
      insertText('<ul>\n  <li>', '</li>\n  <li>Item 2</li>\n</ul>\n');
      break;
    case 'tb-ol':
      insertText('<ol>\n  <li>', '</li>\n  <li>Item 2</li>\n</ol>\n');
      break;
    case 'tb-table':
      const tableTemplate = `<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1 Data 1</td>
      <td>Row 1 Data 2</td>
    </tr>
  </tbody>
</table>\n`;
      insertText(tableTemplate);
      break;
    case 'tb-image':
      el.imageUploadInput.click();
      break;
  }
}

async function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const btn = document.getElementById('tb-image');
  const originalText = btn.innerHTML;
  btn.innerHTML = '⏳ Uploading...';
  btn.disabled = true;
  
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!res.ok) throw new Error('Cloudinary upload endpoint failed');
    const data = await res.json();
    
    if (!data.url) throw new Error('No URL in response');
    
    // Inject Cloudinary image url tag
    const imgTag = `\n<img src="${data.url}" alt="Support uploaded image" class="screenshot-preview">\n`;
    insertText(imgTag);
    
    btn.innerHTML = originalText;
    btn.disabled = false;
    el.imageUploadInput.value = '';
  } catch (err) {
    console.warn('Cloudinary upload failed, falling back to compressed local base64...', err);
    btn.innerHTML = '⚙️ Compressing...';
    
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const maxW = 800;
        const maxH = 800;
        let width = img.width;
        let height = img.height;
        
        if (width > maxW || height > maxH) {
          if (width > height) {
            height = Math.round((height * maxW) / width);
            width = maxW;
          } else {
            width = Math.round((width * maxH) / height);
            height = maxH;
          }
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        const imgTag = `\n<img src="${compressedDataUrl}" alt="Support uploaded image" class="screenshot-preview">\n`;
        insertText(imgTag);
        
        btn.innerHTML = originalText;
        btn.disabled = false;
        el.imageUploadInput.value = '';
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// --- BIND EVENT LISTENERS ---
function bindEvents() {
  // Theme toggler
  el.themeBtn.addEventListener('click', toggleTheme);
  
  // Auth Form actions
  el.loginForm.addEventListener('submit', handleLogin);
  el.logoutBtn.addEventListener('click', handleLogout);
  
  // CMS Form actions
  el.articleForm.addEventListener('submit', saveArticle);
  el.btnCancelEdit.addEventListener('click', cancelArticleEdit);
  el.resetDbBtn.addEventListener('click', resetDatabase);
  
  // Rich Editor Toolbar listeners
  el.editorToolbar.addEventListener('click', handleToolbarClick);
  el.imageUploadInput.addEventListener('change', handleImageUpload);
  
  // Table action buttons (Edit & Delete delegation)
  el.articlesTbody.addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
      const id = e.target.getAttribute('data-id');
      editArticle(id);
    } else if (e.target.classList.contains('delete')) {
      const id = e.target.getAttribute('data-id');
      deleteArticle(id);
    }
  });
}

// --- INIT CMS APP ---
async function init() {
  initTheme();
  await initDatabase();
  updateAuthUI();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);
