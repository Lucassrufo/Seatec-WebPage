const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const themeStorageKey = "seatec-theme";
const lightThemeClass = "theme-light";
const whatsappPhone = "551133846313";
const defaultWhatsappMessage = "Olá! Vim pelo site e quero saber mais sobre os sistemas PDV.";
const tsuruAvatarSrc = "assets/images/tsuru-avatar.png";

const modalContent = {
  voe: {
    logo: "assets/images/voepdv.png",
    title: "VoePDV",
    description:
      "Solução PDV para Windows de alta performance, projetada para oferecer controle total da operação, estabilidade contínua e máxima eficiência no atendimento de caixas com grande fluxo.",
    features: [
      "Controle completo de caixa",
      "Emissão NFC-e integrada",
      "Relatórios avançados",
      "Gestão de estoque completa",
      "Multiusuário com permissões",
      "Ideal para alto volume"
    ]
  },
  legal: {
    logo: "assets/images/pdvlegal.png",
    title: "PDV Legal",
    description:
      "Sistema PDV para Android com foco em mobilidade e eficiência operacional, permitindo gestão de vendas em tempo real, operação simplificada e atendimento ágil em qualquer lugar do seu negócio.",
    features: [
      "Funciona em celular e tablet",
      "Ideal para delivery",
      "Interface simples",
      "Vendas rápidas",
      "Integração com impressoras",
      "Mobilidade total"
    ]
  }
};

const kellyIaTopics = [
  {
    id: "time",
    question: "Conheça o time SEATEC",
    answer: `
      <strong>Nosso time une suporte, tecnologia e gestão para acompanhar sua operação de perto.</strong><br><br>
      <strong>Suporte:</strong><br>
      Carlos Martos;<br>
      Luis Eduardo;<br>
      Lucas Rufo.<br><br>
      <strong>Comercial:</strong><br>
      Danilo Lira;<br>
      Kelly Portela.<br><br>
      <strong>Financeiro:</strong><br>
      Leandro.
    `
  },
  {
    id: "sistemas",
    question: "Qual sistema combina com minha operação?",
    answer: `
      A SEATEC trabalha com soluções PDV para diferentes rotinas comerciais.<br><br>
      <strong>VoePDV:</strong> sistema para Windows, ideal para caixa com alto fluxo, gestão de estoque, emissão NFC-e e NF-e, relatórios, TEF integrado e controle completo da operação.<br><br>
      <strong>PDV Legal:</strong> sistema para Android, maquininha e Smart POS. Permite vender, emitir NFC-e, controlar estoque, comandas, delivery e acompanhar relatórios em tempo real.
    `
  },
  {
    id: "implantacao",
    question: "Como funciona a implantação?",
    answer: `
      A implantação é acompanhada pelo time da SEATEC para deixar o sistema pronto para a rotina da empresa.<br><br>
      Ajudamos na configuração inicial, parametrização fiscal, orientação de uso e ajustes conforme o tipo de operação, seja no caixa Windows com o VoePDV ou na operação Android com o PDV Legal.
    `
  },
  {
    id: "suporte",
    question: "Como funciona o suporte?",
    answer: `
      O suporte da SEATEC é feito por um time que conhece a operação comercial de perto e busca resolver com agilidade.<br><br>
      O cliente pode chamar pelo WhatsApp de suporte para tirar dúvidas, receber orientações do sistema e acompanhar ajustes importantes do PDV.
    `
  },
  {
    id: "contato",
    question: "Falar com um consultor",
    answer:
      "Perfeito. Nosso time comercial pode entender sua operação, volume de vendas, necessidade fiscal e indicar a melhor solução entre VoePDV, PDV Legal e outros recursos da SEATEC.",
    action: {
      label: "Abrir WhatsApp",
      message: "Olá! Vim pelo chat TsuruIA e quero falar com um consultor."
    }
  }
];

let pdvVideoCloseTimer;
let kellyIaWidget;

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
    // O tema continua funcional mesmo quando armazenamento local está indisponível.
  }
}

function setTheme(theme) {
  const useLightTheme = theme === "light";
  document.body.classList.toggle(lightThemeClass, useLightTheme);
  document.documentElement.dataset.theme = theme;

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", useLightTheme ? "#f8fafc" : "#020617");

  document.querySelectorAll("[data-theme-toggle]").forEach(button => {
    button.setAttribute("aria-pressed", String(useLightTheme));
    button.setAttribute("aria-label", useLightTheme ? "Ativar tema escuro" : "Ativar tema claro");

    button.querySelector(".material-symbols-outlined")?.replaceChildren(
      document.createTextNode(useLightTheme ? "dark_mode" : "light_mode")
    );
    button.querySelector("[data-theme-label]")?.replaceChildren(
      document.createTextNode(useLightTheme ? "Tema escuro" : "Tema claro")
    );
  });
}

