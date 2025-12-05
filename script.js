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



// ... (Kode JS sebelumnya untuk AOS, Navbar, Project dll. tetap di atas)

// ====================================
// === MUSIC PLAYER FUNCTIONALITY ===
// ====================================

(() => {
    // 1. Ambil Elemen DOM
    const audio = $('#bgMusic');
    const triggerBtn = $('#musicTriggerBtn');
    const modal = $('#musicControlModal');
    const closeBtn = $('#closeModalBtn');
    const playPauseBtn = $('#playPauseBtn');
    const nextBtn = $('#nextBtn');
    const prevBtn = $('#prevBtn');
    const shuffleBtn = $('#shuffleBtn');
    const progressBar = $('#progressBar');
    const currentTimeEl = $('#currentTime');
    const totalDurationEl = $('#totalDuration');
    const volumeSlider = $('#volumeSlider');
    const playlistList = $('#playlistList');
    
    // ELEMEN UNTUK TOGGLE PLAYLIST
    const playlistToggleBtn = $('#playlistToggleBtn'); 
    const playlistWrap = $('#playlistWrap'); // Container yang di-toggle

    // Daftar Lagu (Diambil dari data-src di HTML)
    const trackItems = $$('.track-item', playlistList);

    const playlist = trackItems.map(item => ({
        name: item.textContent,
        src: item.dataset.src || 'bg-music.mp3' // Fallback aman
    }));
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffle = false;

    // Fungsi Pembantu
    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const updatePlayPauseIcon = () => {
        // Unicode untuk Pause (||) vs Play (▶)
        playPauseBtn.innerHTML = isPlaying ? '&#x23F8;' : '&#x25B6;'; 
    };

    const updateActiveTrack = (index) => {
        trackItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
            // Scroll ke lagu aktif hanya jika playlist terbuka
            if (i === index && playlistWrap.style.display === 'block') {
                 item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    };

    // 2. Fungsi Utama Player
    const loadTrack = (index) => {
        currentTrackIndex = index;
        const track = playlist[currentTrackIndex];
        audio.src = track.src;
        updateActiveTrack(index);
        
        // Memuat metadata lagu (durasi)
        audio.addEventListener('loadedmetadata', () => {
            totalDurationEl.textContent = formatTime(audio.duration);
            progressBar.max = audio.duration;
            if (isPlaying) {
                audio.play().catch(e => console.log('Autoplay prevented on track change:', e));
            }
        }, { once: true });

        // Mulai play setelah load, jika sedang playing
        if (isPlaying) audio.play().catch(e => console.log('Play failed:', e));
    };

    const playPause = () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            // Coba putar, tangani jika autoplay diblokir
            audio.play().then(() => {
                isPlaying = true;
            }).catch(e => {
                console.log('Play failed, likely autoplay block:', e);
                isPlaying = false;
            });
        }
        updatePlayPauseIcon();
    };

    const skipTrack = (direction = 1) => {
        let newIndex;
        if (isShuffle) {
            // Putar acak
            do {
                newIndex = Math.floor(Math.random() * playlist.length);
            } while (newIndex === currentTrackIndex && playlist.length > 1);
        } else {
            newIndex = (currentTrackIndex + direction + playlist.length) % playlist.length;
        }
        
        if (playlist.length > 0) {
            loadTrack(newIndex);
        }

        if (isPlaying) audio.play();
    };

    // 3. EVENT LISTENERS
    
    // Trigger Modal (Titik Tiga)
    triggerBtn.addEventListener('click', () => {
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    });

    // Close Modal (Tombol X)
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Kontrol Player
    playPauseBtn.addEventListener('click', playPause);
    nextBtn.addEventListener('click', () => skipTrack(1));
    prevBtn.addEventListener('click', () => skipTrack(-1));

    // Kontrol Shuffle
    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        // Beri warna kuning (accent) jika shuffle aktif
        shuffleBtn.style.color = isShuffle ? 'var(--accent)' : '#b3b3b3';
    });
    
    // Kontrol Toggle Playlist (Garis Tiga Horizontal - &#x2261;)
    playlistToggleBtn.addEventListener('click', (e) => {
        const isHidden = playlistWrap.style.display === 'none' || playlistWrap.style.display === '';
        
        // Toggle tampilan Playlist dan Volume
        playlistWrap.style.display = isHidden ? 'block' : 'none';
        
        // Beri highlight pada tombol saat playlist terbuka
        e.target.style.color = isHidden ? 'var(--accent)' : '#b3b3b3';
    });


    // Audio Events
    audio.addEventListener('timeupdate', () => {
        progressBar.value = audio.currentTime;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
        // Otomatis skip ke lagu berikutnya
        skipTrack(1);
    });

    // Progress Bar (User drag)
    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });

    // Volume Slider
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });

    // Playlist Click
    trackItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index !== currentTrackIndex) {
                loadTrack(index);
                isPlaying = true; // Langsung putar setelah ganti
                updatePlayPauseIcon();
            } else {
                // Jika lagu yang sama diklik, toggle play/pause
                playPause();
            }
            // Opsional: Tutup modal playlist setelah lagu diklik
            if (playlistWrap.style.display === 'block') {
                playlistToggleBtn.click(); 
            }
        });
    });
    
    // Tutup modal saat user scroll
    window.addEventListener('scroll', () => {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });


    // 4. Inisialisasi
    if (playlist.length > 0) {
        // Set Volume awal (dari slider value)
        audio.volume = volumeSlider.value;
        // Load track pertama saat halaman dimuat
        loadTrack(0); 
    }

})();

const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotBox = document.getElementById("chatbot-box");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotForm = document.getElementById("chatbot-form");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");

    let firstOpen = true;

    // ADD MESSAGE TO CHAT WINDOW (memastikan class 'chat' terpakai)
    function addMessage(msg, sender) {
        const div = document.createElement("div");
        const senderClass = sender === "rai" ? "bot" : "user";
        div.className = `chat ${senderClass}`; 
        div.innerText = msg;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }


    // OPEN CHATBOT
    chatbotToggle.onclick = () => {
        chatbotBox.style.display = "flex";
        chatbotToggle.style.display = "none"; 

        if (firstOpen) {
            setTimeout(() =>
                addMessage("Halo aku RAI 👋 Siap bantu jelajahi website ini?", "rai")
            , 400);
            firstOpen = false;
        }
    };

    // CLOSE CHATBOT
    chatbotClose.onclick = () => {
        chatbotBox.style.display = "none";
        chatbotToggle.style.display = "block";
    }

    // HANDLE CHAT INPUT
    chatbotForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const text = chatbotInput.value.trim();
        if (!text) return;

        addMessage(text, "user");
        chatbotInput.value = ""; 

        const response = RAI_Respond(text);

        // Auto scroll to page if navigation response
        if (response.includes("pindah ke bagian")) {
            const section = response.split(" ")[4]; 
            
            setTimeout(() => {
                const target = document.getElementById(section);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
                addMessage(response, "rai");
            }, 400);
        } else {
            setTimeout(() => addMessage(response, "rai"), 400);
        }
    });