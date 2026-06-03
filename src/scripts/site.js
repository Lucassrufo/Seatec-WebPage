/* =========================================================
   SEATEC — site.js v2.0
   ========================================================= */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const themeStorageKey = 'seatec-theme';
const lightThemeClass = 'theme-light';
const whatsappPhone = '551133846313';
const defaultWhatsappMessage = 'Olá! Vim pelo site e quero saber mais sobre os sistemas PDV.';
const voeAiAvatarSrc = 'assets/images/voeai-avatar.png';

/* --- Content data --- */

const systemModalContent = {
  voe: {
    logo: 'assets/images/voepdv.png',
    title: 'VoePDV',
    description: 'PDV desktop para operações com caixa fixo, alto volume de atendimento e necessidade de controle completo. Indicado para quem precisa de estabilidade, rotina fiscal organizada, estoque confiável e relatórios para acompanhar a operação de perto.',
    highlights: [
      { icon: 'desktop_windows', label: 'Operação', value: 'Caixa fixo Windows' },
      { icon: 'speed', label: 'Fluxo', value: 'Alto volume de vendas' },
      { icon: 'monitoring', label: 'Gestão', value: 'Estoque, fiscal e relatórios' }
    ],
    bestFor: [
      'Lojas, mercados, restaurantes e operações com balcão',
      'Empresas que usam computador, leitor, balança, gaveta e impressora',
      'Rotinas que dependem de controle de caixa e relatórios gerenciais'
    ],
    features: [
      'Venda mesmo quando a internet cai',
      'Controle de estoque, produtos, preços e relatórios',
      'NFC-e, NF-e e SAT integrados à rotina do caixa',
      'Permissões por usuário e operação mais segura',
      'Compatível com periféricos de frente de caixa'
    ],
    delivery: [
      'Implantação orientada pela equipe SEATEC',
      'Parametrização fiscal conforme a operação',
      'Suporte para ajustes da rotina depois da instalação'
    ],
    whatsappMessage: 'Olá! Vim pelo site da SEATEC e quero falar com um especialista sobre o VoePDV para minha empresa.'
  },
  legal: {
    logo: 'assets/images/pdvlegal.png',
    title: 'PDV Legal',
    description: 'PDV Android para vender direto na maquininha, Smart POS, celular ou tablet. Ideal para negócios que precisam de mobilidade no balcão, salão, delivery ou atendimento fora do caixa tradicional, sem perder controle fiscal e retaguarda em nuvem.',
    highlights: [
      { icon: 'phone_android', label: 'Operação', value: 'Android e Smart POS' },
      { icon: 'room_service', label: 'Atendimento', value: 'Balcão, mesas e delivery' },
      { icon: 'cloud_done', label: 'Gestão', value: 'Retaguarda em nuvem' }
    ],
    bestFor: [
      'Food service, delivery, lanchonetes, bares e restaurantes',
      'Vendas móveis em maquininha, celular, tablet ou Smart POS',
      'Operações que precisam de comandas, mesas e atendimento ágil'
    ],
    features: [
      'Venda, receba e emita NFC-e na maquininha',
      'Comandas, mesas, delivery e rotina de balcão',
      'Controle de vendas e relatórios pela retaguarda',
      'Compatível com celular, tablet e Smart POS',
      'Interface prática para equipe operar rápido'
    ],
    delivery: [
      'Configuração inicial e orientação de uso',
      'Ajustes para fluxo de salão, delivery ou balcão',
      'Suporte para emissão fiscal e rotina de venda'
    ],
    whatsappMessage: 'Olá! Vim pelo site da SEATEC e quero falar com um especialista sobre o PDV Legal para minha empresa.'
  }
};

