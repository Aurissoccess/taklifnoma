/**
 * ==========================================================================
 * ROMANTIK & MINIMALIST TAKLIFNOMA — ASOSIY JAVASCRIPT (APP.JS)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // 1. Konfiguratsiyani yuklash va matnlarni to'ldirish
  populateConfigData();

  // 2. Mehmon ismini URL orqali aniqlash (?guest=... yoki ?name=...)
  handlePersonalizedGuest();

  // 3. Falling Petals & Fairy Dust Canvas animatsiyasi
  initPetalsCanvas();

  // 4. Kirish Eshigi (Intro Envelope Gate) va Audio Trigger
  initIntroGate();

  // 5. Fon musiqasi boshqaruvchisi (Web Audio Synthesizer & Audio Element)
  initMusicController();

  // 6. Countdown Taymer
  initCountdownTimer();

  // 7. Kalendarga qo'shish (Google & Apple .ics)
  initCalendarButtons();

  // 8. Timeline va Dress Code render qilish
  renderTimelineAndDressCode();

  // 9. Xarita va Navigatsiya havolalarini ulash
  initNavigationLinks();

  // 10. RSVP Forma va Telegram Bot yuborish
  initRsvpForm();

  // 11. To'yona to'lov tizimlari va karta nusxalash
  initToyonaPayment();

  // 12. Dres-kod interaktiv tanlov
  initDressCodeInteractions();

  // 13. Scroll Reveal animatsiyalari
  initScrollAnimations();
}

/* ==========================================================================
   1. KONFIGURATSIYA MA'LUMOTLARINI JOYLASHTIRISH
   ========================================================================== */
function populateConfigData() {
  if (typeof WEDDING_CONFIG === 'undefined') return;

  const cfg = WEDDING_CONFIG;

  // Title va Headerlar
  document.title = cfg.title || "Nikoh To‘yiga Taklifnoma";

  // Monogramma
  setTextAll('.cfg-monogram', cfg.monogram || `${cfg.groom.initial} & ${cfg.bride.initial}`);
  setTextAll('.cfg-groom-name', cfg.groom.name);
  setTextAll('.cfg-bride-name', cfg.bride.name);

  // Sana va vaqt
  setTextAll('.cfg-date-formatted', cfg.dateFormatted);
  setTextAll('.cfg-day-of-week', cfg.dayOfWeek);
  setTextAll('.cfg-start-time', cfg.startTimeFormatted);

  // She'riy satr va murojaat
  setTextAll('.cfg-quote', cfg.quote);
  setTextAll('.cfg-host-message', cfg.hostMessage);
  setTextAll('.cfg-hosts', cfg.hosts);

  // To'yxona va Manzil
  setTextAll('.cfg-venue-name', cfg.venue.name);
  setTextAll('.cfg-venue-hall', cfg.venue.hall);
  setTextAll('.cfg-venue-address', cfg.venue.address);
  setTextAll('.cfg-venue-landmark', cfg.venue.landmark);
}

function setTextAll(selector, text) {
  if (!text) return;
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = text;
  });
}

/* ==========================================================================
   2. SHAXSIY MUROJAAT (PERSONALIZED GUEST URL PARSER)
   ========================================================================== */
function handlePersonalizedGuest() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('guest') || urlParams.get('name') || urlParams.get('to') || urlParams.get('mehmon');
  const guestBox = document.getElementById('guest-personalized-box');
  const guestNameEl = document.getElementById('guest-name-highlight');
  const rsvpNameInput = document.getElementById('rsvp-name');

  if (guestParam && guestParam.trim() !== '') {
    const formattedGuestName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
    if (guestNameEl) {
      guestNameEl.textContent = `${formattedGuestName}!`;
    }
    if (guestBox) {
      guestBox.style.display = 'block';
    }
    if (rsvpNameInput) {
      rsvpNameInput.value = formattedGuestName;
    }
  } else {
    if (guestBox) {
      guestBox.style.display = 'none';
    }
  }
}

