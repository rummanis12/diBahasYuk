// home.js - Halaman Beranda
import { auth } from './akun.js';
import { 
  showToast, 
  setupSidebar, 
  setupSubjectsMenu,
  updateAuthUI,
  initFeather
} from './fitur.js';

// ========== ELEMENTS ==========
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

// ========== AUTH HANDLERS ==========
// Login dengan Google
if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    try {
      const { loginWithGoogle } = await import('./akun.js');
      await loginWithGoogle();
      showToast('✅ Login berhasil! Selamat datang!');
    } catch (error) {
      console.error('Login error:', error);
      showToast('Login gagal: ' + error.message, true);
    }
  });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      const { logoutUser } = await import('./akun.js');
      await logoutUser();
      showToast('👋 Anda telah logout.');
    } catch (error) {
      console.error('Logout error:', error);
      showToast('Logout gagal: ' + error.message, true);
    }
  });
}

// ========== AUTH STATE ==========
auth.onAuthStateChanged((user) => {
  updateAuthUI(user);
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      // Tutup sidebar dulu
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('overlay');
      if (sidebar?.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
      }
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========== SIDEBAR & SUBJECTS ==========
setupSidebar();
setupSubjectsMenu();

// ========== FEATHER ICONS ==========
initFeather();

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ========== TOAST SELAMAT DATANG ==========
setTimeout(() => {
  const user = auth.currentUser;
  if (user) {
    showToast(`Selamat datang kembali, ${user.displayName || 'Pengguna'}! 🎉`);
  }
}, 1000);

console.log('✅ Home page loaded successfully!');