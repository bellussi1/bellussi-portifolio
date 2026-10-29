# Comparação A/B/C — 29/10/2026

## Resultado e recomendação
Três páginas funcionais: `/` controle, `/v2` tipografia e `/v3` redesign. Seletor de links reais com estado ativo, PT/EN e tema preservados; desativação por visita ou build. Nada de tráfego aleatório. A permanece oficial; C é experimento.

Recomendo **C como direção para adoção após avaliação visual do proprietário**: o nome/especialidade e contato ganham presença, os produtos reais substituem a ilustração de interface como prova principal e o corpo17px facilita leitura prolongada. Mantém os fatos, inclui todos os projetos e oferece conteúdo sem JS. A composição dividida é uma escolha editorial com custo: o documento segue longo e a coluna fixa consome45% do desktop. No mobile, identidade/CV/contato aparecem primeiro; o recrutador pode pular diretamente para experiência e produtos.

B é a alternativa de menor mudança visual. Zilla Slab dá identidade, preservando o desenho conhecido, mas mantém a organização e as pequenas legendas do controle. A já tem identidade e motion mais elaborado; não é um baseline deliberadamente enfraquecido.

## Avaliação editorial (subjetiva, 0–10)
Estas notas são julgamento de design a partir dos screenshots, não um experimento de conversão com visitantes. A coluna performance abaixo usa as medições da próxima seção para contexto, mas a nota continua qualitativa.

| Critério | A | B | C |
|---|---|---|---|
| Identidade visual | 8 — grid gráfico consistente | 8 — slab reforça o caráter editorial | 8.5 — nome e trabalho estruturam o palco |
| Tipografia | 7 — muitas escalas e legendas pequenas | 8 — Zilla coerente; leitura16–17px | 8.5 — slab/sans por função, corpo17px |
| Legibilidade | 7 — densidade alta nas contribuições | 8 — texto de leitura maior, mesma composição | 9 — medida controlada e contraste forte |
| UX | 8 — navegação, idioma, tema e CV bem resolvidos | 8 — mesmas interações | 8.5 — contato persistente e preview; página ainda longa |
| Responsividade | 7 — bom390px, overflow herdado320px | 7 — mesmas restrições geométricas | 9 — sem overflow320–1440, desktop baixo corrigido |
| Acessibilidade | 7.5 — boa base; contraste4.45 pontual | 7.5 — herda esse contraste | 9 — sem violações axe na matriz, conteúdo sem JS |
| Performance | 9 — Lighthouse100 nos dois perfis | 9 —100, fontes acrescentam transferência | 9 —100, CSS menor, LCP desktop maior que A |
| Clareza profissional | 8 — experiência real bem documentada | 8 — melhora leitura, não narrativa | 9 — nome, especialidade, empresas e provas explícitas |
| Originalidade | 8 — arte técnica e grid editorial | 8 — mesma composição com nova voz | 8 — palco/dossiê próprio, sem alegar desenho sem precedentes |

## Métricas objetivas executadas
Lighthouse **13.6.0**, Chrome headless, servidor local do build de produção (Vite preview), query `compare=0`, sessão fria por execução. Mobile: configuração padrão simulada da ferramenta; desktop: preset desktop. Uma execução de cada combinação, não medianas nem dados de usuários reais. Os seis JSON completos estão em `docs/evidence/`.

| Variante | Perfil | Perf. | A11y | Boas práticas | SEO | LCP lab | CLS lab | TBT | Transferência |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| A | mobile | 100 | 100 | 100 | 100 | 0.967s | 0.00000 | 2.5ms | 558.2kB |
| B | mobile | 100 | 100 | 100 | 69 | 0.908s | 0.00194 | 0.0ms | 607.1kB |
| C | mobile | 100 | 100 | 100 | 69 | 0.911s | 0.00000 | 0.0ms | 640.6kB |
| A | desktop | 100 | 100 | 100 | 100 | 0.433s | 0.00000 | 0.0ms | 592.9kB |
| B | desktop | 100 | 100 | 100 | 69 | 0.523s | 0.00235 | 0.0ms | 641.8kB |
| C | desktop | 100 | 100 | 100 | 69 | 0.794s | 0.00000 | 0.0ms | 604.0kB |

O SEO69 de B/C decorre do **noindex intencional** (`is-crawlable`), necessário para não duplicar a página oficial. Não é erro a corrigir durante o experimento. Lighthouse100 de acessibilidade não garante WCAG: axe encontrou um contraste herdado em A/B escuro, fora da captura padrão do Lighthouse. Não há INP/CrUX de campo disponível; TBT é apenas indicador de bloqueio de laboratório e não substitui INP. Não foram inventados percentis nem zero de INP.

C tem LCP desktop cerca de0.36s maior que A nesta amostra, embora ambos abaixo de1s. B acrescenta aproximadamente49kB de transferência móvel pela família slab com pesos reais. C transfere cerca de82kB a mais no perfil móvel desta execução, incluindo mídia real; não declarar melhora universal de performance com base em nota100. Fontes locais e previews WebP existentes foram aproveitados; uma futura otimização dos PNGs KOReader é possível sem mudar os fatos.

