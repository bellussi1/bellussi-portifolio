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
        role: "DESENVOLVEDOR FRONT-END",
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
        role: "FRONT-END DEVELOPER",
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
        role: "ESTÁGIO EM DESENVOLVIMENTO FRONT-END",
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
        role: "FRONT-END DEVELOPMENT INTERN",
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
  products: [
    {
      id: "koreader-ecosystem",
      name: "KOReader Ecosystem",
      image: {
        pt: { desktop: { src: "/koreader-library-pt.png", width: 1440, height: 1200 } },
        en: { desktop: { src: "/koreader-library-en.png", width: 1440, height: 949 } },
      },
      category: "READING TOOLS · OPEN SOURCE",
      technologies: ["Electron", "React", "TypeScript", "Python", "SQLite"],
      links: [{ type: "repository", href: "https://github.com/bellussi1/koreader-ecosystem" }],
      pt: {
        status: "Open source · em desenvolvimento",
        headline: "Sua biblioteca e seu progresso em um só lugar.",
        description:
          "Aplicativo Windows que reúne a biblioteca Calibre e as estantes Hardcover, permite editar metadados e enviar ebooks ao Kindle com KOReader.",
        details:
          "Interface React e Electron com serviço Python local. O projeto inclui backups criptografados e integração de progresso de leitura; fluxos de sincronização ainda estão em validação no dispositivo.",
        imageAlt: "Biblioteca do KOReader Ecosystem com capas e dados fictícios de demonstração.",
        imageCaption: "Biblioteca · dados demonstrativos",
        linkLabel: "Explorar repositório público",
      },
      en: {
        status: "Open source · in development",
        headline: "Your library and reading progress together.",
        description:
          "A Windows app for browsing a Calibre library and Hardcover shelves, editing metadata, and sending ebooks to a Kindle running KOReader.",
        details:
          "A React and Electron interface with a local Python service. It includes encrypted backups and reading-progress integration; device synchronization workflows are still being validated.",
        imageAlt: "KOReader Ecosystem library with book covers and fictional demo data.",
        imageCaption: "Library · demo data",
        linkLabel: "Explore the public repository",
      },
    },
    {
      id: "black-market",
      name: "Black Market",
      category: "GAME COMPANION · ANGULAR / NESTJS",
      technologies: [
        "Angular",
        "NestJS",
        "PostgreSQL",
        "OCR",
      ],
      image: {
        src: "/black-market-recipe.png",
        width: 1597,
        height: 1338,
        webp: [
          {
            src: "/project-previews/black-market-350.webp",
            width: 350,
            height: 293,
          },
          {
            src: "/project-previews/black-market-700.webp",
            width: 700,
            height: 586,
          },
          {
            src: "/project-previews/black-market-1200.webp",
            width: 1200,
            height: 1006,
          },
        ],
      },
      links: [
        { type: "code", href: "https://github.com/bellussi1/Black-Market" },
      ],
      pt: {
        status: "Código aberto · Em desenvolvimento",
        headline: "Planeje a próxima receita, não a próxima planilha.",
        description:
          "Uma ferramenta independente para jogadores de Black Desert Online planejarem receitas, materiais e custos de produção.",
        details:
          "Monorepo com Angular e SSR, API NestJS e PostgreSQL. Reúne árvore de sub-receitas, comparação de custos, preços de mercado e leitura de capturas com revisão manual.",
        imageAlt:
          "Captura da tela real do Black Market com lucro por hora, custo dos materiais, faturamento da receita e árvore de produção com quatro insumos.",
        imageCaption: "Receita · margem, custo dos materiais e árvore de produção",
        linkLabel: "Explorar repositório",
      },
      en: {
        status: "Open source · In development",
        headline: "Plan the next recipe, not the next spreadsheet.",
        description:
          "An independent tool that helps Black Desert Online players plan recipes, materials and production costs.",
        details:
          "A monorepo with Angular and SSR, a NestJS API and PostgreSQL. It brings together nested recipes, cost comparisons, market prices and screenshot reading with manual review.",
        imageAlt:
          "Real Black Market screen showing hourly profit, material costs, recipe revenue and a production tree with four ingredients.",
        imageCaption: "Recipe · margin, material costs and production tree",
        linkLabel: "Explore the repository",
      },
    },
  ],
  openSourceProjects: [
    {
      id: "deploy-preflight",
      name: "Deploy Preflight",
      category: "DEPLOY / CI",
      command: "deploy-preflight check --env-file .env.local --json",
      technologies: ["TypeScript", "Node.js", "HTTP", "GitHub Actions"],
      links: [
        { type: "code", href: "https://github.com/bellussi1/deploy-preflight" },
        {
          type: "tests",
          href: "https://github.com/bellussi1/deploy-preflight/actions",
        },
        {
          type: "demo",
          href: "https://github.com/bellussi1/deploy-preflight#runnable-example",
        },
      ],
      pt: {
        headline: "Configuração validada antes do deploy.",
        description:
          "Variáveis ausentes, arquivos inacessíveis e URLs inválidas podem interromper uma entrega. Uma CLI que reúne essas verificações em um relatório para o terminal ou pipeline.",
        decision:
          "Validação tipada, probes HTTP opcionais e códigos de saída para CI. Valores de ambiente ficam fora dos relatórios.",
        demo:
          "Variável obrigatória ausente → exit 1. Configuração corrigida → exit 0.",
        codeLabel: "Explorar código",
        testsLabel: "Ver testes e CI",
        exampleLabel: "EXEMPLO DE USO",
        demoLabel: "Reproduzir a demo",
      },
      en: {
        headline: "Validate configuration before deployment.",
        description:
          "Missing variables, inaccessible files and invalid URLs can break a release. A CLI that brings these checks into one report for your terminal or pipeline.",
        decision:
          "Typed validation, optional HTTP probes and CI exit codes. Environment values stay out of reports.",
        demo:
          "Missing required variable → exit 1. Corrected configuration → exit 0.",
        codeLabel: "Explore code",
        testsLabel: "View tests and CI",
        exampleLabel: "USAGE EXAMPLE",
        demoLabel: "Run the demo",
      },
    },
    {
      id: "local-webhook-recorder",
      name: "Local Webhook Recorder",
      category: "BACKEND / INTEGRATIONS",
      command:
        "webhook-recorder replay EVENT_ID --to http://127.0.0.1:3000/webhooks --json",
      technologies: ["TypeScript", "Node.js", "SQLite", "Webhooks"],
      links: [
        {
          type: "code",
          href: "https://github.com/bellussi1/local-webhook-recorder",
        },
        {
          type: "tests",
          href: "https://github.com/bellussi1/local-webhook-recorder/actions",
        },
        {
          type: "demo",
          href: "https://github.com/bellussi1/local-webhook-recorder#replay-and-idempotency-demo",
        },
      ],
      pt: {
        headline: "Um evento. Quantos testes precisar.",
        description:
          "Reproduzir uma integração não deveria depender de disparar o evento de novo. Captura webhooks locais, permite inspecionar o payload e reenviá-lo após ajustar o handler.",
        decision:
          "Persistência em SQLite, preservação dos bytes e replay explícito para endpoints locais. Limites de payload e retenção.",
        demo:
          "Capture um pedido e reproduza duas vezes: o handler de exemplo identifica a duplicata.",
        codeLabel: "Explorar código",
        testsLabel: "Ver testes e CI",
        exampleLabel: "EXEMPLO DE USO",
        demoLabel: "Reproduzir a demo",
      },
      en: {
        headline: "One event. As many tests as you need.",
        description:
          "Reproducing an integration should not require triggering the event again. Capture local webhooks, inspect their payloads and replay them after changing your handler.",
        decision:
          "SQLite persistence, byte-preserving capture and explicit replay to local endpoints. Payload and retention limits.",
        demo:
          "Capture an order and replay it twice: the example handler identifies the duplicate.",
        codeLabel: "Explore code",
        testsLabel: "View tests and CI",
        exampleLabel: "USAGE EXAMPLE",
        demoLabel: "Run the demo",
      },
    },
    {
      id: "compose-doctor",
      name: "Compose Doctor",
      category: "INFRA / DOCKER",
      command:
        "compose-doctor check --file examples/compose.yaml --file examples/compose.fixed.yaml --project-name doctor-demo --service api --json",
      technologies: [
        "TypeScript",
        "Docker Compose",
        "Healthchecks",
        "CLI",
      ],
      links: [
        { type: "code", href: "https://github.com/bellussi1/compose-doctor" },
        {
          type: "tests",
          href: "https://github.com/bellussi1/compose-doctor/actions",
        },
        {
          type: "demo",
          href: "https://github.com/bellussi1/compose-doctor#real-demo-unhealthy--ready",
        },
      ],
      pt: {
        headline: "Entenda o estado do seu ambiente.",
        description:
          "Um container em execução pode ter um healthcheck falhando. Diagnóstico de serviços Docker Compose com estado, reinícios, portas e sugestões de investigação.",
        decision:
          "Consultas somente de leitura, subprocessos com limites e projeção de metadados. Relatórios em texto ou JSON.",
        demo:
          "API e banco saudáveis → ready · exit 0.",
        codeLabel: "Explorar código",
        testsLabel: "Ver testes e CI",
        exampleLabel: "EXEMPLO DE USO",
        demoLabel: "Reproduzir a demo",
      },
      en: {
        headline: "Understand the state of your environment.",
        description:
          "A running container can still have a failing healthcheck. Diagnose Docker Compose services with status, restarts, ports and investigation suggestions.",
        decision:
          "Read-only queries, bounded subprocesses and selected metadata. Reports in text or JSON.",
        demo:
          "API and database healthy → ready · exit 0.",
        codeLabel: "Explore code",
        testsLabel: "View tests and CI",
        exampleLabel: "USAGE EXAMPLE",
        demoLabel: "Run the demo",
      },
    },
  ],
};
