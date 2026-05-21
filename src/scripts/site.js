const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const themeStorageKey = "seatec-theme";
const lightThemeClass = "theme-light";
const whatsappPhone = "551133846313";
const defaultWhatsappMessage = "Olá! Vim pelo site e quero saber mais sobre os sistemas PDV.";
const voeAiAvatarSrc = "assets/images/voeai-avatar.png";

const systemModalContent = {
  voe: {
    logo: "assets/images/voepdv.png",
    title: "VoePDV",
    description:
      "PDV desktop para operações com caixa fixo, alto volume de atendimento e necessidade de controle completo. Indicado para quem precisa de estabilidade, rotina fiscal organizada, estoque confiável e relatórios para acompanhar a operação de perto.",
    highlights: [
      { icon: "desktop_windows", label: "Operação", value: "Caixa fixo Windows" },
      { icon: "speed", label: "Fluxo", value: "Alto volume de vendas" },
      { icon: "monitoring", label: "Gestão", value: "Estoque, fiscal e relatórios" }
    ],
    bestFor: [
      "Lojas, mercados, restaurantes e operações com balcão",
      "Empresas que usam computador, leitor, balança, gaveta e impressora",
      "Rotinas que dependem de controle de caixa e relatórios gerenciais"
    ],
    features: [
      "Venda mesmo quando a internet cai",
      "Controle de estoque, produtos, preços e relatórios",
      "NFC-e, NF-e e SAT integrados à rotina do caixa",
      "Permissões por usuário e operação mais segura",
      "Compatível com periféricos de frente de caixa"
    ],
    delivery: [
      "Implantação orientada pela equipe SEATEC",
      "Parametrização fiscal conforme a operação",
      "Suporte para ajustes da rotina depois da instalação"
    ],
    whatsappMessage: "Olá! Vim pelo site da SEATEC e quero falar com um especialista sobre o VoePDV para minha empresa."
  },
  legal: {
    logo: "assets/images/pdvlegal.png",
    title: "PDV Legal",
    description:
      "PDV Android para vender direto na maquininha, Smart POS, celular ou tablet. Ideal para negócios que precisam de mobilidade no balcão, salão, delivery ou atendimento fora do caixa tradicional, sem perder controle fiscal e retaguarda em nuvem.",
    highlights: [
      { icon: "phone_android", label: "Operação", value: "Android e Smart POS" },
      { icon: "room_service", label: "Atendimento", value: "Balcão, mesas e delivery" },
      { icon: "cloud_done", label: "Gestão", value: "Retaguarda em nuvem" }
    ],
    bestFor: [
      "Food service, delivery, lanchonetes, bares e restaurantes",
      "Vendas móveis em maquininha, celular, tablet ou Smart POS",
      "Operações que precisam de comandas, mesas e atendimento ágil"
    ],
    features: [
      "Venda, receba e emita NFC-e na maquininha",
      "Comandas, mesas, delivery e rotina de balcão",
      "Controle de vendas e relatórios pela retaguarda",
      "Compatível com celular, tablet e Smart POS",
      "Interface prática para equipe operar rápido"
    ],
    delivery: [
      "Configuração inicial e orientação de uso",
      "Ajustes para fluxo de salão, delivery ou balcão",
      "Suporte para emissão fiscal e rotina de venda"
    ],
    whatsappMessage: "Olá! Vim pelo site da SEATEC e quero falar com um especialista sobre o PDV Legal para minha empresa."
  }
};