## Verificação funcional e engenharia
- **63/63 testes de unidade**, incluindo os54 anteriores: fatos/renderização, SEO, imagens, parallax, Lenis, idioma/rotas e limite de CSS tipográfico.
- **Build de produção aprovado**, com entradas distintas A/B/C. CSS de C9.61kB (gzip2.85), CSS principal de A84.18kB (gzip15.43) mantido; C não importa os estilos de A. Nenhum framework de UI foi adicionado. Playwright/axe são dependências apenas de teste.
- **48 combinações de navegador**: A/B/C × PT/EN × claro/escuro ×320/390/768/1440. Sem novas falhas de JS/rede, âncoras ou PDFs. As8 ocorrências conhecidas de overflow A/B em320 foram registradas separadamente, não ocultadas.
- **11 fluxos**: rotas diretas com/sem slash, alternância A→B→C emEN, preview/idioma/tema/clipboard, teclado/skip/disclosure/menu/Escape, PDFs e recursos, storage bloqueado, C sem JS, seletor oculto sem download, idioma após reload, motion normal/reflow equivalente e desktop baixo. Todos passaram após correções.
- Axe-core **4.14.0** em390/1440, duas línguas e temas: C sem violações nos critérios WCAG2A/AA,2.1AA e2.2AA examinados. A/B mantêm uma violação de contraste escuro herdada.
- Build `VITE_PORTFOLIO_COMPARE=false` verificado: não contém chunk `compare-*` nem string de marcação `portfolio-comparison`. `?compare=0` também não baixa o módulo em nenhuma rota.
- Links locais retornam200. Dos13 destinos HTTPS distintos,12 responderam200 a HEAD. LinkedIn respondeu405 (método não permitido); a URL foi preservada e permanece como limitação de verificação automatizada. HEAD não valida existência de uma âncora dentro de um README remoto.
- Evidências de layout:12 screenshots pareados e folhas desktop/tablet/mobile. HTML, CSS original, traduções, dados e PDFs de A sem diff contra origin/main. Texto e geometria do primeiro viewport iguais ao original independente. PNG não é byte idêntico entre dev/produção:232 pixels de1.296.000 no desktop diferiram em1 nível no canal verde, sem diferença de composição.

## Revisão independente e ajustes finais
Uma revisão fresh-context encontrou um P2: controles da lateral fixa ficavam abaixo da tela em1440×600. O teste reproduziu a falha antes da correção. Desktop baixo agora usa coluna no fluxo; o teste integrado verifica alcance dos controles. O revisor confirmou a correção em1440×600 e960×600, além dos limites719/720/900. O fallback foi ampliado até759px para evitar corte marginal em960×720.

Impeccable detect retornou `[]` para os arquivos novos (sem alegar auditoria WCAG). Taste lint não encontrou achados. Taste inspect mantém duas divergências de estilo: trata o summary factual antes da próxima empresa como eyebrow (falso positivo semântico) e considera insuficientes dois elementos de entrada, pois exige pelo menos8. Não adicionar seis animações sem função só para satisfazer o scanner. Warns restantes: mono é restrito a código real, não há vídeo fornecido, e a identidade fica fixa por mais telas que o limite genérico. A direção split-stage foi escolhida justamente pela referência persistente; no mobile/desktop baixo a fixação cessa. Poucas imagens foram justificadas: só dois produtos reais, nenhum projeto inventado.

## Limitações e pendências explícitas
1. A/B conservam overflow333px em viewport320px, originado na seção Abordagem, confirmado também no checkout original intocado; conservam contraste4.45:1 na pequena numeração dessa seção no tema escuro. Corrigir depois do experimento alteraria o controle solicitado. Por isso não se declara que todas as variantes atingem integralmente WCAG/reflow.
2. Não foram realizados estudo com recrutadores, teste com leitor de tela humano, hardware mobile físico ou coleta de Web Vitals de campo. Não há conclusão estatística sobre preferência ou conversão.
3. O teste de reflow720px representa metade de1440px; não equivale a validar todos os modos de zoom/text-only de todos os navegadores.
4. A Vercel marcou o deployment do PR#3 como Ready. A preview redireciona para login/SSO da Vercel, portanto o conteúdo remoto não pôde ser validado sem autenticação do proprietário. O build e as três rotas locais foram exercitados; o usuário pode abrir a preview autenticado ou o servidor local. Nenhum merge nem promoção de C faz parte da entrega.
5. A/ B mantêm a dependência de JS das seções centrais; C entrega os fatos no HTML inicial emPT. Sem JS, a query EN não traduz o HTML; PT permanece legível como fallback.

Não restam tarefas de implementação planejadas; a decisão de adoção e as melhorias herdadas acima são posteriores à comparação.

## Entrega remota
PR de revisão: https://github.com/bellussi1/bellussi-portifolio/pull/3 . Preview: https://bellussi-portifolio-git-codex-po-bc9214-enzo-bellussis-projects.vercel.app (requer login Vercel). `docs/evidence/deployment-check.json` registra o redirecionamento para login; HTTP200 dessa tela não foi contado como aprovação das variantes.

Na checagem final de configuração foi removido cleanUrls=true: a [documentação oficial Vite/Vercel](https://vercel.com/docs/frameworks/frontend/vite) informa que rewrites com cleanUrls não devem incluir extensão.html no destino. Os rewrites explícitos de arquivo foram mantidos sem cleanUrls, com teste de regressão.
