/**
 * E-Portofolio PPG Calon Guru PJOK - UNY
 * Rahmat Irnandi, S.Or. - SMK N 3 Kasihan Yogyakarta
 * Nexis Theme Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initMobileNav();
  initContactTabs();
  initReviewsNavigation();
  initModals();
  initPhotoLightbox();
  initGalleryFilter();
});

/* -------------------------------------------------------------
 * Gallery Category Filtering
 * ------------------------------------------------------------- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card-agency');

  if (!filterBtns.length || !galleryCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || cat.includes(filterVal)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 1. Scroll Reveal Animations (IntersectionObserver)
 * ------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-init');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: unobserve once revealed for performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------
 * 2. Mobile Navigation Toggle & Dropdown Handling
 * ------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('dropdown-open'));
      }
    });

    // Support click/tap on dropdown toggles (both desktop and mobile)
    const dropdownToggles = navLinks.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parentDropdown = toggle.closest('.nav-item-dropdown');
        if (parentDropdown) {
          const isOpen = parentDropdown.classList.contains('dropdown-open');
          // Close other open dropdowns first
          document.querySelectorAll('.nav-item-dropdown').forEach(d => {
            if (d !== parentDropdown) d.classList.remove('dropdown-open');
          });
          parentDropdown.classList.toggle('dropdown-open', !isOpen);
        }
      });
    });

    // Close mobile nav when clicking real links (not dropdown toggle)
    navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('dropdown-open'));
      });
    });
  }
}

/* -------------------------------------------------------------
 * 3. Contact Form Tabs Switcher
 * ------------------------------------------------------------- */
function initContactTabs() {
  const tabButtons = document.querySelectorAll('.contact-tab-btn');
  const messageInput = document.getElementById('contact-message');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-tab');
      if (messageInput) {
        if (mode === 'quote') {
          messageInput.placeholder = 'Tuliskan kebutuhan berkas portofolio atau kerjasama akademik yang ingin didiskusikan...';
        } else {
          messageInput.placeholder = 'Tuliskan pesan, pertanyaan, atau tanggapan Anda di sini...';
        }
      }
    });
  });
}

/* -------------------------------------------------------------
 * 4. Reviews Slider / Carousel
 * ------------------------------------------------------------- */
let currentReviewIndex = 0;
function initReviewsNavigation() {
  const prevBtn = document.getElementById('review-prev-btn');
  const nextBtn = document.getElementById('review-next-btn');
  const reviewCards = document.querySelectorAll('.review-card');

  if (!reviewCards.length) return;

  function updateReviews(direction) {
    reviewCards.forEach(card => {
      card.style.transition = 'all 0.35s ease';
      card.style.transform = 'scale(0.97)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 150);
    });
    showToast(`Menampilkan ulasan & refleksi pembimbing`);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateReviews(-1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateReviews(1));
  }
}

/* -------------------------------------------------------------
 * 5. Interactive Modal Data Store & Handler
 * ------------------------------------------------------------- */
