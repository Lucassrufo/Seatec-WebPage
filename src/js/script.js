// SCROLL COM OFFSET (header fixo)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const header = document.querySelector("header");
        const headerOffset = header ? header.offsetHeight : 90;
        const targetRect = target.getBoundingClientRect();
        const targetTop = targetRect.top + window.pageYOffset;
        const viewportArea = window.innerHeight - headerOffset;
        const targetCenter = targetTop + (targetRect.height / 2);
        const centeredPosition = targetCenter - headerOffset - (viewportArea / 2);
        const minPosition = Math.max(0, targetTop - headerOffset - 24);
        const maxPosition = document.documentElement.scrollHeight - window.innerHeight;
        const offsetPosition = Math.min(Math.max(centeredPosition, minPosition), maxPosition);

        window.scrollTo({
            top: offsetPosition,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });
});


// ANIMAÇÃO AO SCROLL (fade-up)
const elements = document.querySelectorAll('.fade-up, .maquininha-card, .adquirente-card');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('show', 'animation-done'));
} else {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.addEventListener('transitionend', () => {
                    entry.target.classList.add('animation-done');
                }, { once: true });
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: "120px 0px -10% 0px",
        threshold: 0.08
    });

    elements.forEach(el => observer.observe(el));
}

document.querySelectorAll('img').forEach((img, index) => {
    img.decoding = 'async';
    if (index > 1 && !img.hasAttribute('loading')) {
        img.loading = 'lazy';
    }
});

function abrirWhats(msg = "Olá! Vim pelo site e quero saber mais sobre os sistemas PDV.") {
    const phone = "551133846313"; // TROCAR AQUI
    const message = encodeURIComponent(msg);

    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-whatsapp]").forEach(button => {
  button.addEventListener("click", () => {
    const message = button.dataset.whatsapp || undefined;
    abrirWhats(message);
  });
});

const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function abrirModal(tipo) {
  const modal = document.getElementById("modalSistema");
  const box = document.getElementById("modalBox");
  const backdrop = document.getElementById("backdrop");
  const modalLogo = document.getElementById("modalLogo");
  const modalVideo = document.getElementById("modalVideo");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  requestAnimationFrame(() => {
    backdrop.classList.remove("opacity-0");
    backdrop.classList.add("opacity-100");

    box.classList.remove("opacity-0", "scale-90", "translate-y-10");
    box.classList.add("opacity-100", "scale-100", "translate-y-0");
  });

  // CONTEÚDO
  if (tipo === "voe") {
    modalLogo.src = "assets/images/voepdv.png";
    modalLogo.classList.remove("hidden");
    modalDescricao.innerText =
      "Solução PDV para Windows de alta performance, projetada para oferecer controle total da operação, estabilidade contínua e máxima eficiência no atendimento de caixas com grande fluxo.";

    modalLista.innerHTML = `
      <li>✔ Controle completo de caixa</li>
      <li>✔ Emissão NFC-e integrada</li>
      <li>✔ Relatórios avançados</li>
      <li>✔ Gestão de estoque completa</li>
      <li>✔ Multiusuário com permissões</li>
      <li>✔ Ideal para alto volume</li>
    `;

    modalVideo.removeAttribute("src");
    modalVideo.classList.add("hidden");
  }

  if (tipo === "legal") {
    modalLogo.src = "assets/images/pdvlegal.png";
    modalLogo.classList.remove("hidden");
    modalDescricao.innerText =
      "Sistema PDV para Android com foco em mobilidade e eficiência operacional, permitindo gestão de vendas em tempo real, operação simplificada e atendimento ágil em qualquer lugar do seu negócio.";

    modalLista.innerHTML = `
      <li>✔ Funciona em celular e tablet</li>
      <li>✔ Ideal para delivery</li>
      <li>✔ Interface simples</li>
      <li>✔ Vendas rápidas</li>
      <li>✔ Integração com impressoras</li>
      <li>✔ Mobilidade total</li>
    `;

    modalVideo.removeAttribute("src");
    modalVideo.classList.add("hidden");
  }
}

