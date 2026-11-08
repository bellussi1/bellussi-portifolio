# Enzo Bellussi — Portfolio

Personal site of **Enzo Bellussi**, a software engineer based in São Paulo, Brazil. An editorial, English-first portfolio with a full Portuguese version, product case studies and ATS-oriented resumes.

**Live:** [bellussi.vercel.app](https://bellussi.vercel.app) · **LinkedIn:** [in/enzo-bellussi](https://www.linkedin.com/in/enzo-bellussi/) · **GitHub:** [bellussi1](https://github.com/bellussi1)

![Portfolio preview](public/og-image.png)

## What is here

- **Editorial V2 design** — Zilla Slab typography, a technical index grid, inline rules and a dark/light theme.
- **ATLAS case study** — the flagship open-source project: an interactive encyclopedia built on a sourced knowledge graph with 896 entities, 7,918 sourced claims and 898 sources.
- **Products** — ATLAS and KOReader Ecosystem, with real screenshots and current status.
- **Open-source tools** — Deploy Preflight, Local Webhook Recorder and Compose Doctor.
- **Experience and approach** — enterprise work at MarketData and Banco do Brasil, plus the engineering principles behind the interface.
- **Bilingual** — English is the default; Portuguese is available through the language switch and `?lang=pt`.
- **Resumes** — ATS-oriented LaTeX resumes in English and Portuguese, linked from the hero, contact section and footer.

## Lighthouse

Final production audit:

| Category | Desktop | Mobile |
| --- | --- | --- |
| Performance | 100 | 97–100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |

Mobile performance varies with the run because the editorial layout has a large first render. Desktop is consistently 100. The remaining mobile variance is layout/style work, not JavaScript execution: the scripts are small and non-blocking.

Choices behind the result:

- No UI framework and no animation library.
- Self-hosted, subsetted Zilla Slab fonts with preload; no third-party font requests.
- AVIF/WebP assets, responsive sizes and explicit dimensions.
- Smooth-scroll, parallax, cursor effects and reveal/observer motion are not required for the layout. The page keeps native scrolling and CSS transitions; touch devices skip decorative entrance animations.
- Static English content is pre-rendered in `index.html`, so the first paint does not depend on JavaScript.
- Below-the-fold sections use `content-visibility` where supported to keep the first layout smaller.
- Semantic HTML, visible focus states, keyboard-friendly navigation, skip link and WCAG-minded contrast.
- English-first metadata, canonical URL, hreflang alternates, Open Graph, Twitter cards, JSON-LD and sitemap.

## Stack

- **HTML, CSS and modern JavaScript** — no framework.
- **Vite** for development and production builds.
- **Node.js 24** and the committed lockfile.
- **Vercel** for hosting.

## Development

```sh
npm ci
npm run dev
```

Validate and preview the production build:

```sh
npm test
npm run build
npm run preview
```

## Structure

```text
index.html                    English content, metadata, page structure and pre-rendered sections
src/main.js                   Language, theme, navigation, scroll progress and contact copy
src/content/portfolio.js      Bilingual experience, product and open-source facts
src/content/render-portfolio.js  Server-safe HTML renderers for the INDEX and FIELD layouts
src/translations.js           Portuguese copy and UI strings
src/utils/page-metadata.js    Language-aware title, description and social metadata
styles/style.css              Base tokens, layout, components and responsive rules
styles/concepts/index-atmosphere.css  INDEX grid, typography, spacing and editorial composition
styles/concepts/pixel-index.css       Hero ornaments, grain and cursor details
styles/variants/zilla.css     Local Zilla Slab font faces
public/fonts/                 Self-hosted font subsets and OFL licenses
public/images/                Product screenshots and pre-rendered project previews
cv/                           LaTeX sources and compiled ATS-oriented resumes
test/                         Rendering, SEO, language, theme and content regression tests
```

## Updating content

1. Edit bilingual facts in `src/content/portfolio.js`.
2. Edit English static copy in `index.html` and the matching Portuguese keys in `src/translations.js`.
3. Rebuild the pre-rendered English sections after changing product or experience data:
   - run `node` with `renderPortfolioSections({ concept: "index", language: "en" })` and replace the three `data-portfolio-content` containers, or
   - remove the pre-rendered content and let `src/main.js` render it on load.
4. Replace screenshots in `public/`, keeping the paths and alt text in `portfolio.js`.
5. Update the ATLAS numbers only when they match the published build.
6. Rebuild the resumes from `cv/curriculo-en.tex` and `cv/curriculo-pt.tex`, then copy the PDFs to `public/`.
7. Run `npm test` and `npm run build`.

## Content policy

Case studies describe work that exists. There are no invented metrics, client screenshots or confidential system details. Client code and internal systems belong to the respective companies. ATLAS numbers are derived from the published content bundle.

## Deployment

The project is connected to Vercel.

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 24.x

---

## Português

Portfólio profissional de **Enzo Bellussi**, engenheiro de software em São Paulo. O inglês é o idioma padrão, com versão completa em português, estudos de caso de produtos, experiência e currículos para download.

- **No ar:** [bellussi.vercel.app](https://bellussi.vercel.app)
- **Projeto principal:** [ATLAS](https://atlas-bellussi.pages.dev) — enciclopédia visual com grafo de conhecimento e fontes em cada afirmação.
- **Currículos:** `public/curriculo-en.pdf` e `public/curriculo-pt.pdf`; fontes em `cv/`.
- **Lighthouse:** 100 em acessibilidade, boas práticas e SEO; performance 100 no desktop e 97–100 no mobile.

Para rodar localmente, use Node.js 24:

```sh
npm ci
npm run dev
```

Os textos em português ficam em `src/translations.js`; o HTML contém o inglês, que é o idioma padrão. Os fatos bilíngues de experiência e produtos ficam em `src/content/portfolio.js`. O README dos currículos, com instruções de compilação LaTeX, está em [`cv/README.md`](cv/README.md).