const modalDataStore = {
  'modul-siklus1': {
    title: 'Modul Ajar Siklus 1: Permainan Bola Besar (Bola Voli)',
    category: 'Fase E / F (SMK) • Kurikulum Merdeka PJOK',
    meta: 'Alokasi: 3 JP (3 x 45 Menit) | Model: Problem-Based Learning (PBL)',
    content: `
      <div style="margin-bottom: 1.25rem;">
        <h4 style="color:#FFFFFF; margin-bottom: 0.5rem; font-weight:800;">Capaian Pembelajaran (CP)</h4>
        <p style="color:#D1D5DB; font-size:0.92rem; line-height:1.7;">Peserta didik mampu mempraktikkan keterampilan gerak spesifik passing bawah dan passing atas dalam permainan bola voli secara efektif, aman, serta menunjukkan sportivitas dan kerjasama regu di SMK N 3 Kasihan Yogyakarta.</p>
      </div>
      <div style="margin-bottom: 1.25rem;">
        <h4 style="color:#FFFFFF; margin-bottom: 0.5rem; font-weight:800;">Tujuan Pembelajaran</h4>
        <ul style="color:#D1D5DB; font-size:0.9rem; padding-left:1.2rem; line-height:1.8;">
          <li>Menganalisis poros ayunan lengan dan perkenaan bola passing bawah serta kuda-kuda kaki.</li>
          <li>Mendemonstrasikan variasi passing berpasangan dan segitiga dengan kontrol akurasi yang baik.</li>
          <li>Menunjukkan sikap gotong royong, disiplin gerak, dan sportivitas tinggi dalam kegiatan olahraga beregu.</li>
        </ul>
      </div>
      <div style="margin-bottom: 1.5rem; background:#202228; padding:1.2rem; border-radius:12px; border-left:4px solid #FFC938;">
        <h4 style="color:#FFC938; margin-bottom:0.4rem; font-size:0.95rem; font-weight:800;">💡 Pembelajaran PJOK Berdiferensiasi</h4>
        <p style="color:#D1D5DB; font-size:0.88rem; line-height:1.6;">Diferensiasi proses dan sarana: Siswa pemula menggunakan bola spon modifikasi untuk mengeliminasi rasa sakit di lengan, sedangkan kelompok mahir melakukan variasi passing dinamis sambil bergerak.</p>
      </div>
      <div style="display:flex; gap:0.75rem; justify-content:flex-end;">
        <a href="UTS/rancangan.html" class="btn btn-yellow btn-sm">Buka Halaman Modul</a>
        <a href="Dokumen/Rancangan Siklus 1.pdf" target="_blank" class="btn btn-outline-white btn-sm"><i class="fa-solid fa-download"></i> Unduh PDF</a>
      </div>
    `
  },
  'modul-siklus2': {
    title: 'Modul Ajar Siklus 2: Kebugaran Jasmani Sirkuit (Circuit Training)',
    category: 'Fase E / F (SMK) • Komponen Daya Tahan & Kekuatan',
    meta: 'Alokasi: 3 JP (3 x 45 Menit) | Model: Circuit Training & TPACK',
    content: `
      <div style="margin-bottom: 1.25rem;">
        <h4 style="color:#FFFFFF; margin-bottom: 0.5rem; font-weight:800;">Fokus Modul</h4>
        <p style="color:#D1D5DB; font-size:0.92rem; line-height:1.7;">Peserta didik merancang dan melakukan rangkaian sirkuit latihan 5 pos (Push up, Sit up, Shuttle Run, Jumping Jack, Plank) serta menghitung denyut nadi latihan (Training Heart Rate).</p>
      </div>
      <div style="margin-bottom: 1.25rem;">
        <h4 style="color:#FFFFFF; margin-bottom: 0.5rem; font-weight:800;">Integrasi TPACK</h4>
        <p style="color:#D1D5DB; font-size:0.9rem; line-height:1.7;">Pencatatan rekap denyut nadi dan repetisi menggunakan formulir digital interaktif yang terintegrasi barcode pada tiap tiang pos latihan di SMK N 3 Kasihan.</p>
      </div>
      <div style="display:flex; gap:0.75rem; justify-content:flex-end;">
        <a href="UAS/rancangan.html" class="btn btn-yellow btn-sm">Buka Halaman UAS</a>
        <a href="Dokumen/Rancangan Siklus 2.pdf" target="_blank" class="btn btn-outline-white btn-sm"><i class="fa-solid fa-download"></i> Unduh PDF</a>
      </div>
    `
  }
};

function initModals() {
  const globalModal = document.getElementById('global-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  window.openModal = function(key) {
    const data = modalDataStore[key];
    if (!data || !globalModal) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-meta').textContent = data.meta;
    document.getElementById('modal-body').innerHTML = data.content;

    globalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (closeBtn && globalModal) {
    closeBtn.addEventListener('click', () => {
      globalModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    globalModal.addEventListener('click', (e) => {
      if (e.target === globalModal) {
        globalModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* -------------------------------------------------------------
 * 6. Photo Lightbox Modal
 * ------------------------------------------------------------- */
function initPhotoLightbox() {
  const photoModal = document.getElementById('photo-modal');
  const photoClose = document.getElementById('photo-modal-close');
  const photoTitle = document.getElementById('photo-title');
  const photoBadge = document.getElementById('photo-badge');
  const photoLoc = document.getElementById('photo-loc');
  const photoDesc = document.getElementById('photo-desc');

  window.openPhotoModal = function(imgSrc, title, category, desc, location, label) {
    if (!photoModal) return;
    if (photoTitle) photoTitle.textContent = title;
    if (photoBadge) photoBadge.textContent = `${category} • ${label}`;
    if (photoLoc) photoLoc.innerHTML = `<i class="fa-solid fa-location-dot" style="margin-right:6px; color:var(--color-yellow);"></i> Lokasi: ${location}`;
    if (photoDesc) photoDesc.textContent = desc;

    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (photoClose && photoModal) {
    photoClose.addEventListener('click', () => {
      photoModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) {
        photoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* -------------------------------------------------------------
 * 7. Modern Toast Notification
 * ------------------------------------------------------------- */
window.showToast = function(message) {
  let toast = document.querySelector('.toast-box');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-box';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toast.classList.add('show');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
};