/* ==========================================================================
   3. FALLING PETALS & STARDUST CANVAS ENGINE
   ========================================================================== */
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = 24;

  const colors = [
    'rgba(229, 195, 192, 0.65)',
    'rgba(244, 214, 212, 0.55)',
    'rgba(214, 186, 150, 0.50)',
    'rgba(255, 235, 230, 0.70)'
  ];

  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 10 + 8,
      speedX: Math.random() * 1.5 - 0.75,
      speedY: Math.random() * 1.2 + 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      sway: Math.random() * 2,
      swaySpeed: Math.random() * 0.02 + 0.01
    });
  }

  let angle = 0;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    angle += 0.01;

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += Math.sin(angle + p.sway) * 0.8 + p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      // Atirgul yaprog'i shakli
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
      ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
      ctx.fill();

      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. INTRO ENVELOPE GATE & AUDIO TRIGGER
   ========================================================================== */
function initIntroGate() {
  const introGate = document.getElementById('intro-gate');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const btnOpenGate = document.getElementById('btn-open-gate');
  const mainInvitation = document.getElementById('main-invitation');

  if (!introGate || !envelopeWrapper || !btnOpenGate) return;

  function openInvitation() {
    // Musiqani yoqish
    playMusic();

    // Konvert ochilish animatsiyasi
    envelopeWrapper.classList.add('opening');

    setTimeout(() => {
      introGate.classList.add('opened');
      if (mainInvitation) {
        mainInvitation.classList.add('visible');
      }
    }, 700);
  }

  envelopeWrapper.addEventListener('click', openInvitation);
  btnOpenGate.addEventListener('click', openInvitation);
}

/* ==========================================================================
   5. FON MUSIQASI BOSHQARUVI (HTML5 AUDIO & WEB AUDIO SYNTH)
   ========================================================================== */
let audioContext = null;
let isMusicPlaying = false;
let synthInterval = null;

function initMusicController() {
  const musicBtn = document.getElementById('floating-music-btn');
  const audioEl = document.getElementById('wedding-audio');

  if (audioEl) {
    audioEl.volume = 0.8;
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (isMusicPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    });
  }
}

function playMusic() {
  const musicBtn = document.getElementById('floating-music-btn');
  const audioEl = document.getElementById('wedding-audio');

  if (audioEl) {
    audioEl.play().then(() => {
      isMusicPlaying = true;
      if (musicBtn) {
        musicBtn.classList.add('playing');
        musicBtn.classList.remove('muted');
      }
    }).catch(err => {
      console.warn("HTML5 audio playback blocked/failed, starting Web Audio Synth fallback:", err);
      startWebAudioSynth();
    });
    return;
  }

  // Fallback: Web Audio sintizatori
  startWebAudioSynth();
}

function startWebAudioSynth() {
  const musicBtn = document.getElementById('floating-music-btn');

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioContext) {
      audioContext = new AudioCtx();
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (isMusicPlaying) return;
    isMusicPlaying = true;

    if (musicBtn) {
      musicBtn.classList.add('playing');
      musicBtn.classList.remove('muted');
    }

    // Romantik Pianino Arpejio kuylari (D Major / B Minor romantik progressiyasi)
    // Dmaj7 -> Bm9 -> Gmaj7 -> A9sus4
    const chords = [
      [293.66, 369.99, 440.00, 554.37, 739.99], // D maj9 (D4, F#4, A4, C#5, F#5)
      [246.94, 293.66, 369.99, 440.00, 587.33], // Bm9 (B3, D4, F#4, A4, D5)
      [196.00, 246.94, 293.66, 369.99, 587.33], // G maj7 (G3, B3, D4, F#4, D5)
      [220.00, 293.66, 329.63, 440.00, 659.25]  // Asus4 / A9 (A3, D4, E4, A4, E5)
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    function playPianoNote(freq, time, duration = 2.5) {
      if (!audioContext || audioContext.state !== 'running' || !isMusicPlaying) return;

      const osc = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gain = audioContext.createGain();

      // Yumshoq ohang uchun Sine va Triangle to'lqinlar
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, time);

      const subGain = audioContext.createGain();
      subGain.gain.setValueAtTime(0.2, time);
      osc2.connect(subGain);
      subGain.connect(gain);

      // Pianino dinamikasi (Attack tez, Decay silliq)
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.18, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(time);
      osc2.start(time);
      osc.stop(time + duration);
      osc2.stop(time + duration);
    }

    function step() {
      if (!isMusicPlaying) return;
      const currentChord = chords[chordIdx];
      const freq = currentChord[noteIdx];
      const now = audioContext.currentTime;

      playPianoNote(freq, now, 2.2);

      noteIdx++;
      if (noteIdx >= currentChord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }
    }

    step();
    synthInterval = setInterval(step, 550);

  } catch (e) {
    console.error("Audio initialization error:", e);
  }
}

