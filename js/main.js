// ==== CONSTANTS ============================================

const GITHUB_USER = 'keinest';
const ADMIN_PASSWORD = 'soulking2025';
const STORAGE_KEY_PENDING = 'sk_testimonials_pending';
const STORAGE_KEY_APPROVED = 'sk_testimonials_approved';

// ==== DOM READY ================================================

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavbar();
  initTyping();
  initScrollAnimations();
  initCounters();
  initSkillTabs();
  initSkillBars();
  initGitHubProjects();
  initProjectFilter();
  initTestimonials();
  initContactForm();
  initBackToTop();
  initAdminPanel();
  initStarRating();
  initCanvas();
});

// ==== LOADER ================================================

function initLoader() 
{
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2000);
  });
  setTimeout(() => loader.classList.add('hidden'), 3500);
}

// ==== CUSTOM CURSOR ========================================

function initCursor() 
{
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => 
  {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() 
  {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverEls = document.querySelectorAll('a, button, .skill-card, .project-card, .service-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ==== NAVBAR ================================================

function initNavbar() 
{
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const allLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveLink();
  });

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close on link click
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle?.classList.remove('active');
      links?.classList.remove('open');
    });
  });

  // Active link on scroll
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sTop = section.offsetTop - 120;
      if (window.scrollY >= sTop) current = section.getAttribute('id');
    });
    allLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }
}

// ==== TYPING EFFECT ========================================

function initTyping() 
{
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Développeur Full Stack',
    'React & Node.js Expert',
    'Mobile Developer (React Native)',
    'Cloud & DevOps Engineer',
    'Cybersecurity Enthusiast',
    'Marketing Digital',
    'API & Backend Architect',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) 
	{
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } 
	else 
	{
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 50 : 80;

    if (!isDeleting && charIndex === current.length) 
	{
      delay = 2000;
      isDeleting = true;
    } 
	else if (isDeleting && charIndex === 0) 
	{
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 1000);
}

// ==== SCROLL ANIMATIONS ====================================