const voeAiTopics = [
  {
    id: 'resumo',
    question: 'Resumo rápido do site',
    answer: '<strong>A SEATEC ajuda empresas a vender com mais controle, velocidade e suporte próximo.</strong><br><br>O site apresenta duas frentes: <strong>VoePDV</strong>, para caixas Windows e operações de alto fluxo, e <strong>PDV Legal</strong>, para Android, maquininhas e Smart POS.<br><br>Também mostramos recursos de estoque, vendas, emissão fiscal, relatórios, implantação e atendimento comercial pelo WhatsApp.'
  },
  {
    id: 'sistemas',
    question: 'Qual PDV combina com minha operação?',
    answer: '<strong>VoePDV</strong> costuma ser a melhor escolha para empresas com caixa fixo, computador Windows, alto volume de atendimento e necessidade de retaguarda completa.<br><br><strong>PDV Legal</strong> combina com quem precisa de mobilidade: maquininha, Smart POS, delivery, comandas, balcão e atendimento fora do caixa tradicional.'
  },
  {
    id: 'entregas',
    question: 'O que a SEATEC entrega?',
    answer: 'A proposta não é só instalar um sistema. A SEATEC acompanha configuração, parametrização fiscal, orientação inicial e ajustes para a rotina real da empresa.<br><br>O foco é deixar vendas, estoque, caixa, relatórios e emissão fiscal funcionando com clareza para a equipe.'
  },
  {
    id: 'suporte',
    question: 'Como funciona o suporte?',
    answer: 'O suporte é pensado para quem depende do PDV todos os dias. O cliente pode chamar a equipe para tirar dúvidas, receber orientações e acompanhar ajustes importantes da operação.'
  },
  {
    id: 'contato',
    question: 'Quero uma indicação para minha empresa',
    answer: 'Perfeito. O time comercial pode entender seu segmento, volume de vendas, forma de atendimento, necessidade fiscal e indicar o caminho mais adequado entre VoePDV, PDV Legal e recursos complementares.'
  }
];

/* --- State --- */

let chatWidget;
let pageTransitionActive = false;
let tiltElements = [];
let tiltAnimId;
let scrollQuestionSections = [];
let scrollQuestionAnimId;

/* --- Theme --- */

function getSavedTheme() {
  try { return localStorage.getItem(themeStorageKey); } catch { return null; }
}

function saveTheme(theme) {
  try { localStorage.setItem(themeStorageKey, theme); } catch { /* noop */ }
}

function setTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle(lightThemeClass, isLight);
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isLight ? '#f8fafc' : '#030712');

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(isLight));
    btn.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
    btn.querySelector('.material-symbols-outlined')?.replaceChildren(
      document.createTextNode(isLight ? 'dark_mode' : 'light_mode')
    );
    btn.querySelector('[data-theme-label]')?.replaceChildren(
      document.createTextNode(isLight ? 'Escuro' : 'Tema')
    );
  });
}

/* --- WhatsApp --- */

