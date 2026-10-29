# Sistema visual do experimento A/B/C

## Autoridade e escopo
A é o controle de origin/main 5186afa: index.html, CSS original, traduções, dados e utilitários não foram redesenhados. Os tokens abaixo são de C; não devem ser normalizados sobre A/B. Brief e arquitetura: docs/portfolio-abc-design.md.

## B — tipografia isolada
Zilla Slab 400/500/600/700 normal e 400 italic, arquivos WOFF2 latin locais sob SIL OFL. Georgia/serif de fallback e font-display swap. Família de interface e display mudam para slab; código literal continua monospace. Headline preserva a escala responsiva original, com peso500, leading1.04 e tracking−.035em. H2 peso500/1.15/−.02em; H3 peso600/1.25/−.01em. Papel de leitura16–17px, leading1.6; links e ações14px. Nenhum padding, margin, grid, tamanho de imagem, cor ou animação alterado. Mudanças de altura e quebra de linha decorrem exclusivamente da tipografia; nenhum ajuste geométrico foi necessário.

## C — direção refinada: caderno de interfaces

Atualizada após o feedback visual do proprietário. O split45/55 e Zilla Slab permanecem; a identidade passa a ocupar um campo cobalto, com nome em escala64–120px. A leitura usa papel #faf9f5 e tinta #17252c; a ação é #2444bd, com amarelo #f3d17e reservado ao currículo e progresso sobre cobalto. Tema escuro: #17242c / #f7f5e9; identidade #192d89. Metadados secundários mantêm contraste AA testado.

Casos reais substituem screenshots sem enquadramento: palco de proporção1.32 desktop/1.05 mobile, composição azul mineral no KOReader e areia no Black Market. A mídia usa WebP480/960, crop intencional e inclinação pequena somente com movimento permitido. O título de assunto integra a arte; texto de projeto, status e links permanecem fora da imagem. Captura completa original fica disponível em diálogo nativo e link direto. Miniatura lateral80×72px acompanha o caso em leitura, sem competir com o nome.

Motion: máscaras de linhas do nome750ms, stagger80ms; abertura de apoio500ms; títulos por máscara500ms; imagens de cases600ms com atraso70ms; textos420ms; foco de projeto/diálogo220ms; hover160–260ms. Curvas --ease-out(.23,1,.32,1) e --ease-in-out(.77,0,.175,1). Ponteiro limitado a±5px/±4px em hover/precise pointer; scroll parallax via CSS view timeline com fallback estático. Sem scroll hijacking, ticker, cursor customizado ou loop infinito de JS.

Conteúdo visível por padrão, mesmo sem JS. Reduced motion em runtime cancela WAAPI, removes transforms/scroll parallax e devolve a imagem ao plano. Observadores e callbacks são desconectados/cancelados antes de cada render de idioma. Navegação manual temporariamente estabiliza a seleção e reconcilia o último case visível após910ms, inclusive se o usuário interromper a rolagem. Cada abertura do diálogo reinicia scrollTop, com Escape/foco de retorno nativos.

Breakpoints: coluna no fluxo até959px de largura ou759px de altura desktop. Em320px o motivo Interface→Sistema encurta a seta/gaps. Foco3px, alvos principais44px+, corpo17px, lead20px, metadados14px, legendas móveis13px. detalhes/projetos acessíveis por controles nativos.

Exceções à house style Taste foram decididas, não ignoradas: a sombra cria plano de apresentação para screenshot real; a linha pertence a um disclosure interativo; o papel claro apoia o campo cobalto dominante. O scanner não mede mérito artístico nem substitui WCAG. Evidências e testes desta revisão: docs/v3-creative-refinement.md e docs/evidence/v3-refinement/.

## Dados e conteúdo
src/content/portfolio.js é a fonte das duas experiências, dois produtos e três ferramentas. Textos estáticos PT são extraídos de index.html na geração; EN reutiliza translations.js. Apenas narrativa curta específica de C fica no renderizador. Novas experiências ou resultados nunca devem ser inventados para preencher o desenho.

## Comparação e manutenção
Seletor em Shadow DOM, com foco visível e URLs reais; nenhum estilo vaza. lang=pt/en preserva idioma mesmo sem localStorage. VITE_PORTFOLIO_COMPARE=false elimina o chunk/DOM do seletor do build; compare=0 evita import/download em uma visita. A/B/C são páginas diferentes, sem sorteio de tráfego. Ver relatório de testes e limites em docs/portfolio-comparison.md.
