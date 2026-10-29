# Portfolio A/B/C Implementation Plan

> Execução inline com executing-plans; usuário autorizou etapas reversíveis sem gates intermediários.

**Goal:** três rotas reais comparáveis, A fiel, B tipográfica e C editorial.
**Architecture:** Vite multipage, geração de B a partir do controle e C de dados compartilhados; seletor isolado.
**Tech Stack:** HTML, CSS, JS, Node 24, Vite 8.3.4, testes node:test e navegador Chromium.
**Spec:** docs/portfolio-abc-design.md

## Global Constraints
Preservar A, sem React, sem claims novos, sem main/merge/publicação oficial. B não muda composição, cores ou motion. Experimentos noindex. Idioma e preferência de tema persistem.

## Review Focus
Rotas diretas com/sem slash; storage indisponível; JS ausente; texto EN mais longo em 320px; seletor desativado não carrega código nem altera layout.

## Tasks
- [x] 1. Escrever testes de rotas/idioma e fidelidade; confirmar falha, implementar gerador e seletor Shadow DOM, build multipage. Arquivos scripts/generate-variants.mjs, src/experiment/*, vite.config.js, test/variants.test.js. Verificar npm test/build e hash original.
- [x] 2. Fontes Zilla locais com licença; B apenas tipografia em styles/variants/typography.css. Verificar CSS permitido e screenshots pareados.
- [x] 3. Render C em src/editorial/render.js com dados de portfolio.js, traduções extras explícitas e cópia estática existente; entrada independente e CSS tokens. Testar todos fatos/links nas duas línguas e prerender sem JS; implementar controles nativos, tema, cópia e navegação.
- [x] 4. Executar suíte/browser, screenshots e auditorias. Corrigir regressões introduzidas. Registrar resultados e notas subjetivas separados em docs/portfolio-comparison.md.
- [ ] 5. Commits coerentes, revisar diff, branch remota e PR de revisão via conector GitHub (gh sem login). Nenhum merge. Atualizar documentação e entregar links de comparação.

Verificação:62/62 unidade,48 combinações e11 fluxos; build normal e sem comparador;6 auditorias Lighthouse13.6. P2 desktop baixo corrigido após revisão independente. Oito ocorrências herdadas documentadas.
