// SCROLL COM OFFSET (header fixo)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (!target) return;

        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "auto"
        });
    });
});


// ANIMAÇÃO AO SCROLL (fade-up)
const elements = document.querySelectorAll('.fade-up, .maquininha-card, .adquirente-card');
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
    rootMargin: "0px 0px -16% 0px",
    threshold: 0.18
});

elements.forEach(el => observer.observe(el));

function abrirWhats(msg = "Olá! Vim pelo site e quero saber mais sobre os sistemas PDV.") {
    const phone = "551133846313"; // TROCAR AQUI
    const message = encodeURIComponent(msg);

    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
}

function abrirModal(tipo) {
  const modal = document.getElementById("modalSistema");
  const box = document.getElementById("modalBox");
  const backdrop = document.getElementById("backdrop");
  const modalLogo = document.getElementById("modalLogo");

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

    modalVideo.src = "https://www.youtube.com/embed/VIDEO_VOEPDV";
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

    modalVideo.src = "https://www.youtube.com/embed/VIDEO_PDVLEGAL";
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
  }, 400);
}

const kellyIaTopics = [
  {
    id: "time",
    question: "Conhe\u00e7a nosso time",
    answer: `
      <strong>Nosso time une atendimento, tecnologia e gest\u00e3o para acompanhar o cliente de perto.</strong><br><br>
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
    question: "Quais sistemas a SEATEC oferece?",
    answer: `
      A SEATEC trabalha com solu\u00e7\u00f5es PDV para diferentes tipos de opera\u00e7\u00e3o.<br><br>
      <strong>VoePDV:</strong> sistema para Windows, ideal para caixa com alto fluxo, gest\u00e3o de estoque, emiss\u00e3o NFC-e e NF-e, relat\u00f3rios, TEF integrado e controle completo da opera\u00e7\u00e3o.<br><br>
      <strong>PDV Legal:</strong> sistema para Android, maquininha e Smart POS. Permite vender, emitir NFC-e, controlar estoque, comandas, delivery e acompanhar relat\u00f3rios em tempo real.
    `
  },
  {
    id: "implantacao",
    question: "Como funciona a implanta\u00e7\u00e3o?",
    answer: `
      A implanta\u00e7\u00e3o \u00e9 acompanhada pelo time da SEATEC para deixar o sistema pronto para uso no dia a dia.<br><br>
      Ajudamos na configura\u00e7\u00e3o inicial, orientamos o uso das principais fun\u00e7\u00f5es e ajustamos o sistema conforme a rotina do neg\u00f3cio, seja no caixa Windows com o VoePDV ou na opera\u00e7\u00e3o Android com o PDV Legal.
    `
  },
  {
    id: "suporte",
    question: "Como funciona o suporte?",
    answer: `
      O suporte da SEATEC \u00e9 feito por um time que conhece a opera\u00e7\u00e3o comercial de perto e busca resolver com agilidade.<br><br>
      O cliente pode chamar pelo WhatsApp de suporte, receber orienta\u00e7\u00f5es sobre o sistema e contar com acompanhamento para d\u00favidas, ajustes e rotinas importantes do PDV.
    `
  },
  {
    id: "contato",
    question: "Quero falar com um consultor",
    answer: "Perfeito. Nosso time comercial pode entender sua opera\u00e7\u00e3o e indicar a melhor solu\u00e7\u00e3o entre VoePDV, PDV Legal e outros recursos da SEATEC.",
    action: {
      label: "Abrir WhatsApp",
      message: "Ol\u00e1! Vim pelo chat KellyIA e quero falar com um consultor."
    }
  }
];

function iniciarKellyIa() {
  if (document.getElementById("kellyIaWidget")) return;

  const widget = document.createElement("div");
  widget.id = "kellyIaWidget";
  widget.className = "kellyia-widget";
  widget.innerHTML = `
    <section class="kellyia-chat" aria-label="Chat KellyIA">
      <header class="kellyia-header">
        <div class="kellyia-avatar">K</div>
        <div>
          <strong>KellyIA</strong>
          <span>Assistente virtual da SEATEC</span>
        </div>
        <button type="button" class="kellyia-close" aria-label="Fechar KellyIA">
          <span class="material-symbols-outlined">close</span>
        </button>
      </header>

      <div class="kellyia-body">
        <div class="kellyia-message kellyia-message-bot">
          Oi! Eu sou a KellyIA. Escolha uma pergunta abaixo para saber mais sobre a SEATEC.
        </div>
        <div class="kellyia-reply" aria-live="polite"></div>
      </div>

      <div class="kellyia-options"></div>
    </section>

    <button type="button" class="kellyia-toggle" aria-expanded="false" aria-controls="kellyIaWidget">
      <span class="material-symbols-outlined">smart_toy</span>
      <span>Fale com a KellyIA</span>
    </button>
  `;

  document.body.appendChild(widget);

  const toggle = widget.querySelector(".kellyia-toggle");
  const close = widget.querySelector(".kellyia-close");
  const options = widget.querySelector(".kellyia-options");
  const reply = widget.querySelector(".kellyia-reply");

  function resetChat() {
    reply.innerHTML = "";
  }

  function setOpen(isOpen) {
    widget.classList.toggle("kellyia-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));

    if (!isOpen) {
      resetChat();
    }
  }

  function showTopic(topic) {
    reply.innerHTML = `
      <div class="kellyia-message kellyia-message-user">${topic.question}</div>
      <div class="kellyia-message kellyia-message-bot">${topic.answer}</div>
      ${topic.action ? `<button type="button" class="kellyia-action">${topic.action.label}</button>` : ""}
    `;

    const actionButton = reply.querySelector(".kellyia-action");
    if (actionButton) {
      actionButton.addEventListener("click", () => abrirWhats(topic.action.message));
    }
  }

  kellyIaTopics.forEach(topic => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "kellyia-option";
    button.textContent = topic.question;
    button.addEventListener("click", () => showTopic(topic));
    options.appendChild(button);
  });

  toggle.addEventListener("click", () => setOpen(!widget.classList.contains("kellyia-open")));
  close.addEventListener("click", () => setOpen(false));

  document.addEventListener("click", event => {
    const isOpen = widget.classList.contains("kellyia-open");
    const clickedInsideWidget = widget.contains(event.target);

    if (isOpen && !clickedInsideWidget) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setOpen(false);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarKellyIa);
} else {
  iniciarKellyIa();
}