const voeAiTopics = [
  {
    id: "resumo",
    question: "Resumo rápido do site",
    answer:
      "<strong>A SEATEC ajuda empresas a vender com mais controle, velocidade e suporte próximo.</strong><br><br>O site apresenta duas frentes principais: <strong>VoePDV</strong>, para caixas Windows e operações de alto fluxo, e <strong>PDV Legal</strong>, para Android, maquininhas e Smart POS.<br><br>Também mostramos recursos de estoque, vendas, emissão fiscal, relatórios, implantação e atendimento comercial pelo WhatsApp."
  },
  {
    id: "sistemas",
    question: "Qual PDV combina com minha operação?",
    answer:
      "<strong>VoePDV</strong> costuma ser a melhor escolha para empresas com caixa fixo, computador Windows, alto volume de atendimento e necessidade de uma retaguarda completa.<br><br><strong>PDV Legal</strong> combina com quem precisa vender com mobilidade: maquininha, Smart POS, delivery, comandas, balcão e atendimento fora do caixa tradicional."
  },
  {
    id: "entregas",
    question: "O que a SEATEC entrega?",
    answer:
      "A proposta não é só instalar um sistema. A SEATEC acompanha configuração, parametrização fiscal, orientação inicial e ajustes para a rotina real da empresa.<br><br>O foco é deixar vendas, estoque, caixa, relatórios e emissão fiscal funcionando com clareza para a equipe."
  },
  {
    id: "suporte",
    question: "Como funciona o suporte?",
    answer:
      "O suporte é pensado para quem depende do PDV todos os dias. O cliente pode chamar a equipe para tirar dúvidas, receber orientações e acompanhar ajustes importantes da operação."
  },
  {
    id: "contato",
    question: "Quero uma indicação para minha empresa",
    answer:
      "Perfeito. O time comercial pode entender seu segmento, volume de vendas, forma de atendimento, necessidade fiscal e indicar o caminho mais adequado entre VoePDV, PDV Legal e recursos complementares."
  }
];

let chatWidget;
let videoCloseTimer;
let pageTransitionActive = false;

function getSavedTheme() {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Tema continua disponível mesmo sem armazenamento local.
  }
}

function setTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle(lightThemeClass, isLight);
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isLight ? "#f8fbff" : "#020617");

  document.querySelectorAll("[data-theme-toggle]").forEach(button => {
    button.setAttribute("aria-pressed", String(isLight));
    button.setAttribute("aria-label", isLight ? "Ativar tema escuro" : "Ativar tema claro");
    button.querySelector(".material-symbols-outlined")?.replaceChildren(document.createTextNode(isLight ? "dark_mode" : "light_mode"));
    button.querySelector("[data-theme-label]")?.replaceChildren(document.createTextNode(isLight ? "Escuro" : "Tema"));
  });
}

