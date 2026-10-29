# Auditoria do portfólio original — 29/10/2026

## Referência correta
Baseline: origin/main `5186afa3099da0ca94855c31e961341ca224b607`, publicada em https://bellussi.vercel.app. A pasta principal estava na branch histórica codex/portfolio-comandinha-visuals (08643d9); não foi usada como controle. A versão publicada foi aberta no Playwright, com texto, links e fontes inspecionados. Screenshots locais do mesmo baseline em `docs/evidence/baseline/`. Sem mudanças de produto antes desta inspeção.

## Arquitetura e pontos fortes
HTML/CSS/JS módulos com Vite 8.3.4, Node 24; Lenis carregado sob demanda para dispositivos capazes. Dados profissionais bilingues em src/content/portfolio.js; renderizadores separados, traduções de conteúdo estático e metadados compartilhados. Tema claro/escuro persistido, PT/EN, CVs, clipboard com status, menu com Escape, skip link, navegação por âncoras. Não há necessidade objetiva de React.

O conteúdo oferece fatos verificáveis: MarketData desde ago/2024 e Banco do Brasil out/2022–ago/2024; escopo e responsabilidades, não métricas fabricadas. Produtos KOReader Ecosystem e Black Market com capturas reais; ferramentas Deploy Preflight, Local Webhook Recorder e Compose Doctor com repositórios, CI e demos. Estas são as provas mais fortes.

## Tipografia, layout e informação
DM Sans e DM Serif Display locais, com fallback e preload. O hero tem 82px/0.98 a 1440px, tracking -0.065em, duas linhas. Em 390px mantém duas linhas com 47px. Há 25 tamanhos medidos no desktop e 85 blocos abaixo de 13px; parte é decoração do hero. Texto de catálogo e notas muito pequeno aumenta o esforço de leitura, especialmente para recrutadores. A medida máxima detectada foi cerca de 89 caracteres. Títulos inferiores chegam a 3–4 linhas no mobile.

O grid editorial, as cores carvão/creme/terracota e o trabalho de motion já têm identidade. A abertura prioriza uma interface gráfica decorativa; em mobile as provas reais de trabalho chegam tarde. As seções seguem uma página longa (cerca de 8.3 telas desktop). C pode aproximar os trabalhos da primeira tela e manter identidade/contato acessíveis durante a leitura.

## Semântica, acessibilidade e interação
Há um h1, headings/sections nomeados, botões reais, labels e foco. Os detalhes profissionais usam disclosure nativo. Links externos têm noopener/noreferrer. O movimento respeita reduced motion e pausa quando oculto; scroll mantém fallback nativo. A/B devem preservar isso. Sem teste com leitor de tela humano, não declarar conformidade WCAG completa. A contagem de avisos do taste é opinião de house style, não resultado de a11y.

Três seções centrais têm HTML gerado pelo JS e placeholders vazios no source: sem JS, parte importante do currículo e projetos não aparece. Para C, prerenderizar todos os fatos em PT no build, com tradução progressiva. Melhorias no controle que alterariam seu comportamento ficam como dívida explícita.

## Internacionalização, SEO, recursos
PT/EN trocam textos, imagens, PDFs e metadados. Canonical na raiz, OG/Twitter 1200×630, ProfilePage/Person/WebSite, robots e sitemap. As variantes devem ter noindex estático e canonical raiz. Manter todos os downloads e URLs existentes. Nenhuma rota aleatória para visitantes.

## Performance e testes de base
`npm ci`: 16 pacotes instalados, auditoria npm com 0 vulnerabilidades reportadas. `npm test`: 54/54 em 29/10/2026. Build: HTML 27.45kB (gzip 6.36), CSS principal 84.18kB (15.43), JS principal 41.03kB (14.03), Lenis lazy JS 19.16kB (5.60). São tamanhos de build, não Web Vitals. Testes existentes cobrem renderização factual, SEO, imagens, atualização de conteúdo, parallax, Lenis e navegação; não constituíam uma suíte completa de navegador.

Fontes e imagens locais evitam terceiros. Captura KOReader PNG é maior que previews WebP existentes do Black Market: oportunidade de otimização em C sem tocar no controle. Nenhum número de Lighthouse/CrUX está presumido aqui; resultados de laboratório finais e limitações constarão no relatório de comparação.

## Duas perspectivas
Recrutador: bom conteúdo factual e CV visível; especialidade está clara, mas a leitura de pequenas legendas e o caminho até projetos pode ser mais curto. Prioridade: nome, front-end, empresas, provas e contato imediatamente reconhecíveis.

Engenheiro sênior: stack simples e testes de lógica são acertos; bom uso de imports dinâmicos e guards. Pontos a investigar: conteúdo central dependente de JS, orçamento de animação/ornamentos, densidade tipográfica e persistência de preferência entre rotas. C deve demonstrar progressivo enhancement e isolamento, sem reescrever lógica estável de A.