function initScrollAnimations() 
{
  const items = document.querySelectorAll('.service-card, .skill-card, .project-card, .mkt-card, .security-card, .testi-card, .section-header, .about-grid, .contact-layout');

  items.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(entries => 
  {
    entries.forEach(entry => 
	{
      if (entry.isIntersecting) 
	  {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => observer.observe(el));
}

// ==== COUNTERS ================================================

function initCounters() 
{
  const counters = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver(entries => 
  {
    entries.forEach(entry => 
	{
      if (entry.isIntersecting) 
	  {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let count = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) { count = target; clearInterval(timer); }
          el.textContent = count;
        }, 40);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ==== SKILL TABS ============================================

function initSkillTabs() 
{
  const tabs = document.querySelectorAll('.skill-tab');
  const panels = document.querySelectorAll('.skill-panel');

  tabs.forEach(tab => 
  {
    tab.addEventListener('click', () => 
	{
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tab-' + tab.dataset.tab);
      if (panel) 
	  {
        panel.classList.add('active');
        animateSkillBarsInPanel(panel);
      }
    });
  });

  // Animate initial panel
  
  const initialPanel = document.getElementById('tab-frontend');
  if (initialPanel) animateSkillBarsInPanel(initialPanel);
}

function initSkillBars() {
  // Bars animated on tab switch
}

function animateSkillBarsInPanel(panel) 
{
  const cards = panel.querySelectorAll('.skill-card');
  cards.forEach((card, i) => 
  {
    setTimeout(() => {
      card.classList.add('animated');
    }, i * 80);
  });
}

// ==== GITHUB PROJECTS ====================================

async function initGitHubProjects() 
{
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  try 
  {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12&type=public`);

    if (!res.ok) throw new Error('GitHub API error');

    const repos = await res.json();

    if (!repos || repos.length === 0) {
      grid.innerHTML = `
        <div class="no-projects">
          <i class="fab fa-github"></i>
          <p>Aucun dépôt public trouvé pour <strong>${GITHUB_USER}</strong>.</p>
        </div>`;
      return;
    }

    // Store all repos for filtering
    window._allRepos = repos;
    renderProjects(repos);

  } catch (err) {
    // Show sample projects as fallback
    grid.innerHTML = `
      <div class="error-projects">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Impossible de charger les projets GitHub en ce moment.<br/>
        <a href="https://github.com/${GITHUB_USER}" target="_blank">Voir directement sur GitHub →</a></p>
      </div>`;
  }
}

function renderProjects(repos) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  if (repos.length === 0) {
    grid.innerHTML = `<div class="no-projects"><i class="fab fa-github"></i><p>Aucun projet dans cette catégorie.</p></div>`;
    return;
  }

  const langColors = {
    JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
    Java: '#b07219', PHP: '#4F5D95', CSS: '#563d7c', HTML: '#e34c26',
    Shell: '#89e051', Go: '#00ADD8', Rust: '#dea584'
  };

  const repoIcons = {
    JavaScript: '⚡', TypeScript: '🔷', Python: '🐍',
    Java: '☕', PHP: '🐘', CSS: '🎨', HTML: '🌐',
    Shell: '💻', Go: '🔵', Rust: '🦀', default: '📦'
  };

  grid.innerHTML = repos.map(repo => {
    const lang = repo.language || 'Other';
    const color = langColors[lang] || '#0ea5e9';
    const icon = repoIcons[lang] || repoIcons.default;
    const desc = repo.description || 'Projet GitHub — aucune description fournie.';
    const dateStr = new Date(repo.updated_at).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });

    return `
      <div class="project-card fade-in" data-lang="${lang.toLowerCase()}">
        <div class="project-header">
          <div class="project-icon">${icon}</div>
          <div class="project-links">
            <a href="${repo.html_url}" target="_blank" class="project-link" title="Voir sur GitHub">
              <i class="fab fa-github"></i>
            </a>
            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-link" title="Voir le site"><i class="fas fa-external-link-alt"></i></a>` : ''}
          </div>
        </div>
        <div class="project-name">${repo.name}</div>
        <p class="project-desc">${desc}</p>
        <div class="project-meta">
          <div class="project-lang">
            <span class="lang-dot" style="background:${color}"></span>
            ${lang}
          </div>
          <div class="project-stars">
            <i class="fas fa-star"></i> ${repo.stargazers_count}
            &nbsp;&nbsp;<i class="fas fa-code-branch"></i> ${repo.forks_count}
          </div>
        </div>
      </div>`;
  }).join('');

  // Trigger fade-in
  setTimeout(() => {
    grid.querySelectorAll('.project-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 80);
    });
  }, 50);
}

// ==== PROJECT FILTER ========================================
function initProjectFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      if (!window._allRepos) return;

      const filtered = filter === 'all'
        ? window._allRepos
        : window._allRepos.filter(r => r.language?.toLowerCase() === filter);

      renderProjects(filtered);
    });
  });
}

// ==== TESTIMONIALS ========================================

function initTestimonials() {
  renderTestimonials();
  initTestiForm();
}

function getApproved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY_APPROVED) || '[]'); } catch { return []; }
}

function getPending() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY_PENDING) || '[]'); } catch { return []; }
}

function saveApproved(data) {
  localStorage.setItem(STORAGE_KEY_APPROVED, JSON.stringify(data));
}

function savePending(data) {
  localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(data));
}

function renderTestimonials() {
  const grid = document.getElementById('testiGrid');
  if (!grid) return;

  const approved = getApproved();

  if (approved.length === 0) {
    grid.innerHTML = `<div class="testi-empty"><i class="fas fa-comments"></i><p>Aucun témoignage pour l'instant. Soyez le premier !</p></div>`;
    return;
  }

  grid.innerHTML = approved.map(t => {
    const stars = Array.from({ length: 5 }, (_, i) =>
      `<i class="fas fa-star${i < t.rating ? '' : ' empty'}"></i>`).join('');
    const initials = t.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    const date = new Date(t.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    return `
      <div class="testi-card fade-in visible">
        <div class="testi-quote">"</div>
        <p class="testi-text">${escapeHTML(t.text)}</p>
        <div class="testi-stars">${stars}</div>
        <div class="testi-author">
          <div class="testi-avatar">${initials}</div>
          <div>
            <div class="testi-name">${escapeHTML(t.name)}</div>
            ${t.role ? `<div class="testi-role">${escapeHTML(t.role)}</div>` : ''}
          </div>
          <div class="testi-date">${date}</div>
        </div>
      </div>`;
  }).join('');
}

function initTestiForm() {
  const form = document.getElementById('testiForm');
  const success = document.getElementById('testiSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('testiName').value.trim();
    const role = document.getElementById('testiRole').value.trim();
    const text = document.getElementById('testiText').value.trim();
    const rating = parseInt(document.getElementById('testiRating').value);

    if (!name || !text) return alert('Veuillez remplir tous les champs obligatoires.');
    if (rating === 0) return alert('Veuillez attribuer une note.');

    const testi = {
      id: Date.now().toString(),
      name, role, text, rating,
      date: new Date().toISOString()
    };

    const pending = getPending();
    pending.push(testi);
    savePending(pending);

    form.style.display = 'none';
    success.style.display = 'block';
    form.reset();
    resetStars();
  });
}

// ==== STAR RATING ============================================

function initStarRating() {
  const stars = document.querySelectorAll('#starRating span');
  const input = document.getElementById('testiRating');
  if (!stars.length || !input) return;

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.val);
      input.value = val;
      stars.forEach((s, i) => {
        s.classList.toggle('active', i < val);
      });
    });

    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.val);
      stars.forEach((s, i) => {
        s.classList.toggle('active', i < val);
      });
    });
  });

  document.getElementById('starRating')?.addEventListener('mouseleave', () => {
    const currentVal = parseInt(input.value);
    stars.forEach((s, i) => {
      s.classList.toggle('active', i < currentVal);
    });
  });
}

function resetStars() {
  const stars = document.querySelectorAll('#starRating span');
  stars.forEach(s => s.classList.remove('active'));
  const input = document.getElementById('testiRating');
  if (input) input.value = 0;
}