function openWhatsapp(message = defaultWhatsappMessage) {
  window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function getPageWhatsappMessage() {
  if (document.body.classList.contains("product-voe")) {
    return "Olá! Vim pela página do VoePDV e quero entender como ele pode funcionar na minha operação.";
  }

  if (document.body.classList.contains("product-legal")) {
    return "Olá! Vim pela página do PDV Legal e quero entender como vender pela maquininha ou Smart POS.";
  }

  return "Olá! Vim pelo site da SEATEC e quero uma indicação de sistema PDV para minha empresa.";
}

function closeMobileMenu() {
  const menu = document.querySelector("[data-mobile-menu]");
  const toggle = document.querySelector("[data-mobile-menu-toggle]");
  menu?.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  const menu = document.querySelector("[data-mobile-menu]");
  const toggle = document.querySelector("[data-mobile-menu-toggle]");
  if (!menu || !toggle) return;

  const isOpen = menu.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
}

function updateHeaderState() {
  document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function scrollToAnchor(anchor) {
  const targetId = anchor.getAttribute("href");
  if (!targetId || !targetId.startsWith("#") || targetId === "#") return false;

  const target = document.querySelector(targetId);
  if (!target) return false;

  const headerHeight = document.querySelector(".site-header")?.offsetHeight || 78;
  const targetRect = target.getBoundingClientRect();
  const targetTop = targetRect.top + window.scrollY;
  const viewportHeight = window.innerHeight;
  const centeredTop = targetTop + targetRect.height / 2 - viewportHeight / 2;
  const startTop = targetTop - headerHeight - 24;
  const top = targetId === "#inicio" ? 0 : Math.max(0, Math.min(centeredTop, startTop + Math.max(targetRect.height * 0.35, 180)));

  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  closeMobileMenu();
  return true;
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        window.setTimeout(() => entry.target.classList.add("reveal-done"), 4200);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 8, 6) * 180}ms`;
    observer.observe(element);
  });
}

function initImages() {
  document.querySelectorAll("img").forEach((image, index) => {
    image.decoding = "async";
    if (index > 1 && !image.hasAttribute("loading")) image.loading = "lazy";
  });
}

function openSystemModal(type) {
  const content = systemModalContent[type];
  const modal = document.getElementById("modalSistema");
  if (!content || !modal) return;

  modal.querySelector("[data-modal-logo]").src = content.logo;
  modal.querySelector("[data-modal-logo]").alt = content.title;
  modal.querySelector("[data-modal-title]").textContent = content.title;
  modal.querySelector("[data-modal-description]").textContent = content.description;

  const fillList = (selector, items = []) => {
    const list = modal.querySelector(selector);
    if (!list) return;
    list.replaceChildren();
    items.forEach(feature => {
      const item = document.createElement("li");
      item.textContent = feature;
      list.appendChild(item);
    });
  };

  const highlights = modal.querySelector("[data-modal-highlights]");
  highlights?.replaceChildren();
  content.highlights?.forEach(highlight => {
    const item = document.createElement("article");
    item.className = "modal-highlight";
    item.innerHTML = `
      <span class="material-symbols-outlined" aria-hidden="true">${highlight.icon}</span>
      <small>${highlight.label}</small>
      <strong>${highlight.value}</strong>
    `;
    highlights.appendChild(item);
  });

  fillList("[data-modal-best]", content.bestFor);
  fillList("[data-modal-list]", content.features);
  fillList("[data-modal-delivery]", content.delivery);

  const ctaLabel = modal.querySelector("[data-modal-cta-label]");
  ctaLabel?.replaceChildren(document.createTextNode(`Quero entender se o ${content.title} combina com minha empresa`));

  modal.querySelector("[data-whatsapp]")?.setAttribute("data-whatsapp", content.whatsappMessage || getPageWhatsappMessage());

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeSystemModal() {
  const modal = document.getElementById("modalSistema");
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openVideoModal() {
  const modal = document.getElementById("pdvVideoModal");
  const frame = document.getElementById("pdvVideoFrame");
  if (!modal || !frame) return;

  clearTimeout(videoCloseTimer);
  if (frame.dataset.src && !frame.src) frame.src = frame.dataset.src;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVideoModal() {
  const modal = document.getElementById("pdvVideoModal");
  const frame = document.getElementById("pdvVideoFrame");
  if (!modal || !frame) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  videoCloseTimer = window.setTimeout(() => {
    if (!modal.classList.contains("is-open")) frame.src = "";
  }, prefersReducedMotion ? 0 : 250);
}

function setChatOpen(isOpen) {
  if (!chatWidget) return;
  chatWidget.classList.toggle("is-open", isOpen);
  chatWidget.querySelector(".chat-toggle")?.setAttribute("aria-expanded", String(isOpen));
}

function showChatTopic(topic) {
  const reply = chatWidget?.querySelector("[data-chat-reply]");
  const chatBody = chatWidget?.querySelector(".chat-body");
  if (!reply) return;

  reply.replaceChildren();

  const question = document.createElement("div");
  question.className = "chat-message";
  question.textContent = topic.question;

  const answer = document.createElement("div");
  answer.className = "chat-message";
  answer.innerHTML = topic.answer;

  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "chat-reset";
  reset.dataset.chatReset = "";
  reset.textContent = "Ver outras perguntas";

  reply.append(question, answer, reset);

  if (chatBody) {
    window.requestAnimationFrame(() => {
      const centeredTop = answer.offsetTop - (chatBody.clientHeight - answer.offsetHeight) / 2;
      chatBody.scrollTo({
        top: Math.max(0, centeredTop),
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  }
}

function initVoeAiChat() {
  if (document.getElementById("voeAiChat")) return;

  const widget = document.createElement("div");
  widget.id = "voeAiChat";
  widget.className = "chat-widget";
  widget.innerHTML = `
    <div class="chat-panel" role="dialog" aria-label="Chat VoeAI">
      <header class="chat-header">
        <img src="${voeAiAvatarSrc}" width="58" height="58" alt="" loading="lazy">
        <div>
          <strong>VoeAI</strong>
          <span>Assistente comercial da SEATEC</span>
        </div>
        <button type="button" class="icon-button" data-chat-close aria-label="Fechar VoeAI">
          <span class="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
      </header>
      <div class="chat-body">
        <div class="chat-message">Olá! Eu resumo as principais informações do site para você decidir mais rápido.</div>
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
      <img src="${voeAiAvatarSrc}" width="54" height="54" alt="" loading="lazy">
      <span><strong>VoeAI</strong><small>Assistente virtual</small></span>
    </button>
  `;

  const options = widget.querySelector(".chat-options");
  voeAiTopics.forEach(topic => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.chatTopic = topic.id;
    button.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">chevron_right</span><span>${topic.question}</span>`;
    options.appendChild(button);
  });

  document.body.appendChild(widget);
  chatWidget = widget;
}