function openWhatsapp(message = defaultWhatsappMessage) {
  window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

function getPageWhatsappMessage() {
  if (document.body.classList.contains('product-voe'))   return 'Olá! Vim pela página do VoePDV e quero entender como ele pode funcionar na minha operação.';
  if (document.body.classList.contains('product-legal')) return 'Olá! Vim pela página do PDV Legal e quero entender como vender pela maquininha ou Smart POS.';
  return 'Olá! Vim pelo site da SEATEC e quero uma indicação de sistema PDV para minha empresa.';
}

/* --- Mobile menu --- */

function closeMobileMenu() {
  const menu   = document.querySelector('[data-mobile-menu]');
  const toggle = document.querySelector('[data-mobile-menu-toggle]');
  menu?.classList.remove('is-open');
  toggle?.setAttribute('aria-expanded', 'false');
}

function toggleMobileMenu() {
  const menu   = document.querySelector('[data-mobile-menu]');
  const toggle = document.querySelector('[data-mobile-menu-toggle]');
  if (!menu || !toggle) return;
  const isOpen = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
}

/* --- Header scroll --- */

function updateHeaderState() {
  document.querySelector('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 8);
}

/* --- Smooth scroll --- */

function scrollToAnchor(anchor) {
  const targetId = anchor.getAttribute('href');
  if (!targetId?.startsWith('#') || targetId === '#') return false;
  const target = document.querySelector(targetId);
  if (!target) return false;

  const headerH = document.querySelector('.site-header')?.offsetHeight || 70;
  const rect     = target.getBoundingClientRect();
  const top      = rect.top + window.scrollY - headerH - 24;

  window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  closeMobileMenu();
  return true;
}

/* --- Scroll reveal --- */

function initReveal() {
  const elements = document.querySelectorAll('.reveal, .fade-up, .reveal-blur, .reveal-scale');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      window.setTimeout(() => entry.target.classList.add('reveal-done'), 4000);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.10 });

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 8, 6) * 90}ms`;
    observer.observe(el);
  });
}

/* --- 3-D card tilt (mouse-track) --- */

function initTilt() {
  if (prefersReducedMotion) return;

  tiltElements = Array.from(document.querySelectorAll('[data-tilt]'));
  if (!tiltElements.length) return;

  let mouse = { x: 0, y: 0 };
  let current = new WeakMap();

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  tiltElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      current.set(el, true);
      if (!tiltAnimId) tiltLoop();
    });

    el.addEventListener('mouseleave', () => {
      current.set(el, false);
      el.style.transform = '';
      el.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    });

    el.addEventListener('transitionend', () => {
      if (!current.get(el)) el.style.transition = '';
    });
  });

  function tiltLoop() {
    let any = false;
    tiltElements.forEach(el => {
      if (!current.get(el)) return;
      any = true;
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (mouse.x - cx) / (rect.width  / 2);
      const dy   = (mouse.y - cy) / (rect.height / 2);
      const rx   = dy * -6;
      const ry   = dx *  6;
      el.style.transform    = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
      el.style.transition   = 'transform 0.1s linear';
    });

    tiltAnimId = any ? requestAnimationFrame(tiltLoop) : null;
  }
}

/* --- Image lazy-load --- */

function initImages() {
  document.querySelectorAll('img').forEach((img, i) => {
    img.decoding = 'async';
    if (i > 1 && !img.hasAttribute('loading')) img.loading = 'lazy';
  });
}

function initFreezeLastFrameVideos() {
  document.querySelectorAll('video[data-freeze-last-frame]').forEach(video => {
    video.addEventListener('ended', () => {
      if (Number.isFinite(video.duration) && video.duration > 0.08) {
        video.currentTime = Math.max(0, video.duration - 0.04);
      }
      video.pause();
    });
  });
}

/* --- Sticky scroll questions --- */

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function updateScrollQuestions() {
  scrollQuestionAnimId = null;
  if (!scrollQuestionSections.length) return;

  const viewportH = window.innerHeight || document.documentElement.clientHeight || 1;

  scrollQuestionSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const items = section._questionItems || [];
    if (!items.length) return;

    const travel = Math.max(1, rect.height - viewportH);
    const progress = clamp01((viewportH * 0.08 - rect.top) / travel);
    const activeIndex = Math.min(items.length - 1, Math.max(0, Math.round(progress * (items.length - 1))));

    section.style.setProperty('--scroll-progress', progress.toFixed(4));
    section.classList.add('is-ready');

    items.forEach((item, index) => {
      const distance = Math.abs(index - activeIndex);
      item.style.setProperty('--question-distance', String(distance));
      item.classList.toggle('is-current', index === activeIndex);
      item.classList.toggle('is-before', index < activeIndex);
      item.classList.toggle('is-after', index > activeIndex);
    });
  });
}

function requestScrollQuestionUpdate() {
  if (scrollQuestionAnimId) return;
  scrollQuestionAnimId = window.requestAnimationFrame(updateScrollQuestions);
}

function initScrollQuestions() {
  scrollQuestionSections = Array.from(document.querySelectorAll('[data-scroll-questions]'));
  if (!scrollQuestionSections.length) return;

  scrollQuestionSections.forEach(section => {
    const items = Array.from(section.querySelectorAll('[data-question-step]'));
    section._questionItems = items;
    section.style.setProperty('--question-count', String(items.length));
  });

  if (prefersReducedMotion) {
    scrollQuestionSections.forEach(section => {
      const items = section._questionItems || [];
      items.forEach((item, index) => item.classList.toggle('is-current', index === 0));
      section.classList.add('is-ready');
    });
    return;
  }

  updateScrollQuestions();
  window.addEventListener('scroll', requestScrollQuestionUpdate, { passive: true });
  window.addEventListener('resize', requestScrollQuestionUpdate, { passive: true });
}

/* --- Deferred iframes --- */

function initDeferredIframes() {
  const iframes = document.querySelectorAll('iframe[data-src]');
  if (!iframes.length) return;

  const load = iframe => { if (!iframe.src) iframe.src = iframe.dataset.src; };

  if (!('IntersectionObserver' in window)) { iframes.forEach(load); return; }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      load(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '360px 0px' });

  iframes.forEach(iframe => observer.observe(iframe));
}

/* --- System modal --- */

function openSystemModal(type) {
  const content = systemModalContent[type];
  const modal   = document.getElementById('modalSistema');
  if (!content || !modal) return;

  modal.querySelector('[data-modal-logo]').src  = content.logo;
  modal.querySelector('[data-modal-logo]').alt  = content.title;
  modal.querySelector('[data-modal-title]').textContent = content.title;
  modal.querySelector('[data-modal-description]').textContent = content.description;

  const fillList = (selector, items = []) => {
    const list = modal.querySelector(selector);
    if (!list) return;
    list.replaceChildren();
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
  };

  const highlights = modal.querySelector('[data-modal-highlights]');
  highlights?.replaceChildren();
  content.highlights?.forEach(h => {
    const el = document.createElement('article');
    el.className = 'modal-highlight';
    el.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${h.icon}</span><small>${h.label}</small><strong>${h.value}</strong>`;
    highlights?.appendChild(el);
  });

  fillList('[data-modal-best]',     content.bestFor);
  fillList('[data-modal-list]',     content.features);
  fillList('[data-modal-delivery]', content.delivery);

  const ctaLabel = modal.querySelector('[data-modal-cta-label]');
  ctaLabel?.replaceChildren(document.createTextNode(`Quero entender se o ${content.title} combina com minha empresa`));

  modal.querySelector('[data-whatsapp]')?.setAttribute('data-whatsapp', content.whatsappMessage || getPageWhatsappMessage());

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeSystemModal() {
  const modal = document.getElementById('modalSistema');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* --- Chat widget --- */

function setChatOpen(isOpen) {
  if (!chatWidget) return;
  chatWidget.classList.toggle('is-open', isOpen);
  chatWidget.querySelector('.chat-toggle')?.setAttribute('aria-expanded', String(isOpen));
}

function showChatTopic(topic) {
  const reply    = chatWidget?.querySelector('[data-chat-reply]');
  const chatBody = chatWidget?.querySelector('.chat-body');
  if (!reply) return;

  reply.replaceChildren();

  const q = document.createElement('div');
  q.className   = 'chat-message';
  q.textContent = topic.question;

  const a = document.createElement('div');
  a.className = 'chat-message';
  a.innerHTML = topic.answer;

  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'chat-reset';
  reset.dataset.chatReset = '';
  reset.textContent = 'Ver outras perguntas';

  reply.append(q, a, reset);

  if (chatBody) {
    requestAnimationFrame(() => {
      const centeredTop = a.offsetTop - (chatBody.clientHeight - a.offsetHeight) / 2;
      chatBody.scrollTo({ top: Math.max(0, centeredTop), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }
}

function initVoeAiChat() {
  if (document.getElementById('voeAiChat')) return;

  const widget = document.createElement('div');
  widget.id = 'voeAiChat';
  widget.className = 'chat-widget';
  widget.innerHTML = `
    <div class="chat-panel" role="dialog" aria-label="Chat VoeAI">
      <header class="chat-header">
        <img src="${voeAiAvatarSrc}" width="42" height="42" alt="" loading="lazy">
        <div><strong>VoeAI</strong><span>Assistente comercial da SEATEC</span></div>
        <button type="button" class="icon-button" data-chat-close aria-label="Fechar VoeAI">
          <span class="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
      </header>
      <div class="chat-body">
        <div class="chat-message">Olá! Resumo as principais informações do site para você decidir mais rápido.</div>
        <div data-chat-reply></div>
      </div>
      <div class="chat-options"></div>
      <footer class="chat-footer">
        <button type="button" class="chat-human" data-whatsapp="Olá! Vim pelo chat VoeAI e quero falar com um atendente.">
          <span class="material-symbols-outlined" aria-hidden="true">support_agent</span>
          Atendimento humano
        </button>
      </footer>
    </div>
    <button type="button" class="chat-toggle" aria-label="Abrir VoeAI" aria-expanded="false" data-chat-toggle>
      <img src="${voeAiAvatarSrc}" width="42" height="42" alt="" loading="lazy">
      <span><strong>VoeAI</strong><small>Assistente virtual</small></span>
    </button>
  `;

  const options = widget.querySelector('.chat-options');
  voeAiTopics.forEach(topic => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.chatTopic = topic.id;
    btn.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">chevron_right</span><span>${topic.question}</span>`;
    options.appendChild(btn);
  });

  document.body.appendChild(widget);
  chatWidget = widget;
}

/* --- Page transition --- */

function runProductTransition(link, product = 'pdvlegal') {
  const href = link.href;

  if (pageTransitionActive || prefersReducedMotion) { window.location.href = href; return; }

  pageTransitionActive = true;

  const cfg = {
    voe:      { src: 'assets/images/voepdv.png',   alt: 'VoePDV',   className: 'page-transition--voe' },
    pdvlegal: { src: 'assets/images/pdvlegal.png',  alt: 'PDV Legal', className: 'page-transition--pdvlegal' },
    seatec:   { src: 'assets/images/LOGO-PNG.svg',  alt: 'SEATEC',   className: 'page-transition--seatec' }
  }[product] || { src: 'assets/images/pdvlegal.png', alt: 'PDV Legal', className: 'page-transition--pdvlegal' };

  const sourceLogo = document.querySelector(`[data-page-transition-logo="${product}"]`)
    || document.querySelector(`img[src*="${cfg.src.split('/').pop()}"]`);

  const overlay = document.createElement('div');
  const stage   = document.createElement('div');
  const logo    = document.createElement('img');

  overlay.className = `page-transition ${cfg.className}`;
  stage.className   = 'page-transition__logo-wrap';
  logo.className    = 'page-transition__logo';
  logo.src          = sourceLogo?.currentSrc || sourceLogo?.src || cfg.src;
  logo.alt          = cfg.alt;

  stage.appendChild(logo);
  overlay.appendChild(stage);
  document.body.appendChild(overlay);
  document.body.classList.add('is-page-transitioning');

  requestAnimationFrame(() => overlay.classList.add('is-running'));
  window.setTimeout(() => overlay.classList.add('is-leaving'), 980);
  window.setTimeout(() => { window.location.href = href; }, 1320);
}

/* --- Click video --- */

function toggleClickVideo(trigger) {
  const card  = trigger.closest('.product-video-card');
  const video = card?.querySelector('video[data-click-video]') || trigger.closest('video[data-click-video]');
  if (!video) return;

  if (video.paused) {
    const p = video.play();
    card?.classList.add('is-playing');
    p?.catch(() => card?.classList.remove('is-playing'));
  } else {
    video.pause();
    card?.classList.remove('is-playing');
  }
}

/* --- Global click handler --- */

function handleClick(event) {
  const t = event.target;

  const themeToggle    = t.closest('[data-theme-toggle]');
  const menuToggle     = t.closest('[data-mobile-menu-toggle]');
  const anchor         = t.closest('a[href^="#"]');
  const pageTransition = t.closest('a[data-page-transition]');
  const whatsapp       = t.closest('[data-whatsapp]');
  const modalOpen      = t.closest('[data-system-modal]');
  const modalClose     = t.closest('[data-modal-close]');
  const chatToggle     = t.closest('[data-chat-toggle],[data-voeai-open]');
  const chatClose      = t.closest('[data-chat-close]');
  const chatTopic      = t.closest('[data-chat-topic]');
  const chatReset      = t.closest('[data-chat-reset]');
  const clickVideo     = t.closest('[data-click-video],[data-click-video-control]');
  const chatOutside    = chatWidget?.classList.contains('is-open')
    && !t.closest('#voeAiChat')
    && !t.closest('[data-voeai-open]');

  if (chatOutside)    { setChatOpen(false); }
  if (themeToggle)    { const next = document.body.classList.contains(lightThemeClass) ? 'dark' : 'light'; setTheme(next); saveTheme(next); return; }
  if (menuToggle)     { toggleMobileMenu(); return; }
  if (clickVideo)     { toggleClickVideo(clickVideo); return; }

  if (pageTransition && pageTransition.origin === window.location.origin) {
    event.preventDefault();
    closeMobileMenu();
    const prod = pageTransition.dataset.pageTransition
      || (pageTransition.getAttribute('href')?.includes('voe.html') ? 'voe' : 'pdvlegal');
    runProductTransition(pageTransition, prod);
    return;
  }

  if (anchor && scrollToAnchor(anchor)) { event.preventDefault(); return; }
  if (whatsapp)    { openWhatsapp(whatsapp.dataset.whatsapp || getPageWhatsappMessage()); return; }
  if (modalOpen)   { openSystemModal(modalOpen.dataset.systemModal); return; }
  if (modalClose)  { closeSystemModal(); return; }
  if (chatToggle)  { setChatOpen(!chatWidget?.classList.contains('is-open')); return; }
  if (chatClose)   { setChatOpen(false); return; }
  if (chatTopic)   { const tp = voeAiTopics.find(x => x.id === chatTopic.dataset.chatTopic); if (tp) showChatTopic(tp); return; }
  if (chatReset)   { chatWidget?.querySelector('[data-chat-reply]')?.replaceChildren(); }
}

/* --- Keydown handler --- */

function handleKeydown(e) {
  if (e.key !== 'Escape') return;
  closeMobileMenu();
  closeSystemModal();
  setChatOpen(false);
}

/* --- Init --- */

function init() {
  setTheme(getSavedTheme() === 'light' ? 'light' : 'dark');
  updateHeaderState();
  initReveal();
  initImages();
  initFreezeLastFrameVideos();
  initDeferredIframes();
  initVoeAiChat();
  initTilt();
  initScrollQuestions();

  document.addEventListener('click',   handleClick);
  document.addEventListener('keydown',  handleKeydown);
  window.addEventListener('scroll',     updateHeaderState, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

window.abrirModal = openSystemModal;