function fecharModal() {
  const modal = document.getElementById("modalSistema");
  const box = document.getElementById("modalBox");
  const backdrop = document.getElementById("backdrop");

  backdrop.classList.add("opacity-0");
  backdrop.classList.remove("opacity-100");

  box.classList.add("opacity-0", "scale-90", "translate-y-10");
  box.classList.remove("opacity-100", "scale-100", "translate-y-0");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modalVideo.src = "";
    modalLogo.src = "";
    modalLogo.classList.add("hidden");
  }, 300);
}

document.querySelectorAll("[data-modal-close]").forEach(button => {
  button.addEventListener("click", fecharModal);
});

const pdvVideoModal = document.getElementById("pdvVideoModal");
const pdvVideoFrame = document.getElementById("pdvVideoFrame");
const pdvVideoOpenButtons = document.querySelectorAll("[data-pdv-video-modal-open]");
const pdvVideoCloseButtons = document.querySelectorAll("[data-pdv-video-modal-close]");
let pdvVideoCloseTimer;

function abrirPdvVideoModal() {
  if (!pdvVideoModal || !pdvVideoFrame) return;

  clearTimeout(pdvVideoCloseTimer);
  const videoUrl = pdvVideoFrame.dataset.src;
  if (videoUrl) {
    pdvVideoFrame.src = videoUrl;
  }

  pdvVideoModal.classList.add("is-open");
  pdvVideoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function fecharPdvVideoModal() {
  if (!pdvVideoModal || !pdvVideoFrame) return;

  pdvVideoModal.classList.remove("is-open");
  pdvVideoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  pdvVideoCloseTimer = setTimeout(() => {
    if (!pdvVideoModal.classList.contains("is-open")) {
      pdvVideoFrame.src = "";
    }
  }, 450);
}

pdvVideoOpenButtons.forEach(button => {
  button.addEventListener("click", abrirPdvVideoModal);
});

pdvVideoCloseButtons.forEach(button => {
  button.addEventListener("click", fecharPdvVideoModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && pdvVideoModal?.classList.contains("is-open")) {
    fecharPdvVideoModal();
  }
});

document.querySelectorAll(".adquirente-logo img").forEach(img => {
  img.addEventListener("error", () => {
    img.classList.add("hidden");
    img.nextElementSibling?.classList.remove("hidden");
  });
});

const kellyIaTopics = [
  {
    id: "time",
    question: "Conhe\u00e7a o time SEATEC",
    answer: `
      <strong>Nosso time une suporte, tecnologia e gest\u00e3o para acompanhar sua opera\u00e7\u00e3o de perto.</strong><br><br>
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
    question: "Qual sistema combina com minha opera\u00e7\u00e3o?",
    answer: `
      A SEATEC trabalha com solu\u00e7\u00f5es PDV para diferentes rotinas comerciais.<br><br>
      <strong>VoePDV:</strong> sistema para Windows, ideal para caixa com alto fluxo, gest\u00e3o de estoque, emiss\u00e3o NFC-e e NF-e, relat\u00f3rios, TEF integrado e controle completo da opera\u00e7\u00e3o.<br><br>
      <strong>PDV Legal:</strong> sistema para Android, maquininha e Smart POS. Permite vender, emitir NFC-e, controlar estoque, comandas, delivery e acompanhar relat\u00f3rios em tempo real.
    `
  },
  {
    id: "implantacao",
    question: "Como funciona a implanta\u00e7\u00e3o?",
    answer: `
      A implanta\u00e7\u00e3o \u00e9 acompanhada pelo time da SEATEC para deixar o sistema pronto para a rotina da empresa.<br><br>
      Ajudamos na configura\u00e7\u00e3o inicial, parametriza\u00e7\u00e3o fiscal, orienta\u00e7\u00e3o de uso e ajustes conforme o tipo de opera\u00e7\u00e3o, seja no caixa Windows com o VoePDV ou na opera\u00e7\u00e3o Android com o PDV Legal.
    `
  },
  {
    id: "suporte",
    question: "Como funciona o suporte?",
    answer: `
      O suporte da SEATEC \u00e9 feito por um time que conhece a opera\u00e7\u00e3o comercial de perto e busca resolver com agilidade.<br><br>
      O cliente pode chamar pelo WhatsApp de suporte para tirar d\u00favidas, receber orienta\u00e7\u00f5es do sistema e acompanhar ajustes importantes do PDV.
    `
  },
  {
    id: "contato",
    question: "Falar com um consultor",
    answer: "Perfeito. Nosso time comercial pode entender sua opera\u00e7\u00e3o, volume de vendas, necessidade fiscal e indicar a melhor solu\u00e7\u00e3o entre VoePDV, PDV Legal e outros recursos da SEATEC.",
    action: {
      label: "Abrir WhatsApp",
      message: "Ol\u00e1! Vim pelo chat TsuruIA e quero falar com um consultor."
    }
  }
];

function iniciarKellyIa() {
  if (document.getElementById("kellyIaWidget")) return;

  const widget = document.createElement("div");
  widget.id = "kellyIaWidget";
  widget.className = "kellyia-widget";
  widget.innerHTML = `
    <section class="kellyia-chat" aria-label="Chat TsuruIA">
      <header class="kellyia-header">
        <div class="kellyia-avatar">
          <img src="assets/images/tsuru.png" width="56" height="56" alt="" loading="lazy" decoding="async">
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
          Ol\u00e1! Eu sou a TsuruIA. Posso orientar voc\u00ea sobre sistemas PDV, implanta\u00e7\u00e3o, suporte e contato comercial.
        </div>
        <div class="kellyia-reply" aria-live="polite"></div>
      </div>

      <div class="kellyia-options"></div>

      <footer class="kellyia-footer">
        <button type="button" class="kellyia-human">
          <span class="material-symbols-outlined">support_agent</span>
          Atendimento humano
        </button>
      </footer>
    </section>

    <button type="button" class="kellyia-toggle" aria-label="Abrir TsuruIA">
      <span class="kellyia-toggle-avatar" aria-hidden="true">
        <img src="assets/images/tsuru.png" width="38" height="38" alt="" loading="lazy" decoding="async">
      </span>
      <span aria-hidden="true">💬</span>
      <span>
        <strong>TsuruIA</strong>
        <small>Assistente virtual</small>
      </span>
    </button>
  `;

  document.body.appendChild(widget);

  const toggle = widget.querySelector(".kellyia-toggle");
  const close = widget.querySelector(".kellyia-close");
  const options = widget.querySelector(".kellyia-options");
  const reply = widget.querySelector(".kellyia-reply");
  const human = widget.querySelector(".kellyia-human");

  function resetChat() {
    reply.innerHTML = "";
  }

  function setOpen(isOpen) {
    widget.classList.toggle("kellyia-open", isOpen);

    if (!isOpen) {
      resetChat();
    }
  }

  function showTopic(topic) {
    reply.replaceChildren();

    const question = document.createElement("div");
    question.className = "kellyia-message kellyia-message-user";
    question.textContent = topic.question;

    const answer = document.createElement("div");
    answer.className = "kellyia-message kellyia-message-bot";
    answer.innerHTML = topic.answer;

    reply.append(question, answer);

    if (topic.action) {
      const actionButton = document.createElement("button");
      actionButton.type = "button";
      actionButton.className = "kellyia-action";
      actionButton.textContent = topic.action.label;
      actionButton.addEventListener("click", () => abrirWhats(topic.action.message));
      reply.appendChild(actionButton);
    }
  }

  kellyIaTopics.forEach(topic => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "kellyia-option";
    button.innerHTML = `<span class="material-symbols-outlined">chevron_right</span><strong>${topic.question}</strong>`;
    button.addEventListener("click", () => showTopic(topic));
    options.appendChild(button);
  });

  toggle.addEventListener("click", () => setOpen(!widget.classList.contains("kellyia-open")));
  human.addEventListener("click", () => abrirWhats("Ol\u00e1! Vim pelo chat TsuruIA e quero falar com um atendente."));

  document.querySelectorAll("[data-tsuru-open]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      setOpen(true);
    });
  });

  close.addEventListener("click", () => setOpen(false));

  document.addEventListener("click", event => {
    const isOpen = widget.classList.contains("kellyia-open");
    const clickedInsideWidget = widget.contains(event.target);
    const clickedTsuruButton = event.target.closest("[data-tsuru-open]");

    if (isOpen && !clickedInsideWidget && !clickedTsuruButton) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setOpen(false);
  });
}

function iniciarKellyIaQuandoLivre() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(iniciarKellyIa, { timeout: 1800 });
  } else {
    setTimeout(iniciarKellyIa, 800);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarKellyIaQuandoLivre);
} else {
  iniciarKellyIaQuandoLivre();
}
