/**
 * Wedding Invitation Application Script
 * Adiba & Habib - 28 Desember 2025
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Parse Guest Name from URL Parameter (?to=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search);
  const guestNameParam = urlParams.get('to') || urlParams.get('p') || urlParams.get('guest');
  const guestDisplay = guestNameParam ? decodeURIComponent(guestNameParam) : 'Tamu Undangan';
  
  const guestNameEl = document.getElementById('guest-name');
  if (guestNameEl) {
    guestNameEl.textContent = guestDisplay;
  }
  
  const guestNameHero = document.getElementById('guest-name-hero');
  if (guestNameHero) {
    guestNameHero.textContent = guestDisplay;
  }

  // 2. Audio Background (Web Audio & HTML5 Audio fallback)
  let isPlaying = false;
  const musicBtn = document.getElementById('music-toggle');
  const musicIcon = document.getElementById('music-icon');
  let audioContext = null;
  let synthInterval = null;

  // Soft romantic synthesized harp/piano melody fallback using Web Audio API
  function playRomanticMelody() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioContext) {
        audioContext = new AudioCtx();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Notes frequencies in Hz (C major / A minor romantic chord arpeggios)
      const notes = [
        261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
        220.00, 261.63, 329.63, 440.00, // A3, C4, E4, A4
        174.61, 220.00, 261.63, 349.23, // F3, A3, C4, F4
        196.00, 246.94, 293.66, 392.00  // G3, B3, D4, G4
      ];
      let noteIndex = 0;

      function playNote(freq) {
        if (!isPlaying || !audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);

        gain.gain.setValueAtTime(0.001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.6);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start();
        osc.stop(audioContext.currentTime + 1.7);
      }

      if (synthInterval) clearInterval(synthInterval);
      synthInterval = setInterval(() => {
        if (isPlaying) {
          playNote(notes[noteIndex % notes.length]);
          noteIndex++;
        }
      }, 550);

    } catch (e) {
      console.log('Audio Context notice:', e);
    }
  }

  function stopRomanticMelody() {
    if (synthInterval) clearInterval(synthInterval);
    if (audioContext && audioContext.state === 'running') {
      audioContext.suspend();
    }
  }

  function toggleMusic() {
    if (isPlaying) {
      isPlaying = false;
      stopRomanticMelody();
      musicBtn.classList.remove('spinning');
      musicIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />`;
    } else {
      isPlaying = true;
      playRomanticMelody();
      musicBtn.classList.add('spinning');
      musicIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />`;
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }

  // 3. Opening Invitation Modal Transition
  const openModal = document.getElementById('opening-modal');
  const openBtn = document.getElementById('btn-open-invitation');
  
  if (openBtn && openModal) {
    openBtn.addEventListener('click', () => {
      openModal.classList.add('opened');
      document.body.style.overflow = 'auto';
      // Automatically start background music on interaction
      isPlaying = true;
      playRomanticMelody();
      if (musicBtn) musicBtn.classList.add('spinning');
    });
  }

  // 4. Countdown Timer to Wedding Day (28 Desember 2025)
  // Smart target date calculation
  const targetDate = new Date('2025-12-28T10:00:00+07:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    let diff = targetDate - now;

    // If date has passed, keep an inspiring ongoing celebration counter
    const isPast = diff < 0;
    if (isPast) {
      diff = Math.abs(diff);
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const elDays = document.getElementById('countdown-days');
    const elHours = document.getElementById('countdown-hours');
    const elMinutes = document.getElementById('countdown-minutes');
    const elSeconds = document.getElementById('countdown-seconds');

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 5. Toast Notification & Copy to Clipboard
  window.copyText = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label || 'Teks'} berhasil disalin!`);
    }).catch(err => {
      // Fallback
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast(`${label || 'Teks'} berhasil disalin!`);
    });
  };

  const toastEl = document.getElementById('toast');
  let toastTimeout = null;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.querySelector('.toast-msg').textContent = msg;
    toastEl.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  // 6. Save the Date (Google Calendar Integration)
  const saveDateBtn = document.getElementById('btn-save-date');
  if (saveDateBtn) {
    saveDateBtn.addEventListener('click', () => {
      const title = encodeURIComponent("Pernikahan Adiba & Habib");
      const details = encodeURIComponent("Akad & Resepsi Pernikahan Adiba Putri Syakila & Habib Yulianto");
      const location = encodeURIComponent("Grand Rama Ballroom & Graha Sabha, Yogyakarta");
      const dates = "20251228T030000Z/20251228T080000Z";
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(gcalUrl, '_blank');
      showToast('Membuka Google Calendar...');
    });
  }

  // 7. Lightbox Modal for Gallery
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  window.openLightbox = function(src) {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = src;
      lightboxModal.classList.add('active');
    }
  };

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }



  // 9. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // 10. Floating Nav Active Indicator on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
});
