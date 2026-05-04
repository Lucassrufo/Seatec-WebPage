# SEATEC Website

Site institucional da SEATEC Soluções Tecnológicas, com páginas para VoePDV, PDV Legal, automação comercial, suporte e contato.

## Páginas

- `index.html`: página principal
- `voe.html`: produto VoePDV para Windows
- `pdv-legal.html`: produto PDV Legal para Android e Smart POS
- `404.html`: página de erro para publicação

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Gere os assets de produção:

```bash
npm run build
```

Os arquivos finais ficam em `assets/css/tailwind.css`, `assets/css/style.min.css` e `assets/js/script.min.js`. O site é estático e pode ser aberto localmente pelo `index.html` ou publicado em serviços como Netlify, Cloudflare Pages, Vercel ou hospedagem tradicional.

## Estrutura

- `src/css/`: CSS fonte editável
- `src/js/`: JavaScript fonte editável
- `assets/css/`: CSS gerado para produção
- `assets/js/`: JavaScript gerado para produção
- `assets/images/`: imagens usadas pelo site
- `assets/images/optimized/`: imagens otimizadas usadas nas páginas

## Produção

Arquivos úteis já incluídos:

- `_headers`: headers de segurança e cache para hosts compatíveis
- `_redirects`: rota 404 para hosts compatíveis
- `robots.txt`: liberação de indexação

Quando o domínio final estiver definido, adicione `canonical`, `og:url`, imagens sociais absolutas e `sitemap.xml`.
