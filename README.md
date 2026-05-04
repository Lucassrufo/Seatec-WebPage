# SEATEC Website

Site institucional da SEATEC Soluções Tecnológicas, com páginas para VoePDV, PDV Legal, automação comercial, suporte e contato.

## Páginas

- `public/index.html`: página principal
- `public/voe.html`: produto VoePDV para Windows
- `public/pdv-legal.html`: produto PDV Legal para Android e Smart POS
- `public/404.html`: página de erro para publicação

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Gere os assets de produção:

```bash
npm run build
```

Os arquivos finais ficam em `public/assets/css/tailwind.css`, `public/assets/css/style.min.css` e `public/assets/js/script.min.js`. O site é estático e pode ser aberto localmente pelo `public/index.html` ou publicado usando `public/` como pasta de saída.

## Estrutura

- `public/`: arquivos servidos em produção
- `src/css/`: CSS fonte editável
- `src/js/`: JavaScript fonte editável
- `public/assets/css/`: CSS gerado para produção
- `public/assets/js/`: JavaScript gerado para produção
- `public/assets/images/`: imagens usadas pelo site
- `public/assets/images/optimized/`: imagens otimizadas usadas nas páginas

## Produção

Arquivos úteis já incluídos:

- `public/_headers`: headers de segurança e cache para hosts compatíveis
- `public/_redirects`: rota 404 para hosts compatíveis
- `public/robots.txt`: liberação de indexação

Quando o domínio final estiver definido, adicione `canonical`, `og:url`, imagens sociais absolutas e `sitemap.xml`.