function initDeferredIframes() {
  const iframes = document.querySelectorAll("iframe[data-src]:not(#pdvVideoFrame)");
  if (!iframes.length) return;

  const loadFrame = iframe => {
    if (!iframe.src) iframe.src = iframe.dataset.src;
  };

  if (!("IntersectionObserver" in window)) {
    iframes.forEach(loadFrame);
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        loadFrame(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "360px 0px" }
  );

  iframes.forEach(iframe => observer.observe(iframe));
}

function runProductTransition(link, product = "pdvlegal") {
  const href = link.href;

  if (pageTransitionActive || prefersReducedMotion) {
    window.location.href = href;
    return;
  }

  pageTransitionActive = true;
  const productConfig = {
    voe: {
      src: "assets/images/voepdv.png",
      alt: "VoePDV",
      className: "page-transition--voe"
    },
    pdvlegal: {
      src: "assets/images/pdvlegal.png",
      alt: "PDV Legal",
      className: "page-transition--pdvlegal"
    },
    seatec: {
      src: "assets/images/LOGO-PNG.svg",
      alt: "SEATEC",
      className: "page-transition--seatec"
    }
  }[product] || {
    src: "assets/images/pdvlegal.png",
    alt: "PDV Legal",
    className: "page-transition--pdvlegal"
  };
  const sourceLogo =
    document.querySelector(`[data-page-transition-logo="${product}"]`) ||
    document.querySelector(`img[src*="${productConfig.src.split("/").pop()}"]`);
  const sourceRect = sourceLogo?.getBoundingClientRect();
  const overlay = document.createElement("div");
  const stage = document.createElement("div");
  const logo = document.createElement("img");

  overlay.className = `page-transition ${productConfig.className}`;
  stage.className = "page-transition__logo-wrap";
  logo.className = "page-transition__logo";
  logo.src = sourceLogo?.currentSrc || sourceLogo?.src || productConfig.src;
  logo.alt = productConfig.alt;
  logo.width = sourceLogo?.naturalWidth || 819;
  logo.height = sourceLogo?.naturalHeight || 209;

  if (sourceRect) {
    stage.style.setProperty("--start-x", `${sourceRect.left + sourceRect.width / 2}px`);
    stage.style.setProperty("--start-y", `${sourceRect.top + sourceRect.height / 2}px`);
    stage.style.setProperty("--start-w", `${sourceRect.width}px`);
  } else {
    stage.style.setProperty("--start-x", "50vw");
    stage.style.setProperty("--start-y", "50vh");
    stage.style.setProperty("--start-w", "190px");
  }

  stage.appendChild(logo);
  overlay.appendChild(stage);
  document.body.appendChild(overlay);
  document.body.classList.add("is-page-transitioning");

  requestAnimationFrame(() => {
    overlay.classList.add("is-running");
  });

  window.setTimeout(() => {
    overlay.classList.add("is-leaving");
  }, 760);

  window.setTimeout(() => {
    window.location.href = href;
  }, 1120);
}