function pauseMusic() {
  isMusicPlaying = false;
  const musicBtn = document.getElementById('floating-music-btn');
  const audioEl = document.getElementById('wedding-audio');

  if (musicBtn) {
    musicBtn.classList.remove('playing');
    musicBtn.classList.add('muted');
  }

  if (audioEl) {
    audioEl.pause();
  }

  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }

  if (audioContext && audioContext.state === 'running') {
    audioContext.suspend();
  }
}

/* ==========================================================================
   6. LIVE COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const targetDate = new Date(WEDDING_CONFIG.eventDateTime || "2026-10-18T18:00:00").getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? `0${days}` : days;
    hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
    minsEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   7. KALENDARGA QO'SHISH (GOOGLE & APPLE/NATIVE CALENDAR)
   ========================================================================== */
function initCalendarButtons() {
  const btnGoogle = document.getElementById('btn-calendar-google');
  const btnApple = document.getElementById('btn-calendar-apple');

  const cfg = WEDDING_CONFIG;
  const startDate = new Date(cfg.eventDateTime);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 soat

  function formatGoogleDate(date) {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  }

  // Google Calendar URL (Android / Desktop / Web)
  if (btnGoogle) {
    const gTitle = encodeURIComponent(`${cfg.groom.name} & ${cfg.bride.name} — Nikoh To'yi`);
    const gDetails = encodeURIComponent(`Sizni ${cfg.groom.name} va ${cfg.bride.name}ning nikoh to'yiga taklif etamiz!\nManzil: ${cfg.venue.name}, ${cfg.venue.address}`);
    const gLocation = encodeURIComponent(`${cfg.venue.name}, ${cfg.venue.address}`);
    const gDates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;

    // Google Calendar direct intent / link
    btnGoogle.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gTitle}&dates=${gDates}&details=${gDetails}&location=${gLocation}`;
    btnGoogle.target = "_blank";
  }

  // Apple & Android Native Calendar (.ics format - to'g'ridan-to'g'ri kalendar ilovasini ochadi)
  if (btnApple) {
    btnApple.addEventListener('click', (e) => {
      e.preventDefault();

      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Taklifnoma//Wedding Invitation//UZ",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `SUMMARY:${cfg.groom.name} & ${cfg.bride.name} — Nikoh To'yi`,
        `DESCRIPTION:Visol oqshomimizning qadrli mehmoni bo'ling!\\nManzil: ${cfg.venue.name}`,
        `LOCATION:${cfg.venue.name}, ${cfg.venue.address}`,
        `DTSTART:${formatGoogleDate(startDate)}`,
        `DTEND:${formatGoogleDate(endDate)}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      // Safari/iOS va Android uchun to'g'ridan-to'g'ri ilovada ochish
      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${cfg.groom.shortName}-${cfg.bride.shortName}-Toy.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
    });
  }
}

/* ==========================================================================
   8. TIMELINE VA DRESS CODE RENDER
   ========================================================================== */
function renderTimelineAndDressCode() {
  const cfg = WEDDING_CONFIG;

  // Timeline render
  const timelineListEl = document.getElementById('timeline-list');
  if (timelineListEl && cfg.timeline) {
    timelineListEl.innerHTML = cfg.timeline.map(item => `
      <div class="timeline-item reveal-on-scroll">
        <div class="timeline-node">${item.icon || '✨'}</div>
        <div class="timeline-card">
          <span class="timeline-time">${item.time}</span>
          <h4 class="timeline-title">${item.title}</h4>
          <p class="timeline-desc">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Dress Code render
  const dressCodeTitleEl = document.getElementById('dresscode-title');
  const dressCodeDescEl = document.getElementById('dresscode-desc');
  const swatchesContainer = document.getElementById('dresscode-swatches');

  if (cfg.dressCode) {
    if (dressCodeTitleEl) dressCodeTitleEl.textContent = cfg.dressCode.title;
    if (dressCodeDescEl) dressCodeDescEl.textContent = cfg.dressCode.description;

    if (swatchesContainer && cfg.dressCode.colors) {
      swatchesContainer.innerHTML = cfg.dressCode.colors.map(color => `
        <div class="swatch-item">
          <div class="swatch-circle" style="background-color: ${color.hex};"></div>
          <span class="swatch-name">${color.name}</span>
        </div>
      `).join('');
    }
  }
}

