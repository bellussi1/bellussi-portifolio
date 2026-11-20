// One bilingual source for experience and project facts used by both layouts.
export const portfolioContent = {
  experiences: [
    {
      id: "marketdata",
      name: "MarketData",
      technologies: [
        "Angular",
        "React",
        "TypeScript",
        "REST APIs",
        "AWS S3",
        "GitLab CI/CD",
      ],
      pt: {
        period: "Ago. 2024 — atual",
        pill: "Consultoria · múltiplos clientes",
        role: "ENGENHEIRO DE SOFTWARE PLENO (FRONT-END)",
        title: "Da interface à responsabilidade técnica.",
        description:
          "Desenvolvimento e sustentação de aplicações com Angular, React e TypeScript. Responsável técnico pelos projetos Dexco e RecargaPay, com atuação em arquitetura, manutenção e entrega em produção.",
        bullets: [
          "Integração com APIs REST e back-ends em ASP.NET MVC.",
          "Interfaces responsivas e acessíveis, com atenção a SEO técnico.",
          "Modernização gradual de sistemas legados e acompanhamento de pipelines no GitLab.",
        ],
        detailsLabel: "Mais sobre o contexto",
        details:
          "Atuação em projetos para clientes de diferentes setores, incluindo Natura, Nissan e Dexco. Trabalho com Tailwind CSS e SASS, armazenamento de assets no AWS S3 e migração gradual de jQuery para frameworks modernos.",
      },
      en: {
        period: "Aug. 2024 — present",
        pill: "Consulting · multiple clients",
        role: "MID-LEVEL SOFTWARE ENGINEER (FRONT-END)",
        title: "From interface development to technical ownership.",
        description:
          "Development and maintenance of applications with Angular, React and TypeScript. Technical ownership of Dexco and RecargaPay projects, contributing to architecture, maintenance and production delivery.",
        bullets: [
          "Integration with REST APIs and ASP.NET MVC back-ends.",
          "Responsive, accessible interfaces with attention to technical SEO.",
          "Gradual legacy modernization and deployment pipeline monitoring in GitLab.",
        ],
        detailsLabel: "More about the context",
        details:
          "Work on projects for clients across different industries, including Natura, Nissan and Dexco. Experience with Tailwind CSS and SASS, asset storage on AWS S3 and gradual migration from jQuery to modern frameworks.",
      },
    },
    {
      id: "banco-do-brasil",
      name: "Banco do Brasil",
      technologies: [
        "Vue.js",
        "Node.js",
        "Design System",
        "Code Review",
        "Scrum",
      ],
      pt: {
        period: "Out. 2022 — ago. 2024",
        pill: "Tecnologia · operações internacionais",
        role: "ESTAGIÁRIO EM ENGENHARIA DE SOFTWARE (FRONT-END)",
        title: "Uma nova base para um sistema legado.",
        description:
          "Atuação no portal interno da Unidade de Negócios Internacionais. Refatoração do sistema legado em Vue.js, com uma arquitetura voltada à reutilização e à manutenção.",
        bullets: [
          "Criação de componentes reutilizáveis e manutenção de Design System interno.",
          "Integração com microsserviços Node.js e tratamento de dados na interface.",
          "Otimização de carregamento, compatibilidade entre navegadores e revisão de código.",
        ],
      },
      en: {
        period: "Oct. 2022 — Aug. 2024",
        pill: "Technology · international operations",
        role: "SOFTWARE ENGINEER INTERN (FRONT-END)",
        title: "A new foundation for a legacy system.",
        description:
          "Work on the internal portal of the International Business Unit. Refactoring of a legacy system using Vue.js, with an architecture focused on reuse and maintainability.",
        bullets: [
          "Reusable components and maintenance of an internal Design System.",
          "Integration with Node.js microservices and data handling in the interface.",
          "Loading performance optimization, browser compatibility and code reviews.",
        ],
      },
    },
  ],
  flagship: {
    id: "atlas",
    name: "ATLAS",
    category: "OPEN KNOWLEDGE · KNOWLEDGE GRAPH",
    technologies: ["Angular 21", "TypeScript", "Zod", "Cloudflare R2", "Playwright", "axe"],
    links: [
      { type: "live", href: "https://atlas-bellussi.pages.dev" },
      { type: "repository", href: "https://github.com/bellussi1/ATLAS" },
    ],
    images: {
      home: { src: "/atlas-home.webp", width: 1200, height: 716 },
      reading: { src: "/atlas-reading.webp", width: 1200, height: 704 },
      itineraries: { src: "/atlas-itineraries.webp", width: 1200, height: 704 },
      graph: { src: "/atlas-graph.webp", width: 1200, height: 704 },
      map: { src: "/atlas-map.webp", width: 1200, height: 704 },
    },
    tour: [
      { key: "reading", href: "https://atlas-bellussi.pages.dev/leitura/marxismo" },
      { key: "itineraries", href: "https://atlas-bellussi.pages.dev/itinerarios" },
      { key: "graph", href: "https://atlas-bellussi.pages.dev/grafos" },
      { key: "map", href: "https://atlas-bellussi.pages.dev/mapa" },
    ],
    metrics: [
      { value: { en: "1,320", pt: "1.320" }, label: { en: "entities in one typed graph", pt: "entidades em um grafo tipado" } },
      { value: { en: "12,146", pt: "12.146" }, label: { en: "claims, each with a citation", pt: "afirmações, todas com citação" } },
      { value: { en: "1,482", pt: "1.482" }, label: { en: "sources", pt: "fontes" } },
      { value: { en: "3,025", pt: "3.025" }, label: { en: "typed relations", pt: "relações tipadas" } },
    ],
    pt: {
      status: "No ar · código aberto",
      headline: "História como uma rede navegável, com a fonte ao lado de cada afirmação.",
      description:
        "Enciclopédia visual e interativa de história, política, economia e sociedade. Pessoas, obras, conceitos e acontecimentos formam um único grafo tipado, reaproveitado por todas as telas: leituras longas, verbetes permanentes, linhas do tempo e redes.",
      metricsNote: "Contagem do release de conteúdo publicado em 18/11/2026.",
      metricsLabel: "ATLAS em números",
      tourLabel: "Quatro formas de entrar no mesmo grafo",
      tourOpen: "Abrir no site",
      tour: {
        reading: { name: "Leituras", caption: "Texto contínuo em capítulos, com retratos, fontes e perguntas para começar.", alt: "Captura do ATLAS em desenvolvimento: leitura sobre marxismo, com retratos de Marx e Engels, o Manifesto Comunista e a Comuna de Paris." },
        itineraries: { name: "Itinerários", caption: "Roteiros em paradas sequenciais que ligam leituras, verbetes e nós do grafo.", alt: "Captura do ATLAS em desenvolvimento: página de itinerários, com filtros por tipo e cartões em forma de selo." },
        graph: { name: "Grafo", caption: "A rede inteira, com filtros por tipo de nó, busca e caminhos entre dois verbetes.", alt: "Captura do ATLAS em desenvolvimento: grafo do acervo com painel de tipos de nó e sugestões de por onde começar." },
        map: { name: "Mapa", caption: "Países, impérios e cidades num globo, com linha do tempo de 1750 a 2026.", alt: "Captura do ATLAS em desenvolvimento: mapa-múndi em globo com conexões históricas e linha do tempo." },
      },
      imageAlt: "Captura real da home do ATLAS, com a chamada principal, a busca no acervo e uma composição geométrica.",
      imageCaption: "Home · site publicado",
      linkLabels: { live: "Abrir o ATLAS", repository: "Ver o código" },
      chapters: [
        {
          label: "PROBLEMA",
          title: "Opinião apresentada como fato.",
          body: "Texto enciclopédico costuma misturar fato documentado, tese atribuída e interpretação no mesmo parágrafo. Os grafos de conhecimento que separam essas coisas raramente são legíveis para quem não é especialista. O ATLAS tenta as duas coisas: uma leitura para estudantes e curiosos, apoiada em dados que um desenvolvedor consegue auditar.",
        },
        {
          label: "MODELO EPISTÊMICO",
          title: "Cada afirmação diz que tipo de afirmação é.",
          body: "Afirmações são registros tipados, com citação própria, validados por um schema Zod. Lacunas conhecidas são declaradas no capítulo, em vez de preenchidas com texto genérico.",
          points: [
            "8.278 fatos documentados",
            "1.544 afirmações controversas",
            "1.171 teses atribuídas",
            "1.153 interpretações",
          ],
        },
        {
          label: "ARQUITETURA",
          title: "Static-first, endereçado por conteúdo.",
          body: "O conteúdo versionado em JSON é validado e compilado em manifesto, índice de busca, adjacência e layouts, e publicado no Cloudflare R2 como objetos imutáveis nomeados pelo SHA-256. O build Angular 21 baixa o release fixado, confere tamanho e hash e faz prerender de cada rota publicada. Não há API em tempo de leitura.",
          points: [
            "Zod confere IDs, slugs, referências e licenças antes de compilar",
            "Signals, componentes standalone e TransferState para não baixar duas vezes na hidratação",
            "Regra ESLint própria impõe fronteiras entre features e bloqueia ciclos",
          ],
        },
        {
          label: "IA COM TRAVAS",
          title: "O modelo rascunha. Uma pessoa publica.",
          body: "A ingestão lê capturas reproduzíveis da Wikipédia, do Wikidata e do Commons. A extração assistida por LLM só mantém citações encontradas literalmente na fonte, um pipeline RAG local (embeddings bge-m3 e reranker) sugere relações como rascunho, e a revisão de IA aparece rotulada como tal. Publicar continua sendo decisão humana.",
        },
        {
          label: "QUALIDADE",
          title: "Testado como produto.",
          body: "Vitest nos componentes, Playwright nas jornadas, axe na acessibilidade automatizada e na estabilidade de layout, e node --test nos scripts de conteúdo e ingestão. Tudo roda no CI, junto com lint, typecheck, build e verificação de links.",
        },
        {
          label: "LIMITES",
          title: "O que ainda falta.",
          body: "Nenhuma afirmação concluiu revisão humana, e o site diz isso. A cobertura varia entre as tradições, e a interface está quase toda em português. Esses limites aparecem no produto, em vez de ficarem escondidos atrás dos números.",
        },
      ],
    },
    en: {
      status: "Live · open source",
      headline: "History as a navigable network, with the source beside every claim.",
      description:
        "A visual, interactive encyclopedia of history, politics, economics and society. People, works, concepts and events form one typed knowledge graph that every screen reuses: long-form readings, permanent entries, timelines and network views.",
      metricsNote: "Counted from the content release published on 18 Nov 2026.",
      metricsLabel: "ATLAS in numbers",
      tourLabel: "Four ways into the same graph",
      tourOpen: "Open on the site",
      tour: {
        reading: { name: "Readings", caption: "Continuous text in chapters, with portraits, sources and questions to start from.", alt: "Capture of ATLAS in development: the reading on Marxism, with portraits of Marx and Engels, the Communist Manifesto and the Paris Commune." },
        itineraries: { name: "Itineraries", caption: "Step-by-step routes that link readings, entries and graph nodes.", alt: "Capture of ATLAS in development: the itineraries page, with type filters and stamp-style cards." },
        graph: { name: "Graph", caption: "The whole network, with node-type filters, search and paths between two entries.", alt: "Capture of ATLAS in development: the collection graph with a node-type panel and suggested starting points." },
        map: { name: "Map", caption: "Countries, empires and cities on a globe, with a timeline from 1750 to 2026.", alt: "Capture of ATLAS in development: a world globe with historical connections and a timeline." },
      },
      imageAlt: "Actual screenshot of the ATLAS home page, with the main headline, catalogue search and a geometric visual composition.",
      imageCaption: "Home · published site",
      linkLabels: { live: "Open ATLAS", repository: "View the code" },
      chapters: [
        {
          label: "PROBLEM",
          title: "Opinion presented as fact.",
          body: "Encyclopedic text tends to blend documented fact, attributed thesis and interpretation in the same paragraph. Knowledge graphs that keep them apart are rarely readable by non-specialists. ATLAS tries to do both: a reading experience for students and curious readers, backed by data a developer can audit.",
        },
        {
          label: "EPISTEMIC MODEL",
          title: "Every claim says what kind of claim it is.",
          body: "Claims are typed records with their own citation, validated by a Zod schema. Known gaps are declared at chapter level instead of being filled with generic text.",
          points: [
            "8,278 documented facts",
            "1,544 contested claims",
            "1,171 attributed theses",
            "1,153 interpretations",
          ],
        },
        {
          label: "ARCHITECTURE",
          title: "Static-first and content-addressed.",
          body: "Versioned JSON content is validated, compiled into a manifest, search index, adjacency and layouts, and published to Cloudflare R2 as immutable objects named by their SHA-256. The Angular 21 build fetches the pinned release, checks size and hash, and prerenders every published route. There is no API at reading time.",
          points: [
            "Zod checks IDs, slugs, references and licenses before anything compiles",
            "Signals, standalone components and TransferState to avoid double downloads during hydration",
            "A custom ESLint rule enforces feature boundaries and blocks import cycles",
          ],
        },
        {
          label: "AI WITH GUARDRAILS",
          title: "The model drafts. A person publishes.",
          body: "Ingestion reads reproducible Wikipedia, Wikidata and Commons snapshots. LLM-assisted extraction keeps only quotes found verbatim in the source, a local RAG pipeline (bge-m3 embeddings and a reranker) suggests relations as drafts, and AI review is labelled as such. Publishing stays a human decision.",
        },
        {
          label: "QUALITY",
          title: "Tested like a product.",
          body: "Vitest for components, Playwright for user journeys, axe for automated accessibility and layout stability checks, and node --test for the content and ingestion scripts. All of it runs in CI alongside lint, typecheck, build and link checks.",
        },
        {
          label: "LIMITS",
          title: "What is not done yet.",
          body: "No claim has completed human review yet, and the site says so. Coverage is uneven across traditions, and the interface is mostly in Portuguese. These limits are shown in the product instead of being hidden behind the numbers.",
        },
      ],
    },
  },
  otherWork: [
    {
      id: "koreader-ecosystem",
      name: "KOReader Ecosystem",
      category: "DESKTOP · READING TOOLS",
      technologies: ["Electron", "React", "TypeScript", "Python", "SQLite"],
      links: [{ type: "code", href: "https://github.com/bellussi1/koreader-ecosystem" }],
      pt: {
        status: "Em desenvolvimento",
        headline: "Calibre, Hardcover e um Kindle com KOReader em um só app para Windows.",
        description:
          "Interface React e Electron sobre um serviço Python local, com edição de metadados, backups criptografados e sincronização de progresso ainda em validação no dispositivo.",
      },
      en: {
        status: "In development",
        headline: "Calibre, Hardcover and a Kindle running KOReader in one Windows app.",
        description:
          "A React and Electron interface over a local Python service, with metadata editing, encrypted backups and reading-progress sync still being validated on device.",
      },
    },
    {
      id: "black-market",
      name: "Black Market",
      category: "WEB · GAME TOOLS",
      technologies: ["Angular SSR", "NestJS", "PostgreSQL", "Drizzle", "Docker"],
      links: [{ type: "code", href: "https://github.com/bellussi1/Black-Market" }],
      pt: {
        status: "Em desenvolvimento",
        headline: "Planejador de receitas, produção e mercado para Black Desert Online.",
        description:
          "Monorepo TypeScript para a comunidade brasileira: receitas aninhadas, custos de produção e dados de mercado, com as regras de cálculo compartilhadas entre navegador e API.",
      },
      en: {
        status: "In development",
        headline: "Recipe, production and market planner for Black Desert Online.",
        description:
          "A TypeScript monorepo for the Brazilian player community: nested recipes, production costs and market data, with calculation rules shared by the browser and the API.",
      },
    },
    {
      id: "deploy-preflight",
      name: "Deploy Preflight",
      category: "CLI · DEPLOY / CI",
      command: "deploy-preflight check --env-file .env.local --json",
      technologies: ["TypeScript", "Node.js", "GitHub Actions"],
      links: [
        { type: "code", href: "https://github.com/bellussi1/deploy-preflight" },
        { type: "tests", href: "https://github.com/bellussi1/deploy-preflight/actions" },
      ],
      pt: {
        headline: "Configuração validada antes do deploy.",
        description:
          "Variáveis ausentes, artefatos ilegíveis e endpoints com falha em um só relatório, com códigos de saída para CI e valores de ambiente fora do output.",
      },
      en: {
        headline: "Validate configuration before deployment.",
        description:
          "Missing variables, unreadable artifacts and failing endpoints in one report, with CI exit codes and environment values kept out of the output.",
      },
    },
    {
      id: "compose-doctor",
      name: "Compose Doctor",
      category: "CLI · INFRA / DOCKER",
      command: "compose-doctor check --file compose.yaml --service api --json",
      technologies: ["TypeScript", "Docker Compose", "CLI"],
      links: [
        { type: "code", href: "https://github.com/bellussi1/compose-doctor" },
        { type: "tests", href: "https://github.com/bellussi1/compose-doctor/actions" },
      ],
      pt: {
        headline: "Entenda o estado do seu ambiente Compose.",
        description:
          "Diagnóstico somente leitura de healthchecks, reinícios e portas publicadas, em texto ou JSON.",
      },
      en: {
        headline: "Understand the state of your Compose environment.",
        description:
          "Read-only diagnostics for healthchecks, restarts and published ports, as text or JSON.",
      },
    },
    {
      id: "local-webhook-recorder",
      name: "Local Webhook Recorder",
      category: "CLI · INTEGRATIONS",
      command: "webhook-recorder replay EVENT_ID --to http://127.0.0.1:3000/webhooks",
      technologies: ["TypeScript", "Node.js", "SQLite"],
      links: [
        { type: "code", href: "https://github.com/bellussi1/local-webhook-recorder" },
        { type: "tests", href: "https://github.com/bellussi1/local-webhook-recorder/actions" },
      ],
      pt: {
        headline: "Um webhook, reproduzido quantas vezes precisar.",
        description:
          "Captura com bytes preservados em SQLite local e replay explícito para handlers em loopback.",
      },
      en: {
        headline: "One webhook, replayed as often as you need.",
        description:
          "Byte-preserving capture in local SQLite and explicit replay to loopback handlers.",
      },
    },
    {
      id: "dalibre",
      name: "Dalibre",
      category: "OPEN SOURCE · GO",
      technologies: ["Go", "MyGo UI", "SQLite", "ICU MessageFormat"],
      links: [
        { type: "code", href: "https://github.com/bellussi1/dalibre" },
        { type: "template", href: "https://github.com/bellussi1/dalibre-plugin-template" },
      ],
      pt: {
        headline: "Contribuições para uma alternativa nativa ao Calibre, em Go.",
        description:
          "Localização completa para pt-BR (1.072 chaves ICU), ordenação de colunas na listagem e sincronização de tipos no SDK de plugins.",
        linkLabels: { code: "Ver o fork", template: "Template de plugin" },
      },
      en: {
        headline: "Contributions to a native Go alternative to Calibre.",
        description:
          "Full pt-BR localization (1,072 ICU keys), list-view column sorting and type sync in the plugin SDK.",
        linkLabels: { code: "View the fork", template: "Plugin template" },
      },
    },
    {
      id: "dalibre-plugins",
      name: "Dalibre Plugins",
      category: "PLUGINS · E-BOOK METADATA",
      technologies: ["JavaScript", "GraphQL", "BrasilAPI", "Open Library"],
      links: [
        { type: "hardcover", href: "https://github.com/bellussi1/dalibre-hardcover" },
        { type: "isbnBrasil", href: "https://github.com/bellussi1/dalibre-isbn-brasil" },
        { type: "openLibrary", href: "https://github.com/bellussi1/dalibre-openlibrary" },
      ],
      pt: {
        headline: "Sincronização com o Hardcover e metadados brasileiros para o Dalibre.",
        description:
          "Três plugins sem dependências: leitura sincronizada nos dois sentidos com o Hardcover, ISBN brasileiro via CBL/BrasilAPI e Open Library.",
        linkLabels: { hardcover: "Hardcover", isbnBrasil: "ISBN Brasil", openLibrary: "Open Library" },
      },
      en: {
        headline: "Hardcover sync and Brazilian metadata for Dalibre.",
        description:
          "Three zero-dependency plugins: two-way Hardcover reading sync, Brazilian ISBN lookup via CBL/BrasilAPI, and Open Library.",
        linkLabels: { hardcover: "Hardcover", isbnBrasil: "ISBN Brasil", openLibrary: "Open Library" },
      },
    },
    {
      id: "scriptorium",
      name: "Scriptorium",
      category: "PYTHON · LOCAL LLM",
      technologies: ["Python", "Ollama", "EPUB"],
      links: [{ type: "code", href: "https://github.com/bellussi1/Scriptorium" }],
      pt: {
        headline: "Tradução literária retomável com modelos locais.",
        description:
          "Fork pessoal de TranslateBooksWithLLMs com glossário por série, checkpoints e saída EPUB, rodando no Ollama.",
      },
      en: {
        headline: "Resumable literary translation with local models.",
        description:
          "A personal fork of TranslateBooksWithLLMs with per-series glossaries, checkpoints and EPUB output, running on Ollama.",
      },
    },
  ],
};