function toggleClickVideo(trigger) {
  const card = trigger.closest(".product-video-card");
  const video = card?.querySelector("video[data-click-video]") || trigger.closest("video[data-click-video]");
  if (!video) return;

  if (video.paused) {
    const playPromise = video.play();
    card?.classList.add("is-playing");
    if (playPromise?.catch) {
      playPromise.catch(() => card?.classList.remove("is-playing"));
    }
    return;
  }

  video.pause();
  card?.classList.remove("is-playing");
}

function handleClick(event) {
  const target = event.target;
  const themeToggle = target.closest("[data-theme-toggle]");
  const menuToggle = target.closest("[data-mobile-menu-toggle]");
  const anchor = target.closest('a[href^="#"]');
  const productTransition = target.closest('a[data-page-transition], a[href$="pdv-legal.html"], a[href$="voe.html"], a[href^="index.html"]');
  const whatsapp = target.closest("[data-whatsapp]");
  const modalOpen = target.closest("[data-system-modal]");
  const modalClose = target.closest("[data-modal-close]");
  const videoOpen = target.closest("[data-pdv-video-modal-open]");
  const videoClose = target.closest("[data-pdv-video-modal-close]");
  const chatToggle = target.closest("[data-chat-toggle], [data-voeai-open]");
  const chatClose = target.closest("[data-chat-close]");
  const chatTopic = target.closest("[data-chat-topic]");
  const chatReset = target.closest("[data-chat-reset]");
  const clickVideo = target.closest("[data-click-video], [data-click-video-control]");
  const chatClickOutside = chatWidget?.classList.contains("is-open") && !target.closest("#voeAiChat") && !target.closest("[data-voeai-open]");

  if (chatClickOutside) {
    setChatOpen(false);
  }

  if (themeToggle) {
    const nextTheme = document.body.classList.contains(lightThemeClass) ? "dark" : "light";
    setTheme(nextTheme);
    saveTheme(nextTheme);
    return;
  }

  if (menuToggle) {
    toggleMobileMenu();
    return;
  }

  if (clickVideo) {
    toggleClickVideo(clickVideo);
    return;
  }

  if (productTransition && productTransition.origin === window.location.origin) {
    event.preventDefault();
    closeMobileMenu();
    const product =
      productTransition.dataset.pageTransition ||
      (productTransition.getAttribute("href")?.includes("voe.html")
        ? "voe"
        : productTransition.getAttribute("href")?.includes("index.html")
          ? "seatec"
          : "pdvlegal");
    runProductTransition(productTransition, product);
    return;
  }

  if (anchor && scrollToAnchor(anchor)) {
    event.preventDefault();
    return;
  }

  if (whatsapp) {
    openWhatsapp(whatsapp.dataset.whatsapp || getPageWhatsappMessage());
    return;
  }

  if (modalOpen) {
    openSystemModal(modalOpen.dataset.systemModal);
    return;
  }

  if (modalClose) {
    closeSystemModal();
    return;
  }

  if (videoOpen) {
    openVideoModal();
    return;
  }

  if (videoClose) {
    closeVideoModal();
    return;
  }

  if (chatToggle) {
    setChatOpen(!chatWidget?.classList.contains("is-open"));
    return;
  }

  if (chatClose) {
    setChatOpen(false);
    return;
  }

  if (chatTopic) {
    const topic = voeAiTopics.find(item => item.id === chatTopic.dataset.chatTopic);
    if (topic) showChatTopic(topic);
    return;
  }

  if (chatReset) {
    chatWidget?.querySelector("[data-chat-reply]")?.replaceChildren();
  }
}

function handleKeydown(event) {
  if (event.key !== "Escape") return;
  closeMobileMenu();
  closeSystemModal();
  closeVideoModal();
  setChatOpen(false);
}

function init() {
  setTheme(getSavedTheme() === "light" ? "light" : "dark");
  updateHeaderState();
  initReveal();
  initImages();
  initDeferredIframes();
  initVoeAiChat();

  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

window.abrirModal = openSystemModal;
