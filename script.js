// ---------- Init AOS ----------
AOS.init({ duration: 700, once: true });

// ---------- Helpers ----------
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

// ---------- NAVBAR & MOBILE MENU ----------
const hamburger = $('#hamburger');
const navLinks = $('#nav-links');
const mobileOverlay = $('#mobile-overlay');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('show');
    mobileOverlay.style.display = open ? 'block' : 'none';
    hamburger.setAttribute('aria-expanded', String(open));
    mobileOverlay.setAttribute('aria-hidden', String(!open));
    if (!open) mobileOverlay.style.display = 'none';
  });

  // close when overlay clicked
  mobileOverlay.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('show');
    mobileOverlay.style.display = 'none';
    hamburger.setAttribute('aria-expanded', 'false');
  });

  // close mobile menu on link click
  $$('.nav-link').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('show');
    mobileOverlay.style.display = 'none';
    hamburger.setAttribute('aria-expanded', 'false');
  }));
}

// ---------- ACTIVE NAV LINK ----------
const sections = $$('main section[id]');
const navItems = $$('.nav-link');

if ('IntersectionObserver' in window && sections.length) {
  const obsOptions = { root: null, threshold: 0.55 };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, obsOptions);
  sections.forEach(sec => obs.observe(sec));
} else {
  window.addEventListener('scroll', () => {
    let current = sections[0]?.id || '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  });
}

// ---------- TYPED SUBTITLE ----------
(() => {
  const el = $('#typed-role');
  if (!el) return;
  const words = ['API system', 'basic phyton', 'a database', 'How to clear bug'];
  let i = 0, j = 0, forward = true;
  const typeSpeed = 70, pause = 1000;

  function tick(){
    const word = words[i];
    if (forward) {
      j++;
      el.textContent = word.slice(0,j);
      if (j === word.length) { forward = false; setTimeout(tick, pause); return; }
    } else {
      j--;
      el.textContent = word.slice(0,j);
      if (j === 0) { forward = true; i = (i+1) % words.length; }
    }
    setTimeout(tick, forward ? typeSpeed : 30);
  }
  tick();
})();

// ---------- PROJECT FILTER ----------
const filterBtns = $$('.filter-btn');
const projectCards = $$('.project-card');

if (filterBtns.length) {
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const tags = card.dataset.tags?.split(',')?.map(s=>s.trim()) || [];
      if (filter === 'all' || tags.includes(filter)) {
        card.style.display = '';
        card.setAttribute('aria-hidden','false');
      } else {
        card.style.display = 'none';
        card.setAttribute('aria-hidden','true');
      }
    });
  }));
}

// ---------- FLIP on click (tanpa tilt, delay 3 detik) ----------
projectCards.forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.open-project') || e.target.closest('a')) return;

    card.classList.add('flipped'); // balik ke belakang

    setTimeout(() => {
      card.classList.remove('flipped'); // balik lagi ke depan setelah 3 detik
    }, 3000);
  });
});

// ---------- PROJECT MODAL ----------
const modal = $('#project-modal');
const modalTitle = $('#modal-title');
const modalDesc = $('#modal-desc');
const modalMedia = $('.modal-media') || null;
const openBtns = $$('.open-project');

openBtns.forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const card = e.target.closest('.project-card');
    if (!card) return;
    const title = card.dataset.title || 'Project';
    const desc = card.dataset.desc || '';
    const img = card.dataset.img || '';

    if (modal && modalTitle && modalDesc) {
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      if (modalMedia) modalMedia.style.backgroundImage = img ? `url(${img})` : '';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
    }
  });
});

// close modal
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('.modal-close')) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
    }
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); }
  });
}

// ---------- BACK TO TOP ----------
const backToTop = $('#backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 320) backToTop.style.display = 'flex';
    else backToTop.style.display = 'none';
  });
  backToTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}

// ---------- CONTACT FORM (fake submit) ----------
const form = $('#contact-form');
const toast = $('#toast');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    toast.textContent = 'Message sent — I will reply soon! ✨';
    toast.style.opacity = '1';
    setTimeout(()=>{ toast.style.opacity = '0'; }, 2600);
    form.reset();
  });
}

// ---------- small polish: current year ----------
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Auto-hide Navbar + Glass Effect ----------
let lastScrollY = window.scrollY;
const navWrap = document.querySelector('.nav-wrap');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    navWrap.classList.add('hide'); // scroll down
  } else {
    navWrap.classList.remove('hide'); // scroll up
  }
  lastScrollY = window.scrollY;

  if (window.scrollY > 60) {
    navWrap.classList.add('scrolled');
  } else {
    navWrap.classList.remove('scrolled');
  }
});

document.addEventListener('mousemove', (e) => {
  if (e.clientY <= 60) {
    navWrap.classList.remove('hide');
  }
});

// ---------- SEA INTRO SCREEN ----------
const intro = document.getElementById('intro-screen');
const enterBtn = document.getElementById('enter-btn');

if (intro && enterBtn) {
  document.body.style.overflow = 'hidden'; // lock scroll saat intro
  enterBtn.addEventListener('click', () => {
    intro.classList.add('hide');
    setTimeout(() => {
      intro.remove();
      document.body.style.overflow = 'auto'; // unlock scroll
    }, 1200);
  });
}

const fish = document.querySelector('.fish');
const splash = document.querySelector('.splash');

function randomJump() {
  const screenWidth = window.innerWidth;
  const randomX = Math.random() * (screenWidth - 100); // posisi acak
  const jumpDuration = 2000 + Math.random() * 1000; // 2–3 detik lompat

  // posisi awal
  fish.style.left = `${randomX}px`;
  fish.style.bottom = `-60px`;
  fish.style.opacity = 1;
  fish.style.animation = `fishJump ${jumpDuration}ms ease-in-out`;

  setTimeout(() => {
    splash.style.left = `${randomX}px`;
    splash.style.animation = `splashEffect 600ms ease-out`;
    splash.style.opacity = 1;

    // reset efek
    setTimeout(() => {
      fish.style.animation = '';
      splash.style.animation = '';
      splash.style.opacity = 0;
    }, 700);
  }, jumpDuration - 300);

  // jadwal lompat berikut
  const nextJump = 3000 + Math.random() * 2000; // 3–5 detik
  setTimeout(randomJump, nextJump);
}

window.addEventListener('load', () => {
  setTimeout(randomJump, 1500);
});


// === Chatbot Handler ===
const chatForm = document.querySelector("#chatbot-form");
const chatInput = document.querySelector("#chatbot-input");
const chatBox = document.querySelector("#chatbot-messages");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  // tampilkan pesan user
  const userMsg = document.createElement("div");
  userMsg.className = "chat user";
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);

  chatInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // kirim ke backend Node.js
  try {
    const res = await fetch("http://localhost:3030/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // tampilkan balasan AI
    const botMsg = document.createElement("div");
    botMsg.className = "chat bot";
    botMsg.textContent = data.reply || "Maaf, aku nggak bisa jawab itu 😅";
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    console.error(err);
  }
});

// === Chatbot Toggle ===
const toggleBtn = document.querySelector("#chatbot-toggle");
const chatBoxContainer = document.querySelector("#chatbot-box");
const closeBtn = document.querySelector("#chatbot-close");

// Buka / tutup lewat tombol utama
toggleBtn.addEventListener("click", () => {
  chatBoxContainer.style.display =
    chatBoxContainer.style.display === "none" || !chatBoxContainer.style.display
      ? "flex"
      : "none";
});

// Tutup lewat tombol X
closeBtn.addEventListener("click", () => {
  chatBoxContainer.style.display = "none";
});

