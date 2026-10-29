# Sistema visual do experimento A/B/C

## Autoridade e escopo
A é o controle de origin/main 5186afa: index.html, CSS original, traduções, dados e utilitários não foram redesenhados. Os tokens abaixo são de C; não devem ser normalizados sobre A/B. Brief e arquitetura: docs/portfolio-abc-design.md.

## B — tipografia isolada
Zilla Slab 400/500/600/700 normal e 400 italic, arquivos WOFF2 latin locais sob SIL OFL. Georgia/serif de fallback e font-display swap. Família de interface e display mudam para slab; código literal continua monospace. Headline preserva a escala responsiva original, com peso500, leading1.04 e tracking−.035em. H2 peso500/1.15/−.02em; H3 peso600/1.25/−.01em. Papel de leitura16–17px, leading1.6; links e ações14px. Nenhum padding, margin, grid, tamanho de imagem, cor ou animação alterado. Mudanças de altura e quebra de linha decorrem exclusivamente da tipografia; nenhum ajuste geométrico foi necessário.

## C — identidade editorial
Modo Experience: nome e especialidade na coluna fixa45%, dossiê na coluna55%. Interface sem linhas decorativas, ruído, gradientes ou glass. Capturas reais dos produtos; nenhum asset externo ou claim criado. Tema inicial claro; escolha explícita de tema reaproveitada das outras versões.

| Papel | Token e valor |
|---|---|
| Papel / tinta | --paper #fff / --ink #17191c |
| Superfície / texto secundário | --surface #f3f4f6 / --secondary #50545c |
| Ação | --blue #1a4be0, texto branco |
| Tema escuro | papel #17191c, superfície #23262d, tinta #f1f3f7, secundário #bdc4d0, ação #9ab5ff |
| Nome / títulos | Zilla Slab / Georgia / serif |
| Leitura / controles | DM Sans / Arial / sans-serif |
| Código literal | ui-monospace, somente pre/code |
| Corpo / lead / pequeno | 17px /20px /14px; leading1.6/1.5/1.5 |
| Título / nome | clamp30–44px /clamp56–96px |
| Frame | gutter24–64px; seções112px desktop,80px mobile |
| Ações | retangulares; alvo mínimo44px, principal52px |
| Foco | outline3px, offset5px, cor de ação |

Desktop≥960px usa coluna fixa; abaixo disso, conteúdo no fluxo. Desktop com altura≤759px também desativa sticky para não prender controles fora da tela. Não há scroll hijacking em C. Entradas de600ms apenas na abertura, feedback de180ms no preview e CTA. Preferência de movimento reduzido remove animações e suavização; conteúdo permanece visível. A/B preservam Lenis e efeitos originais.

## Dados e conteúdo
src/content/portfolio.js é a fonte das duas experiências, dois produtos e três ferramentas. Textos estáticos PT são extraídos de index.html na geração; EN reutiliza translations.js. Apenas narrativa curta específica de C fica no renderizador. Novas experiências ou resultados nunca devem ser inventados para preencher o desenho.

## Comparação e manutenção
Seletor em Shadow DOM, com foco visível e URLs reais; nenhum estilo vaza. lang=pt/en preserva idioma mesmo sem localStorage. VITE_PORTFOLIO_COMPARE=false elimina o chunk/DOM do seletor do build; compare=0 evita import/download em uma visita. A/B/C são páginas diferentes, sem sorteio de tráfego. Ver relatório de testes e limites em docs/portfolio-comparison.md.
