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
npm test
npm run build
npm run preview
```

## Estrutura

- `index.html`: conteúdo em português, semântica, metadados e estrutura das seções.
- `src/translations.js`: versão em inglês dos textos.
- `src/main.js`: idioma, menu, navegação, animações e cópia do contato.
- `src/utils/parallax.js`: profundidade de scroll nas camadas visuais, com deslocamento limitado e suavização por frame.
- `src/utils/smooth-scroll.js`: desaceleração curta da rodinha com limites, resposta à inversão de direção e preservação de interações nativas.
- `styles/style.css`: tokens visuais, componentes, composição responsiva e movimento reduzido.
- `styles/components/premium.css`: contraste editorial, entradas por linhas, revelação coordenada, terminais e microinterações.
- `public/curriculo-pt.pdf` e `public/curriculo-en.pdf`: currículos para download.

O site usa HTML, CSS e JavaScript com Vite, sem framework de interface ou biblioteca de animação. Os textos principais continuam presentes no HTML sem depender do JavaScript. As animações respeitam `prefers-reduced-motion`.

O parallax mantém a rolagem nativa, preserva os transforms existentes e reduz a intensidade em telas de até 760px. O loop para ao estabilizar e é cancelado quando a página fica oculta ou o usuário ativa movimento reduzido. Os testes cobrem os limites, a estabilização e a mudança dessa preferência.

A suavização da rodinha usa a posição real do documento, sem wrapper de scroll virtual. É aplicada somente com ponteiro preciso e hover; toque, zoom, campos editáveis, rolagem horizontal e áreas com scroll próprio mantêm seu comportamento nativo. Teclado, cliques, toque e movimento reduzido cancelam a inércia. O deslocamento pendente é limitado a 1,5 tela para manter resposta em gestos rápidos. Os testes cobrem desaceleração, inversão, limites e cancelamento.

A abertura entra por linhas; títulos, descrições e comandos aparecem em sequência nas seções. O menu sinaliza a seção ativa com um indicador deslizante. A troca PT/EN usa uma transição curta, com os textos atualizados imediatamente. Conteúdo e comandos permanecem disponíveis sem JavaScript e com movimento reduzido.

## Atualização de conteúdo

Atualize os textos em português no HTML e as respectivas chaves em `src/translations.js`. Substitua os PDFs mantendo os nomes acima. A troca de idioma também troca o currículo dos botões principais.

As experiências profissionais descrevem responsabilidades fornecidas no currículo. Não há código, screenshots de sistemas internos ou métricas de impacto inventadas.

## Publicação

O projeto mantém a integração existente com a Vercel. Comando de build: `npm run build`; diretório de saída: `dist`; versão de Node: 24.x.


## Experimento A/B/C

A raiz continua sendo o controle original. `/v2` usa Zilla Slab com mudanças apenas tipográficas; `/v3` é uma experiência editorial independente. Não há distribuição aleatória de visitantes.

```sh
npm ci
npm run dev
# ou build/preview de produção
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4180
# com o preview aberto e Chrome instalado:
npm run test:browser
```

O teste de navegador usa Chrome por padrão; `PLAYWRIGHT_CHANNEL=msedge` seleciona Edge. `PORTFOLIO_TEST_URL` troca a origem do preview. As ferramentas Playwright e axe-core são dependências apenas de desenvolvimento. Para usar Chromium em outro ambiente, execute `npx playwright install chromium` e use `PLAYWRIGHT_CHANNEL=chromium`. Nenhuma dependência de UI foi adicionada.

O seletor mantém idioma nas URLs (`?lang=pt` ou `?lang=en`) e tema em preferência local. Para inspecionar sem seletor, use `?compare=0`: seu módulo não é baixado. Para eliminá-lo do build, defina `VITE_PORTFOLIO_COMPARE=false` antes de `npm run build`. B/C mantêm `noindex` e canonical para a raiz, inclusive no HTML sem JS; vercel.json também define cabeçalhos. Não promova C sem decisão explícita.

`predev` e `prebuild` geram v2/index.html a partir de index.html e v3/index.html a partir dos dados compartilhados. Não edite os gerados. Depois de mudar o HTML original ou os renderizadores com dev já aberto, execute `node scripts/generate-variants.mjs` novamente (ou reinicie o dev). O texto PT gerado em src/editorial/portuguese.generated.js também é descartável.

Documentação: [skills](docs/design-skill-audit.md), [auditoria original](docs/portfolio-audit.md), [arquitetura](docs/portfolio-abc-design.md), [tokens e tipografia](DESIGN.md), [comparação e testes](docs/portfolio-comparison.md), [evidências](docs/evidence/README.md).


A V3 recebeu uma segunda direção de arte e motion: consulte [o refinamento](docs/v3-creative-refinement.md). Com o preview aberto, `node scripts/v3-refinement-check.mjs` verifica diálogo, foco, screenshots, ponteiro, motion reduzido, navegação interrompida e reabertura de mídia. As novas imagens WebP são derivadas das capturas originais, que continuam acessíveis integralmente.