// ==== CONTACT FORM ========================================

function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const subject = document.getElementById('cSubject').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    if (!name || !email || !subject || !message) return;

    // Open mailto
    const mailtoLink = `mailto:linedevils271@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink, '_blank');

    success.style.display = 'flex';
    setTimeout(() => { success.style.display = 'none'; }, 5000);
    form.reset();
  });
}

// ==== BACK TO TOP ============================================

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ==== ADMIN PANEL ============================================

function initAdminPanel() {
  const footer = document.querySelector('.footer-brand');
  if (!footer) return;

  let clickCount = 0;
  let clickTimer = null;

  footer.addEventListener('click', () => {
    clickCount++;
    if (clickTimer) clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 800);
    if (clickCount >= 3) {
      clickCount = 0;
      openAdmin();
    }
  });

  // Also keyboard shortcut: Ctrl + Shift + A
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      openAdmin();
    }
  });
}

function openAdmin() {
  const modal = document.getElementById('adminModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.classList.add('admin-open');
  document.getElementById('adminPass').focus();
}

function closeAdmin() {
  const modal = document.getElementById('adminModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.classList.remove('admin-open');
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('adminLogin').style.display = 'flex';
  document.getElementById('adminPass').value = '';
}

window.closeAdmin = closeAdmin;

function adminLogin() {
  const pass = document.getElementById('adminPass').value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    renderAdminPanel();
  } else {
    document.getElementById('adminPass').style.borderColor = '#ff3d71';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminPass').placeholder = 'Mot de passe incorrect...';
    setTimeout(() => {
      document.getElementById('adminPass').style.borderColor = '';
      document.getElementById('adminPass').placeholder = 'Mot de passe admin';
    }, 2000);
  }
}

window.adminLogin = adminLogin;

function renderAdminPanel() {
  const pendingDiv = document.getElementById('pendingList');
  const approvedDiv = document.getElementById('approvedList');
  const pending = getPending();
  const approved = getApproved();

  pendingDiv.innerHTML = pending.length === 0
    ? `<p class="admin-empty">Aucun témoignage en attente ✓</p>`
    : pending.map(t => `
        <div class="admin-testi-item">
          <strong>${escapeHTML(t.name)}</strong> — ${Array(t.rating + 1).join('★')}
          ${t.role ? `<span style="font-size:.8rem;color:var(--text2)"> · ${escapeHTML(t.role)}</span>` : ''}
          <p>${escapeHTML(t.text)}</p>
          <div class="admin-actions">
            <button class="btn-approve" onclick="approveTestimonial('${t.id}')">✓ Approuver</button>
            <button class="btn-delete" onclick="deleteTestimonial('${t.id}', 'pending')">✕ Supprimer</button>
          </div>
        </div>`).join('');

  approvedDiv.innerHTML = approved.length === 0
    ? `<p class="admin-empty">Aucun témoignage publié.</p>`
    : approved.map(t => `
        <div class="admin-testi-item">
          <strong>${escapeHTML(t.name)}</strong> — ${Array(t.rating + 1).join('★')}
          <p>${escapeHTML(t.text)}</p>
          <div class="admin-actions">
            <button class="btn-delete" onclick="deleteTestimonial('${t.id}', 'approved')">✕ Retirer</button>
          </div>
        </div>`).join('');
}

function approveTestimonial(id) {
  const pending = getPending();
  const idx = pending.findIndex(t => t.id === id);
  if (idx === -1) return;
  const [testi] = pending.splice(idx, 1);
  savePending(pending);
  const approved = getApproved();
  approved.unshift(testi);
  saveApproved(approved);
  renderAdminPanel();
  renderTestimonials();
}

function deleteTestimonial(id, type) {
  if (type === 'pending') {
    const pending = getPending().filter(t => t.id !== id);
    savePending(pending);
  } else {
    const approved = getApproved().filter(t => t.id !== id);
    saveApproved(approved);
    renderTestimonials();
  }
  renderAdminPanel();
}

window.approveTestimonial = approveTestimonial;
window.deleteTestimonial = deleteTestimonial;

// Close admin on backdrop click
document.getElementById('adminModal')?.addEventListener('click', e => {
  if (e.target === document.getElementById('adminModal')) closeAdmin();
});

// ==== CANVAS PARTICLES ====================================
function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const count = Math.min(60, Math.floor(window.innerWidth / 20));

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(14, 165, 233, ${p.opacity})`;
      ctx.fill();
    });

    // Draw connections
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach(b => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(14, 165, 233, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// ==== UTILS ====================================================

function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str || ''));
  return div.innerHTML;
}

// ==== SMOOTH SECTION REVEAL ============================

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 60);
      });
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));

console.log('%c 🚀 Soulking Portfolio — Keinest ', 'background:#0ea5e9;color:#03080f;padding:8px 16px;border-radius:6px;font-weight:bold;font-size:14px');
console.log('%c Admin: Ctrl+Shift+A ou triple-clic sur footer', 'color:#0ea5e9;font-family:monospace');