function initThemeToggle() {
  const initialTheme = getSavedTheme() === "light" ? "light" : "dark";
  setTheme(initialTheme);

  if (document.querySelector("[data-theme-toggle]")) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";
  button.dataset.themeToggle = "";
  button.setAttribute("aria-pressed", "false");
  button.innerHTML = `
    <span class="material-symbols-outlined" aria-hidden="true">light_mode</span>
    <span data-theme-label>Tema claro</span>
  `;

  document.body.appendChild(button);
  setTheme(initialTheme);
}

function openWhatsapp(message = defaultWhatsappMessage) {
  window.open(
    `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function getHeaderOffset() {
  return document.querySelector("header")?.offsetHeight || 90;
}

function scrollToSection(target) {
  const headerOffset = getHeaderOffset();
  const targetRect = target.getBoundingClientRect();
  const targetTop = targetRect.top + window.pageYOffset;
  const viewportArea = window.innerHeight - headerOffset;
  const targetCenter = targetTop + targetRect.height / 2;
  const centeredPosition = targetCenter - headerOffset - viewportArea / 2;
  const minPosition = Math.max(0, targetTop - headerOffset - 24);
  const maxPosition = document.documentElement.scrollHeight - window.innerHeight;
  const top = Math.min(Math.max(centeredPosition, minPosition), maxPosition);

  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");

  if (!mobileMenu || !mobileMenuToggle) return;

  mobileMenu.classList.add("hidden");
  mobileMenuToggle.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");

  if (!mobileMenu || !mobileMenuToggle) return;

  const isOpen = !mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden", isOpen);
  mobileMenuToggle.setAttribute("aria-expanded", String(!isOpen));
}

function setModalList(list, features) {
  const fragment = document.createDocumentFragment();

  features.forEach(feature => {
    const item = document.createElement("li");
    item.textContent = `✔ ${feature}`;
    fragment.appendChild(item);
  });

  list.replaceChildren(fragment);
}

function abrirModal(tipo) {
  const content = modalContent[tipo];
  const modal = document.getElementById("modalSistema");
  const box = document.getElementById("modalBox");
  const backdrop = document.getElementById("backdrop");
  const modalLogo = document.getElementById("modalLogo");
  const modalTitle = document.getElementById("modalTitulo");
  const modalDescription = document.getElementById("modalDescricao");
  const modalList = document.getElementById("modalLista");
  const modalVideo = document.getElementById("modalVideo");

  if (!content || !modal || !box || !backdrop || !modalLogo || !modalDescription || !modalList) return;

  modalLogo.src = content.logo;
  modalLogo.alt = content.title;
  modalLogo.classList.remove("hidden");
  if (modalTitle) modalTitle.textContent = content.title;
  modalDescription.textContent = content.description;
  setModalList(modalList, content.features);

  modalVideo?.removeAttribute("src");
  modalVideo?.classList.add("hidden");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    backdrop.classList.remove("opacity-0");
    backdrop.classList.add("opacity-100");
    box.classList.remove("opacity-0", "scale-90", "translate-y-10");
    box.classList.add("opacity-100", "scale-100", "translate-y-0");
  });
}

function fecharModal() {
  const modal = document.getElementById("modalSistema");
  const box = document.getElementById("modalBox");
  const backdrop = document.getElementById("backdrop");
  const modalLogo = document.getElementById("modalLogo");
  const modalVideo = document.getElementById("modalVideo");

  if (!modal || !box || !backdrop) return;

  backdrop.classList.add("opacity-0");
  backdrop.classList.remove("opacity-100");
  box.classList.add("opacity-0", "scale-90", "translate-y-10");
  box.classList.remove("opacity-100", "scale-100", "translate-y-0");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (modalVideo) modalVideo.src = "";
    if (modalLogo) {
      modalLogo.src = "";
      modalLogo.classList.add("hidden");
    }
  }, prefersReducedMotion ? 0 : 300);
}

function abrirPdvVideoModal() {
  const pdvVideoModal = document.getElementById("pdvVideoModal");
  const pdvVideoFrame = document.getElementById("pdvVideoFrame");
  if (!pdvVideoModal || !pdvVideoFrame) return;

  clearTimeout(pdvVideoCloseTimer);
  if (pdvVideoFrame.dataset.src) pdvVideoFrame.src = pdvVideoFrame.dataset.src;

  pdvVideoModal.classList.add("is-open");
  pdvVideoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function fecharPdvVideoModal() {
  const pdvVideoModal = document.getElementById("pdvVideoModal");
  const pdvVideoFrame = document.getElementById("pdvVideoFrame");
  if (!pdvVideoModal || !pdvVideoFrame) return;

  pdvVideoModal.classList.remove("is-open");
  pdvVideoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  pdvVideoCloseTimer = setTimeout(() => {
    if (!pdvVideoModal.classList.contains("is-open")) pdvVideoFrame.src = "";
  }, prefersReducedMotion ? 0 : 450);
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(".fade-up, .maquininha-card, .adquirente-card");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("show", "animation-done"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        entry.target.addEventListener(
          "transitionend",
          () => entry.target.classList.add("animation-done"),
          { once: true }
        );
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "120px 0px -10% 0px", threshold: 0.08 }
  );

  elements.forEach(el => observer.observe(el));
}

function initImages() {
  document.querySelectorAll("img").forEach((img, index) => {
    img.decoding = "async";
    if (index > 1 && !img.hasAttribute("loading")) img.loading = "lazy";
  });
}

function initDeferredIframes() {
  const iframes = document.querySelectorAll(".pdv-video-showcase iframe[src]");
  if (!iframes.length) return;

  iframes.forEach(iframe => {
    iframe.dataset.src = iframe.src;
    iframe.removeAttribute("src");
  });

  const loadFrame = iframe => {
    if (iframe.dataset.src && !iframe.src) iframe.src = iframe.dataset.src;
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

function showKellyTopic(topic, reply) {
  reply.replaceChildren();

  const question = document.createElement("div");
  question.className = "kellyia-message kellyia-message-user";
  question.textContent = topic.question;

  const answer = document.createElement("div");
  answer.className = "kellyia-message kellyia-message-bot";
  answer.innerHTML = topic.answer;

  reply.append(question, answer);

  if (!topic.action) return;

  const actionButton = document.createElement("button");
  actionButton.type = "button";
  actionButton.className = "kellyia-action";
  actionButton.dataset.whatsapp = topic.action.message;
  actionButton.textContent = topic.action.label;
  reply.appendChild(actionButton);
}

function setKellyOpen(isOpen) {
  if (!kellyIaWidget) return;

  kellyIaWidget.classList.toggle("kellyia-open", isOpen);
  kellyIaWidget.querySelector(".kellyia-toggle")?.setAttribute("aria-expanded", String(isOpen));

  if (!isOpen) kellyIaWidget.querySelector(".kellyia-reply")?.replaceChildren();
}

function iniciarKellyIa() {
  if (document.getElementById("kellyIaWidget")) return;

  const widget = document.createElement("div");
  widget.id = "kellyIaWidget";
  widget.className = "kellyia-widget";
  widget.innerHTML = `
    <section class="kellyia-chat" aria-label="Chat TsuruIA">
      <header class="kellyia-header">
        <div class="kellyia-avatar">
          <img src="${tsuruAvatarSrc}" width="56" height="56" alt="" loading="lazy" decoding="async">
        </div>
        <div>
          <strong>TsuruIA</strong>
          <span>Assistente comercial da SEATEC</span>
          <small><i></i> Online agora</small>
        </div>
        <button type="button" class="kellyia-close" aria-label="Fechar TsuruIA">
          <span class="material-symbols-outlined">close</span>
        </button>
      </header>

      <div class="kellyia-body">
        <div class="kellyia-intro">
          <span class="material-symbols-outlined">auto_awesome</span>
          <div>
            <strong>Como posso ajudar?</strong>
            <p>Escolha um assunto abaixo ou fale com um consultor pelo WhatsApp.</p>
          </div>
        </div>

        <div class="kellyia-message kellyia-message-bot">
          Olá! Eu sou a TsuruIA. Posso orientar você sobre sistemas PDV, implantação, suporte e contato comercial.
        </div>
        <div class="kellyia-reply" aria-live="polite"></div>
      </div>

      <div class="kellyia-options"></div>

      <footer class="kellyia-footer">
        <button type="button" class="kellyia-human" data-whatsapp="Olá! Vim pelo chat TsuruIA e quero falar com um atendente.">
          <span class="material-symbols-outlined">support_agent</span>
          Atendimento humano
        </button>
      </footer>
    </section>

    <button type="button" class="kellyia-toggle" aria-label="Abrir TsuruIA" aria-expanded="false">
      <span class="kellyia-toggle-avatar" aria-hidden="true">
        <img src="${tsuruAvatarSrc}" width="38" height="38" alt="" loading="lazy" decoding="async">
      </span>
      <span>
        <strong>TsuruIA</strong>
        <small>Assistente virtual</small>
      </span>
    </button>
  `;

  const options = widget.querySelector(".kellyia-options");
  const fragment = document.createDocumentFragment();

  kellyIaTopics.forEach(topic => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "kellyia-option";
    button.dataset.topicId = topic.id;
    button.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">chevron_right</span><strong>${topic.question}</strong>`;
    fragment.appendChild(button);
  });

  options.appendChild(fragment);
  document.body.appendChild(widget);
  kellyIaWidget = widget;
}