/* ==========================================================================
   9. XARITA VA NAVIGATSIYA HAVOLALARI
   ========================================================================== */
function initNavigationLinks() {
  const venue = WEDDING_CONFIG.venue;
  if (!venue) return;

  const btnYandexTaxi = document.getElementById('btn-yandex-taxi');
  const btnYandexMaps = document.getElementById('btn-yandex-maps');
  const btnGoogleMaps = document.getElementById('btn-google-maps');
  const btn2Gis = document.getElementById('btn-2gis');

  if (btnYandexTaxi) btnYandexTaxi.href = venue.yandexTaxiUrl || `https://3.redirect.appmetrica.yandex.com/route?end-lat=${venue.latitude}&end-lon=${venue.longitude}&app=yandex-taxi`;
  if (btnYandexMaps) btnYandexMaps.href = venue.yandexMapsUrl || `https://yandex.uz/maps/?text=${encodeURIComponent(venue.name)}`;
  if (btnGoogleMaps) btnGoogleMaps.href = venue.googleMapsUrl || `https://maps.google.com/?q=${venue.latitude},${venue.longitude}`;
  if (btn2Gis) btn2Gis.href = venue.twoGisUrl || `https://2gis.uz/tashkent/search/${venue.latitude}%2C${venue.longitude}`;
}

/* ==========================================================================
   10. RSVP FORMA & TELEGRAM BOT INTEGRATSIYASI
   ========================================================================== */
/* ==========================================================================
   10. RSVP FORMA & TELEGRAM BOT INTEGRATSIYASI
   ========================================================================== */
