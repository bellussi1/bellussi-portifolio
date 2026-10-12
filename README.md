# Portfólio de Enzo Bellussi

Portfólio profissional voltado a recrutadores, com experiência em engenharia front-end, versões em português e inglês e currículos para download.

**Site:** [bellussi.vercel.app](https://bellussi.vercel.app)

## Desenvolvimento

Use Node.js 24 e instale as dependências do lockfile:

```sh
npm ci
npm run dev
```

Para validar e visualizar o build de produção:

```sh
npm run build
npm run preview
```

## Estrutura

- `index.html`: conteúdo em português, semântica, metadados e estrutura das seções.
- `src/translations.js`: versão em inglês dos textos.
- `src/main.js`: idioma, menu, navegação, animações e cópia do contato.
- `styles/style.css`: tokens visuais, componentes, composição responsiva e movimento reduzido.
- `public/curriculo-pt.pdf` e `public/curriculo-en.pdf`: currículos para download.

O site usa HTML, CSS e JavaScript com Vite, sem framework de interface ou biblioteca de animação. Os textos principais continuam presentes no HTML sem depender do JavaScript. As animações respeitam `prefers-reduced-motion`.

## Atualização de conteúdo

Atualize os textos em português no HTML e as respectivas chaves em `src/translations.js`. Substitua os PDFs mantendo os nomes acima. A troca de idioma também troca o currículo dos botões principais.

As experiências profissionais descrevem responsabilidades fornecidas no currículo. Não há código, screenshots de sistemas internos ou métricas de impacto inventadas.

## Publicação

O projeto mantém a integração existente com a Vercel. Comando de build: `npm run build`; diretório de saída: `dist`; versão de Node: 24.x.
