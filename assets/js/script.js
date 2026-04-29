// SCROLL SUAVE COM OFFSET (header fixo)
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
            behavior: "smooth"
        });
    });
});


// ANIMAÇÃO AO SCROLL (fade-up)
const elements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.2
});

elements.forEach(el => observer.observe(el));

function abrirWhats(msg = "Olá! Vim pelo site e quero saber mais sobre os sistemas PDV.") {
    const phone = "5511954401640"; // TROCAR AQUI
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