function initRsvpForm() {
  const form = document.getElementById('rsvp-form');
  const modalOverlay = document.getElementById('success-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-submit-rsvp');
    const name = document.getElementById('rsvp-name').value.trim();
    const contact = document.getElementById('rsvp-contact')?.value.trim() || "Kiritilmadi";
    const attendance = form.querySelector('input[name="attendance"]:checked')?.value || "Albatta boraman";
    const dressColor = form.querySelector('input[name="rsvp_dress_color"]:checked')?.value || "Keltirilmadi";
    const guestsCount = document.getElementById('rsvp-guests').value;
    const message = document.getElementById('rsvp-message').value.trim();

    if (!name) {
      alert("Iltimos, ismingizni kiriting!");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Yuborilmoqda...";
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    // Telegram Botga xabar yuborish formati (HTML va oddiy matn)
    const textHtml = `💌 <b>Yangi RSVP Javobi:</b>\n\n` +
      `👤 <b>Mehmon:</b> ${escapeHtml(name)}\n` +
      `📧/📞 <b>Bog‘lanish (Gmail/Tel):</b> ${escapeHtml(contact)}\n` +
      `✨ <b>Tashrif:</b> ${escapeHtml(attendance)}\n` +
      `🎨 <b>Tanlangan Dres-kod:</b> ${escapeHtml(dressColor)}\n` +
      `👥 <b>Mehmonlar soni:</b> ${escapeHtml(guestsCount)}\n` +
      `💬 <b>Ezgu tilak:</b> ${escapeHtml(message || "—")}\n\n` +
      `⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}`;

    const plainText = `💌 Yangi RSVP Javobi:\n\n` +
      `👤 Mehmon: ${name}\n` +
      `📧/📞 Bog'lanish: ${contact}\n` +
      `✨ Tashrif: ${attendance}\n` +
      `🎨 Tanlangan Dres-kod: ${dressColor}\n` +
      `👥 Mehmonlar soni: ${guestsCount}\n` +
      `💬 Ezgu tilak: ${message || "—"}\n\n` +
      `⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`;

    const tg = WEDDING_CONFIG.telegram;

    if (tg && tg.enabled && tg.botToken && tg.chatId) {
      try {
        const tgUrl = `https://api.telegram.org/bot${tg.botToken}/sendMessage`;
        const resp = await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: String(tg.chatId),
            text: textHtml,
            parse_mode: 'HTML'
          })
        });
        const data = await resp.json();
        if (!data.ok) {
          // Oddiy matn bilan qayta urinish
          const fallbackUrl = `https://api.telegram.org/bot${tg.botToken}/sendMessage?chat_id=${encodeURIComponent(tg.chatId)}&text=${encodeURIComponent(plainText)}`;
          await fetch(fallbackUrl);
        }
      } catch (err) {
        console.warn("Fetch failed, sending via GET beacon:", err);
        const beaconUrl = `https://api.telegram.org/bot${tg.botToken}/sendMessage?chat_id=${encodeURIComponent(tg.chatId)}&text=${encodeURIComponent(plainText)}`;
        new Image().src = beaconUrl;
      }
    }

    // LocalStorage ga ham saqlab qo'yish
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
      existing.push({ name, contact, attendance, dressColor, guestsCount, message, date: new Date().toISOString() });
      localStorage.setItem('wedding_rsvp_list', JSON.stringify(existing));
    } catch (e) {}

    // Formani tozalash va tugmani tiklash
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Yuborish ✨";
    }

    // Bayramona Konfetti & Success Modal
    showSuccessModal();
    fireConfetti();
  });

  if (btnCloseModal && modalOverlay) {
    btnCloseModal.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }
}

/* ==========================================================================
   11. TO'YONA & TO'LOV TIZIMLARI (CARD AUTO-COPY & APP DEEP LINKS)
   ========================================================================== */
