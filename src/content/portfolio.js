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
      id: "comandinha",
      name: "Comandinha",
      category: "RESTAURANT OPERATIONS",
      technologies: [
        "Next.js",
        "React",
        "NestJS",
        "PostgreSQL",
        "Prisma",
        "TypeScript",
      ],
      links: [
        {
          type: "repository",
          href: "https://github.com/bellussi1/comandinha",
        },
      ],
      pt: {
        status: "Migração em andamento",
        headline: "Um salão inteiro no mesmo ritmo.",
        description:
          "Plataforma de operação para restaurantes, com catálogo digital, mesas, pedidos e cardápio por QR. Estou reconstruindo a base como um monorepo, preservando o produto legado enquanto os novos fluxos amadurecem.",
        details:
          "Next.js e React na web, NestJS na API, PostgreSQL e Prisma. O catálogo e o fluxo QR já têm uma base integrada; a migração ainda não está pronta para produção.",
        imageAlt:
          "Prévia de um dashboard do Comandinha com métricas e pedidos de demonstração.",
        imageCaption: "Operação do salão · dados demonstrativos",
        linkLabel: "Explorar repositório público",
      },
      en: {
        status: "Migration in progress",
        headline: "One rhythm for the whole dining room.",
        description:
          "A restaurant operations platform for digital catalogs, tables, orders and QR menus. I am rebuilding its foundation as a monorepo while keeping the legacy product available as the new flows mature.",
        details:
          "Next.js and React on the web, NestJS in the API, PostgreSQL and Prisma. The catalog and QR flow have an integrated foundation; the migration is not production-ready yet.",
        imageAlt:
          "Comandinha dashboard preview with demonstration metrics and orders.",
        imageCaption: "Restaurant operations · mock data",
        linkLabel: "Explore the public repository",
      },
    },
    {
      id: "black-market",
      name: "Black Market",
      category: "GAME COMPANION · PRIVATE SAAS",
      technologies: [
        "Inventory",
        "Recipe explorer",
        "Manual review",
        "Private product",
      ],
      image: {
        src: "/black-market-recipe.png",
        width: 1440,
        height: 1200,
      },
      links: [],
      pt: {
        status: "Em desenvolvimento",
        headline: "Planeje a próxima receita, não a próxima planilha.",
        description:
          "Um companion SaaS para a comunidade brasileira de Black Desert Online. A ideia é ajudar jogadores a organizar inventário e entender o que falta para criar um item.",
        details:
          "O MVP explora importação de até oito capturas por vez, revisão manual dos itens e busca de receitas recursivas, fontes e materiais faltantes. É um produto privado, sem lançamento público.",
        imageAlt:
          "Captura da tela real de receitas do Black Market com árvore de produção, cálculo de preços e materiais necessários.",
        imageCaption: "Receita · árvore de produção e cálculo de mercado",
        privateNote: "Código e interface não são públicos neste momento.",
      },
      en: {
        status: "In development",
        headline: "Plan the next recipe, not the next spreadsheet.",
        description:
          "A companion SaaS for Brazil’s Black Desert Online community. It helps players organize inventory and understand what is missing to craft an item.",
        details:
          "The MVP explores imports of up to eight screenshots at a time, with manual item review, recursive recipe search, sources and missing materials. It is a private product with no public launch yet.",
        imageAlt:
          "Real Black Market recipe screen with its production tree, price calculations and required materials.",
        imageCaption: "Recipe · production tree and market calculation",
        privateNote: "The code and interface are private at this stage.",
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