function iniciarKellyIaQuandoLivre() {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(iniciarKellyIa, { timeout: 1800 });
  } else {
    setTimeout(iniciarKellyIa, 800);
  }
}

function handleDocumentClick(event) {
  const target = event.target;
  const themeToggle = target.closest("[data-theme-toggle]");
  const anchor = target.closest('a[href^="#"]');
  const whatsappButton = target.closest("[data-whatsapp]");
  const mobileMenuToggle = target.closest("[data-mobile-menu-toggle]");
  const modalClose = target.closest("[data-modal-close]");
  const pdvVideoOpen = target.closest("[data-pdv-video-modal-open]");
  const pdvVideoClose = target.closest("[data-pdv-video-modal-close]");
  const kellyToggle = target.closest(".kellyia-toggle");
  const kellyClose = target.closest(".kellyia-close");
  const kellyOption = target.closest(".kellyia-option");
  const tsuruOpen = target.closest("[data-tsuru-open]");

  if (themeToggle) {
    const nextTheme = document.body.classList.contains(lightThemeClass) ? "dark" : "light";
    setTheme(nextTheme);
    saveTheme(nextTheme);
    return;
  }

  if (mobileMenuToggle) {
    toggleMobileMenu();
    return;
  }

  if (anchor) {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const section = document.querySelector(targetId);
    if (!section) return;

    event.preventDefault();
    scrollToSection(section);
    closeMobileMenu();
    return;
  }

  if (whatsappButton) {
    openWhatsapp(whatsappButton.dataset.whatsapp || defaultWhatsappMessage);
    return;
  }

  if (modalClose) {
    fecharModal();
    return;
  }

  if (pdvVideoOpen) {
    abrirPdvVideoModal();
    return;
  }

  if (pdvVideoClose) {
    fecharPdvVideoModal();
    return;
  }

  if (kellyToggle || tsuruOpen) {
    event.stopPropagation();
    setKellyOpen(!kellyIaWidget?.classList.contains("kellyia-open") || Boolean(tsuruOpen));
    return;
  }

  if (kellyClose) {
    setKellyOpen(false);
    return;
  }

  if (kellyOption && kellyIaWidget) {
    const topic = kellyIaTopics.find(item => item.id === kellyOption.dataset.topicId);
    const reply = kellyIaWidget.querySelector(".kellyia-reply");
    if (topic && reply) showKellyTopic(topic, reply);
    return;
  }

  if (kellyIaWidget?.classList.contains("kellyia-open") && !kellyIaWidget.contains(target)) {
    setKellyOpen(false);
  }
}

function handleDocumentKeydown(event) {
  if (event.key !== "Escape") return;

  fecharModal();
  fecharPdvVideoModal();
  setKellyOpen(false);
}

function initAdquirenteFallbacks() {
  document.querySelectorAll(".adquirente-logo img").forEach(img => {
    img.addEventListener(
      "error",
      () => {
        img.classList.add("hidden");
        img.nextElementSibling?.classList.remove("hidden");
      },
      { once: true }
    );
  });
}

function init() {
  initThemeToggle();
  initRevealAnimations();
  initImages();
  initDeferredIframes();
  initAdquirenteFallbacks();
  iniciarKellyIaQuandoLivre();

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleDocumentKeydown);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

window.abrirModal = abrirModal;