function initToyonaPayment() {
  const cfg = WEDDING_CONFIG.toyona;
  if (!cfg) return;

  const cardHolderEl = document.querySelector('.cfg-card-holder');
  const cardNumberEl = document.getElementById('card-number-text');
  const btnCopyCard = document.getElementById('btn-copy-card');
  const copyBtnText = document.getElementById('copy-btn-text');
  const cleanNum = cfg.cardNumberClean || cfg.cardNumber.replace(/\s+/g, '');

  if (cardHolderEl && cfg.cardHolder) cardHolderEl.textContent = cfg.cardHolder;
  if (cardNumberEl && cfg.cardNumber) cardNumberEl.textContent = cfg.cardNumber;

  function copyCardWithFeedback(customMsg = "Nusxalandi! ✨") {
    navigator.clipboard.writeText(cleanNum).then(() => {
      if (copyBtnText) {
        copyBtnText.textContent = customMsg;
        setTimeout(() => {
          copyBtnText.textContent = "Karta raqamini nusxalash";
        }, 3000);
      }
    }).catch(() => {
      // Fallback
      const tempInput = document.createElement("input");
      tempInput.value = cleanNum;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      if (copyBtnText) {
        copyBtnText.textContent = customMsg;
        setTimeout(() => {
          copyBtnText.textContent = "Karta raqamini nusxalash";
        }, 3000);
      }
    });
  }

  if (btnCopyCard) {
    btnCopyCard.addEventListener('click', (e) => {
      e.preventDefault();
      copyCardWithFeedback("Nusxalandi! ✨");
    });
  }

  // Payme, Click, Uzum, Paynet, Xazna ilovalarini avtonom ochish
  const btnPayme = document.querySelector('.btn-payme');
  const btnClick = document.querySelector('.btn-click');
  const btnUzum = document.querySelector('.btn-uzum');
  const btnPaynet = document.querySelector('.btn-paynet');
  const btnXazna = document.querySelector('.btn-xazna');

  if (btnPayme) {
    btnPayme.addEventListener('click', (e) => {
      e.preventDefault();
      copyCardWithFeedback("Karta nusxalandi! Payme ochilmoqda...");
      // Payme ilovasiga o'tish
      window.location.href = `payme://p2p?card=${cleanNum}`;
      setTimeout(() => {
        window.location.href = `https://payme.uz/fallback/pay/card/${cleanNum}`;
      }, 500);
    });
  }

  if (btnClick) {
    btnClick.addEventListener('click', (e) => {
      e.preventDefault();
      copyCardWithFeedback("Karta nusxalandi! Click ochilmoqda...");
      // Click ilovasiga o'tish
      window.location.href = `clickuz://p2p?card=${cleanNum}`;
      setTimeout(() => {
        window.location.href = `https://my.click.uz/clickp2p?receiver=${cleanNum}`;
      }, 500);
    });
  }

  if (btnUzum) {
    btnUzum.addEventListener('click', (e) => {
      e.preventDefault();
      copyCardWithFeedback("Karta nusxalandi! Uzum Bank ochilmoqda...");
      // Uzum Bank ilovasiga to'g'ridan-to'g'ri o'tish
      window.location.href = `uzumbank://`;
    });
  }

  if (btnPaynet) {
    btnPaynet.addEventListener('click', (e) => {
      e.preventDefault();
      copyCardWithFeedback("Karta nusxalandi! Paynet ochilmoqda...");
      // Paynet ilovasiga to'g'ridan-to'g'ri o'tish
      window.location.href = `paynet://`;
    });
  }

  if (btnXazna) {
    btnXazna.addEventListener('click', (e) => {
      e.preventDefault();
      copyCardWithFeedback("Karta nusxalandi! Xazna ochilmoqda...");
      // Xazna ilovasiga to'g'ridan-to'g'ri o'tish
      window.location.href = `xazna://`;
    });
  }
}

/* ==========================================================================
   12. DRESS CODE SWATCH INTERAKTIV TANLOV
   ========================================================================== */
function initDressCodeInteractions() {
  const swatchItems = document.querySelectorAll('.swatch-item');
  const rsvpDressOptions = document.querySelectorAll('input[name="rsvp_dress_color"]');

  swatchItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const name = item.querySelector('.swatch-name')?.textContent?.trim();
      if (!name) return;

      // RSVP dagi mos radioni belgilash
      rsvpDressOptions.forEach(radio => {
        if (radio.value.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(radio.value.toLowerCase())) {
          radio.checked = true;
        }
      });

      // RSVP bo'limiga silliq o'tish
      const rsvpSection = document.getElementById('rsvp-section');
      if (rsvpSection) {
        rsvpSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function showSuccessModal() {
  const modalOverlay = document.getElementById('success-modal');
  if (modalOverlay) {
    modalOverlay.classList.add('active');
  }
}

/* Bayramona yurakchalar va konfetti animatsiyasi */
function fireConfetti() {
  const container = document.body;
  const count = 40;

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.zIndex = '3000';
    confetti.style.pointerEvents = 'none';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `-20px`;

    const isHeart = Math.random() > 0.5;
    confetti.innerHTML = isHeart ? '💖' : '✨';
    confetti.style.fontSize = `${Math.random() * 16 + 14}px`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    const duration = Math.random() * 2 + 2;
    confetti.style.transition = `all ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`;

    container.appendChild(confetti);

    setTimeout(() => {
      confetti.style.top = `${Math.random() * 40 + 70}vh`;
      confetti.style.opacity = '0';
      confetti.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 720}deg)`;
    }, 20);

    setTimeout(() => {
      confetti.remove();
    }, duration * 1000);
  }
}

/* ==========================================================================
   11. SCROLL REVEAL ANIMATSIYALARI
   ========================================================================== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
