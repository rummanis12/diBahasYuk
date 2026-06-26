// fitur.js - Utility Functions
import { auth } from './akun.js';

// ========== TOAST ==========
export function showToast(msg, isErr = false) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = msg;
  toast.style.background = isErr ? '#D16F5A' : 'var(--primary)';
  toast.classList.add('show');
  
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ========== SIDEBAR ==========
export function setupSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const menuToggle = document.getElementById('menu-toggle');
  const closeSidebarBtn = document.getElementById('close-sidebar');
  
  if (!sidebar || !overlay) return;
  
  function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  menuToggle?.addEventListener('click', openSidebar);
  closeSidebarBtn?.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  
  // Close sidebar on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });
}

// ========== SUBJECTS MENU ==========
export function setupSubjectsMenu() {
  const subjectsMenu = document.getElementById('subjects-menu');
  const materiList = document.getElementById('materi-list');
  
  if (subjectsMenu && materiList) {
    subjectsMenu.addEventListener('click', (e) => {
      e.preventDefault();
      materiList.classList.toggle('active');
      
      // Toggle chevron icon
      const chevron = subjectsMenu.querySelector('.fa-chevron-down');
      if (chevron) {
        chevron.style.transform = materiList.classList.contains('active') 
          ? 'rotate(180deg)' 
          : 'rotate(0)';
      }
    });
  }
}

// ========== HOME BUTTON ==========
export function setupHomeButton() {
  const homeBtn = document.getElementById('homeBtn');
  if (homeBtn) {
    homeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'home.html';
      showToast('🏠 Kembali ke beranda');
    });
  }
}

// ========== PROGRESS BAR ==========
export function setupProgressBar() {
  const materiBody = document.getElementById('materiBody');
  const progressBar = document.getElementById('materiProgressBar');
  
  if (!materiBody || !progressBar) return;
  
  function updateProgress() {
    const { scrollTop, scrollHeight, clientHeight } = materiBody;
    const progress = scrollHeight > clientHeight 
      ? (scrollTop / (scrollHeight - clientHeight)) * 100 
      : 0;
    progressBar.style.width = Math.min(progress, 100) + '%';
  }
  
  materiBody.addEventListener('scroll', updateProgress);
  
  // Reset progress - can be called from other files
  window.resetMateriProgress = function() {
    materiBody.scrollTop = 0;
    updateProgress();
  };
}

// ========== UTILITIES ==========
export function formatDate(timestamp) {
  if (!timestamp) return "baru saja";
  
  const date = new Date(timestamp);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return `${diff} detik lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function escapeHtml(str) {
  if (!str) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return str.replace(/[&<>"']/g, m => map[m]);
}

export function initFeather() {
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

// ========== AUTH UI ==========
export function updateAuthUI(user) {
  const authSection = document.getElementById('auth-section');
  const userInfoSection = document.getElementById('user-info-section');
  const userAvatar = document.getElementById('user-avatar');
  const commentAvatar = document.getElementById('commentFormAvatar');
  const commentInput = document.getElementById('commentInput');
  const submitBtn = document.getElementById('submitComment');
  
  if (user) {
    const displayName = user.displayName || 'Pengguna';
    const photoURL = user.photoURL;
    
    // Update avatar di komentar (jika ada)
    if (commentAvatar) {
      if (photoURL) {
        commentAvatar.innerHTML = `<img src="${photoURL}" alt="Avatar">`;
      } else {
        commentAvatar.innerHTML = `<span>${displayName.charAt(0).toUpperCase()}</span>`;
      }
    }
    
    // Update avatar di navbar
    if (userAvatar) {
      userAvatar.src = photoURL || '';
      userAvatar.style.display = 'block';
    }
    
    // Tampilkan user info, sembunyikan login
    if (authSection) authSection.style.display = 'none';
    if (userInfoSection) userInfoSection.style.display = 'flex';
    
    // Enable komentar (jika ada)
    if (commentInput) {
      commentInput.disabled = false;
      commentInput.placeholder = 'Tulis komentar kamu di sini...';
    }
    if (submitBtn) submitBtn.disabled = false;
    
  } else {
    // Reset ke state belum login
    if (commentAvatar) {
      commentAvatar.innerHTML = '<span>👤</span>';
    }
    if (userAvatar) userAvatar.style.display = 'none';
    if (authSection) authSection.style.display = 'flex';
    if (userInfoSection) userInfoSection.style.display = 'none';
    if (commentInput) {
      commentInput.disabled = true;
      commentInput.placeholder = 'Login untuk menulis komentar...';
    }
    if (submitBtn) submitBtn.disabled = true;
  }
}