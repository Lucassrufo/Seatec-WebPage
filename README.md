# SEATEC WebPage

Site institucional estático da SEATEC Soluções Tecnológicas, com foco em sistemas PDV, automação comercial, suporte técnico e conversão via WhatsApp.

## Visão Geral

O projeto contém três páginas principais:

- `public/index.html`: página inicial da SEATEC.
- `public/voe.html`: página do VoePDV, sistema PDV para Windows.
- `public/pdv-legal.html`: página do PDV Legal, sistema PDV Android para maquininha, Smart POS, delivery, estoque, vendas e emissão fiscal.

Também há uma página de fallback:

- `public/404.html`: página de erro para publicação estática.

## Principais Recursos

- Design system próprio com tokens de cor, cards, botões, navegação, seções e CTAs.
- Layout responsivo para mobile, tablet e desktop.
- Headers com navegação por âncoras e tema claro/escuro.
- Footers com navegação, soluções, contato, endereço, CNPJ, termos e privacidade.
- CTAs para WhatsApp comercial e suporte.
- Chat flutuante TsuruIA com perguntas rápidas e atendimento humano.
- Modal de sistemas na página inicial.
- Vídeo incorporado do PDV Legal.
- Marquee de clientes e cards de adquirentes.
- Animações suaves com respeito a `prefers-reduced-motion`.
- Headers de segurança e cache para hosts compatíveis com `_headers`.

## Estrutura

```text
.
├── public/
│   ├── index.html
│   ├── voe.html
│   ├── pdv-legal.html
│   ├── 404.html
│   ├── robots.txt
│   ├── _headers
│   ├── _redirects
│   └── assets/
│       ├── css/
│       │   ├── tailwind.css
│       │   └── style.min.css
│       ├── js/
│       │   └── script.min.js
│       └── images/
│           ├── adquirentes/
│           ├── clientes/
│           └── optimized/
├── src/
│   ├── scripts/
│   │   └── site.js
│   └── styles/
│       ├── site.css
│       └── tailwind-input.css
├── package.json
├── package-lock.json
├── tailwind.config.js
└── README.md
```

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Gere os arquivos finais:

```bash
npm run build
```

No Windows/PowerShell, se `npm` estiver bloqueado por política local, use:

```bash
npm.cmd run build
```

## Scripts

- `npm run build`: gera Tailwind, CSS minificado e JavaScript minificado.
- `npm run build:tailwind`: gera `public/assets/css/tailwind.css`.
- `npm run build:assets`: gera `public/assets/css/style.min.css` e `public/assets/js/script.min.js`.
- `npm run build:css`: atalho para gerar somente o Tailwind.

## Arquivos Fonte

Edite preferencialmente:

- `src/styles/site.css`
- `src/styles/tailwind-input.css`
- `src/scripts/site.js`
- HTMLs dentro de `public/`

Arquivos gerados pelo build:

- `public/assets/css/tailwind.css`
- `public/assets/css/style.min.css`
- `public/assets/js/script.min.js`

Depois de alterar CSS ou JS fonte, rode `npm.cmd run build`.

## Publicação

O site é estático. Para publicar, use a pasta `public/` como diretório de saída.

Arquivos úteis para hospedagem:

- `public/_headers`: políticas de segurança e cache.
- `public/_redirects`: fallback para `404.html`.
- `public/robots.txt`: regras de indexação.

## Manutenção

- Mantenha imagens otimizadas em `public/assets/images/optimized/`.
- Mantenha logos e marcas em `public/assets/images/`.
- Não edite `node_modules/`; a pasta é recriada com `npm install`.
- Ao trocar favicon, atualize as referências nos HTMLs.
- Ao mudar links legais, mantenha os três footers sincronizados.
- Ao alterar textos de CTA ou WhatsApp, revise também `src/scripts/site.js`.

## Validação Recomendada

Antes de publicar:

```bash
npm.cmd run build
node --check src/scripts/site.js
node --check public/assets/js/script.min.js
```

O build pode exibir aviso de Browserslist/caniuse-lite desatualizado. Isso não impede a geração dos assets.
